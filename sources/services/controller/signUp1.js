/**
 * signUpController Controller
 * signUpController is used for the user registration purpose. An individual user has to give the required 
 * data to register himself in the payvoo app.
 * @package signUpController
 * @subpackage controller/signUP/signUpController
 * @author SEPA Cyber Technologies, Sekhara Suman Sahu.
 */


/* This file is modified version of current signup process, With changed database structure and use of async/await
   concept in Node.js. */



"use strict";
/**
 * Required file import.
 */
import {
  UserModel
} from '../model/signUp1';
import {
  signupConfig
} from '../utility/signUp';
import {
  config
} from '../dbconfig/connection';
import {
  mariadb,
  DbConnMgr
} from '../dbconfig/dbconfig';
import {
  Utils
} from '../utility/utils';
import {
  TokenModel
} from '../model/tokenManager';
import {
  langEngConfig
} from '../utility/lang_eng';
import {
  loginConfig
} from '../utility/loginConfig';
const tokenModel = new TokenModel();
/** Require Module import*/
const alphaChar = require('randomstring');
const uuidAPIKey = require('uuid-apikey');
const crypto = require('crypto');
var mailer = require('../mailer/mail');

/**Object initialization of required file*/
const userModel = new UserModel();
const util = new Utils();
let db = DbConnMgr.getInstance();
// const conn = db.getConnObject();

/** Status Object for success or failure case*/
const STATUS = {
  SUCCESS: 0,
  FAILURE: 1
}

/** user Class for User data initialization */
class USER {
  constructor(userdata) {
    this.applicant = {
      'account_type': userdata.account_type,
      'user_id': userdata.email,
      'password': userdata.password,
      'passcode_pin': userdata.passcode_pin,
      'role_id': userdata.role_id,
      'email_verified': userdata.email_verified,
      'mobile_verified': userdata.mobile_verified,
      'created_on': util.getCurrentTimeStamp()
    };
    this.contact = {
      'first_name': userdata.first_name,
      'middle_name': userdata.middle_name,
      'last_name': userdata.last_name,
      'email': userdata.email,
      'gender': userdata.gender,
      'dob': (userdata.dob == "" || userdata.dob === null) ? "1990-05-05" : userdata.dob,
      'telephone': userdata.telephone,
      'mobile': userdata.mobile,
      'phone': userdata.phone ? userdata.phone : '',
    };
    this.address = {
      'country_id': userdata.country_id,
      'postal_code': userdata.postal_code,
      'address_line1': userdata.address_line1,
      'address_line2': userdata.address_line2,
      'city': userdata.city,
      'town': userdata.town,
      'region': userdata.region
    };
    this.applicant_id = userdata.applicant_id;
    this.token = uuidv1() + Math.floor(new Date() / 1000);
  }
}

/**
 * This function defined to handle http request from /userRegistraion service. 
 * @method registerUser 
 * @param {Object} request - It is Request object
 * @param {Object} response - It is Response object
 * @description This method call the private methods used in user registrtaion.
 */
export const registerUser = (request, response) => {
  logger.info('registerUser() initiated');
  __userSignUp(request, response).then(resgistrationRes => {

    logger.info('registerUser() execution completed');
    return resgistrationRes;
  })
};

/**
 * This function defined to register users. 
 * @method __userSignUp 
 * @param {Object} request - It is Request object
 * @description This method call the private methods used in user registrtaion.
 */
const __userSignUp = async (request, response) => {
  logger.info('__userSignUp() initiated');

  let apiKey = uuidAPIKey.create();
  let memberId = crypto.randomBytes(6).toString('hex');
  const url = process.env.SANDBOX_URL;
  const api_doc_url = process.env.SANDBOX_API_DOC_URL;
  const redirect_url = process.env.SANDBOX_REDIRECT_URL;

  let user = new USER(request.body);

  logger.info('isValidRegRequest() called');
  let isValidRegReq = await util.isValidRegRequest1(user);
  if (isValidRegReq.status == 0) {

    let roleId = 1;
    let addressTypeId = 1;
    if (user.applicant.account_type === "personal") {
      roleId = 1;
    }

    if (user.applicant.account_type === "business") {
      roleId = 1;
    }

    let conn = await db.getConnObject();
    try {
      //let conn = await db.getConnObject();
      logger.info('checkUniqueId() called');
      let isUnique = await userModel.checkUniqueId(user.contact.email, user.contact.mobile);
      if (isUnique.length == 0) {
        let custId = await __generateCustId();
        logger.info('transaction initiated');

        await conn.beginTransaction();

        logger.info('createApplicant() called');
        let applicantRes = await userModel.createApplicant(conn, user.applicant.account_type, custId, user.contact.email,
          hashPassword.generate(user.applicant.password), user.applicant.passcode_pin, user.contact.mobile, roleId,
          STATUS.FAILURE, user.applicant.created_on);
        
        if (applicantRes) {
          logger.info('createContact() called');
          let contactRes = await userModel.createContact(conn, applicantRes.insertId, user.contact.first_name, user.contact.middle_name,
            user.contact.last_name, user.contact.email, user.contact.gender, user.contact.dob, user.contact.telephone,
            user.contact.mobile, user.contact.phone, user.applicant.created_on);
          if (contactRes) {
            logger.info('createAddress() called');
            let addressRes = await userModel.createAddress(conn, applicantRes.insertId, contactRes.insertId, addressTypeId, user.address.country_id, user.address.postal_code,
              user.address.address_line1, user.address.address_line2, user.address.city, user.address.town,
              user.address.region, user.applicant.created_on);
            if (addressRes) {
              logger.info('createKyc() called');
              let kycRes = await userModel.createKyc(conn, applicantRes.insertId);

              if (kycRes) {

                if (user.applicant.account_type != 'sandbox') {
                  logger.info('createCurrencyAccount() called');
                  let currencyRes = await userModel.createCurrencyAccount(conn, applicantRes.insertId, roleId);
                  let rowItems = [
                    [applicantRes.insertId, "EUR", 1],
                    [applicantRes.insertId, "USD", 1],
                    [applicantRes.insertId, "GBP", 1]
                  ];

                  logger.info('createCurrencyExchangeAccount() called');
                  let currencyExRes = await userModel.createCurrencyExchangeAccount(conn, rowItems);
                }
                //Authentication parameters
                let data = {
                  Token: jwt.sign({
                    email: user.contact.email
                  }, process.env.PASSWORD_CONFIG),
                  status: STATUS.SUCCESS,
                  message: signupConfig.message.signUp.success,
                  client_auth: jwt.sign({
                    email: user.contact.email
                  }, process.env.PASSWORD_CONFIG1),
                  member_id: process.env.CLIENT_ID,
                  api_access_key: process.env.API_KEY,
                  'x-auth-token': user.token
                };

                if (user.applicant.account_type == 'business') {
                  logger.info('createSandboxUser() called');
                  let sandBoxRes = await userModel.createSandboxUser(conn, applicantRes.insertId, memberId, apiKey.apiKey, url, api_doc_url, redirect_url);
                  if (sandBoxRes) {
                    logger.info('signupMail() called');
                    let sendSandBoxMail = await mailer.signupMail(user.contact.email, user.contact.first_name, user.contact.last_name);
                    logger.info('__signUpResObject() called');
                    let regData = await __signUpResObject(data, user.contact, user.address, user.applicant);
                    if (regData) {
                      logger.info('__userSignUp() execution completed');
                      conn.commit();
                      conn.release();
                      await tokenModel.saveLoginToken(applicantRes.insertId, user.token);
                      response.send(ResponseHelper.buildSuccessResponse(regData, signupConfig.message.signUp.success, STATUS.SUCCESS));
                    }
                  }
                } else {
                  logger.info('signupMail() called');
                  let userRegMail = await mailer.signupMail(user.contact.email, user.contact.first_name, user.contact.last_name);
                  logger.info('__signUpResObject() called');
                  let regData = await __signUpResObject(data, user.contact, user.address, user.applicant);
                  if (regData) {
                    logger.info('__userSignUp() execution completed');
                    conn.commit();
                    conn.release();
                    await tokenModel.saveLoginToken(applicantRes.insertId, user.token);
                    response.send(ResponseHelper.buildSuccessResponse(regData, signupConfig.message.signUp.success, STATUS.SUCCESS));
                  }
                }
              }
            }
          }
        }
      } else {
        logger.info('checking for duplicate email and phone numbers');
        //Check for duplicate email mobile and generate propper response.
        if (isUnique[0].email == user.contact.email && isUnique[0].mobile == user.contact.mobile) {
          return response.send(ResponseHelper.buildSuccessResponse({}, signupConfig.message.signUp.emailAndMobileExist, STATUS.FAILURE));
        } else if (isUnique[0].email == user.contact.email) {
          return response.send(ResponseHelper.buildSuccessResponse({}, signupConfig.message.signUp.emailExist, STATUS.FAILURE));
        } else {
          return response.send(ResponseHelper.buildSuccessResponse({}, signupConfig.message.signUp.mobileExist, STATUS.FAILURE));
        }
      }
    } catch (err) {
      logger.error('Error occured : ' + err);
      conn.rollback();
      conn.release();
      response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.signUp.signUpError)));
    }
  } else {
    logger.info('__userSignUp() execution completed');
    response.send(ResponseHelper.buildSuccessResponse(isValidRegReq, '', STATUS.FAILURE));
  }
}

//Method to create response onject during user signup.
const __signUpResObject = async (data, contact, address, applicant) => {
  logger.info('__signUpResObject() initiated');
  //return new Promise((resolve) => {
    let isBusiness = false;
    data.userInfo = {
      // applicant_id: applicantId, email:contact.email,
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      country_id: address.country_id,
      gender: contact.gender,
      mobile: contact.mobile,
      phone: contact.phone,
      account_type: applicant.account_type,
      kycStatus: "PENDING",
      initialPayment: false,
      isBusiness: isBusiness
    }
    if (_.toLower(applicant.account_type) === "personal") {
      data.userInfo.address_line1 = address.address_line1,
        data.userInfo.address_line2 = address.address_line2,
        data.userInfo.phone = contact.phone,
        data.userInfo.city = address.city,
        data.userInfo.postal_code = address.postal_code,
        data.userInfo.region = address.region, data.userInfo.town = address.town
    }
    logger.info('__signUpResObject() execution completed');
    return data;
    //resolve(data);
  //})
}

//Method to generate each CustomerId for each user
const __generateCustId = async () => {
  //Initial 2 random characters
  const shortidChar1 = alphaChar.generate({
    length: 2,
    charset: 'alphabetic',
    capitalization: 'uppercase'
  });
  //Last 2 random characters
  const shortidChar2 = alphaChar.generate({
    length: 2,
    charset: 'alphabetic',
    capitalization: 'uppercase'
  });

  //Four digit random number
  const fourDigit = () => {
    let shortidInt = '0123456789';
    let digit = '';
    for (let i = 0; i < 4; i++) {
      digit += shortidInt[Math.floor(Math.random() * 10)];
    }
    return digit;
  }

  let numValue = fourDigit();

  //Generate id with initial 'PV'. ex- PV-AB1234YZ
  const generateId = () => {
    return 'PV' + '-' + shortidChar1 + numValue + shortidChar2;
  }
  let id = generateId();

  return id;
}

//Method for cheking existing email id or mobile number
export const isUserExists = async (request, response) => {
  logger.info('isUserExists() initiated');
  const value = request.body.userId;

  //const user_type = request.body.type;
  let type = 'mobile';

  if (_.includes(value, "@")) {
    type = 'email';
  }

  try {
    let isUniqueUser = await userModel.isUserExists(value, type);

    if (_.size(isUniqueUser) > 0) {
      if (type === 'email') {
        logger.info('isUserExists() ecxecution completed');
        response.send(ResponseHelper.buildSuccessResponse({}, signupConfig.message.signUp.emailExist, STATUS.FAILURE));
      } else {
        logger.info('isUserExists() ecxecution completed');
        response.send(ResponseHelper.buildSuccessResponse({}, signupConfig.message.signUp.mobileExist, STATUS.FAILURE));
      }
    } else {
      logger.info('isUserExists() ecxecution completed');
      response.send(ResponseHelper.buildSuccessResponse({}, signupConfig.message.signUp.valueDoesntAExist, STATUS.SUCCESS));
    }
  } catch (err) {
    logger.error(err);
    response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.signUp.signUpError)));
  }
}  


/**
 * This function is used to get country details by country name 
 * @method sendSandboxDetails 
 * @param {Object} request - It is Request object
 * @param {Object} response - It is Response object
 * @description This method used for sending sandbox details in mail.
 */
//Method for sending email send box user
export const sendSandboxDetails = (request, response) => {
  const email = request.body.email;
  const applicant_id = request.params.applicant_id;

  if (!Utils.isEmptyObject(email)) {
    userModel.sendEmailTosandboxUser(applicant_id)
      .then(result => {
        if (result.length > 0) {
          mailer.sandBoxInfo(email, result[0], process.env.SANDBOX_API_DOC_URL)
            .then(emailRes => {
              if (emailRes.status == 1) {
                response.send(ResponseHelper.buildSuccessResponse({}, `${loginConfig.message.emailSuccess} : ${email}`, STATUS.SUCCESS));
              }
            })
            .catch(err => {
              response.send(ResponseHelper.buildFailureResponse(new Error(loginConfig.message.emailFail)));
            })
        } else {
          response.send(ResponseHelper.buildFailureResponse(loginConfig.message.emailFail));
        }
      })
      .catch(err => {
        response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.signUp.signUpError)));
      })
  } else {
    response.send(ResponseHelper.buildFailureResponse(loginConfig.message.invalid_email));
  }
}

export const kycEntry = (request, response) => {
  logger.info('kycEntry() intiated');
  //const userDataParser = new UserDataParser(request.body);
  let user_id = request.body.user_id;
  userModel.getApplicantContact(user_id)
    .then(contact => {
      logger.info('getApplicantContact() success');
      if (contact[0] && contact[0].applicant_id && _.size(contact) > 0) {
        userModel.kycEntry(contact[0].applicant_id).then(result => {
          logger.info('Response of kycEntry()');
          if (result.affectedRows > 0) {
            logger.warn('result.affectedRows must be graterthan zero');
            response.send(ResponseHelper.buildSuccessResponse({}, signupConfig.message.signUp.kycEntryInsert_success, STATUS.SUCCESS));
          } else {
            logger.error('result.affectedRows < 0');
            response.send(ResponseHelper.buildFailureResponse(signupConfig.message.signUp.kycEntryInsert_fail, STATUS.FAILURE));
          }
        }, err => {
          logger.error('error in kycEntry()');
          response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.signUp.signUpError)));
        })
      }
      else {
        logger.info('Applicant not found');
        response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.signUp.applicant_notFound, STATUS.FAILED));
      }
    }).catch(err => {
      response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.signUp.contactError)));
    })
}

