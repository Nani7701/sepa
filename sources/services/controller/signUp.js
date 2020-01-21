/**
 * signUpController Controller
 * signUpController is used for the user registration purpose. An individual user has to give the required 
 * data to register himself in the payvoo app.
 * @package signUpController
 * @subpackage controller/signUP/signUpController
 * @author SEPA Cyber Technologies, Sekhara Suman Sahu.
 */

"use strict";
/**
 * Required file import.
 */
import {
  UserModel
} from '../model/signUp';
import {
  signupConfig
} from '../utility/signUp';
import {
  config
} from '../dbconfig/connection';
import {
  mariadb
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
const uuidAPIKey = require('uuid-apikey');
const crypto = require('crypto');
var mailer = require('../mailer/mail');

/**Object initialization of required file*/
const userModel = new UserModel();
const util = new Utils();

/** Status Object for success or failure case*/
const STATUS = {
  SUCCESS: 0,
  FAILURE: 1
}
/** UserDataParser Class for User data initialization */
export class UserDataParser {
  constructor(userdata) {
    this.applicant = {
      "account_type": userdata.account_type
    };
    this.contact = {
      "first_name": userdata.first_name,
      "middle_name": userdata.middle_name,
      "last_name": userdata.last_name,
      "email": userdata.email,
      "gender": userdata.gender,
      "dob": (userdata.dob == "" || userdata.dob === null) ? "1990-05-05" : userdata.dob,
      "telephone": userdata.telephone,
      "mobile": userdata.mobile,
      "phone": userdata.phone ? userdata.phone : '',
    };
    this.address = {
      "country_id": userdata.country_id,
      "postal_code": userdata.postal_code,
      "address_line1": userdata.address_line1,
      "address_line2": userdata.address_line2,
      "city": userdata.city,
      "town": userdata.town,
      "region": userdata.region
    };
    this.login = {
      "password": userdata.password,
      "passcode_pin": userdata.passcode_pin,
      "role_id": userdata.role_id,
      "email_verified": userdata.email_verified,
      "mobile_verified": userdata.mobile_verified
    };
    this.applicant_id = userdata.applicant_id;
    this.token = uuidv1() + Math.floor(new Date() / 1000);
  }
}

/**
 * This function is used to get country details by country name 
 * @method registerUser 
 * @param {Object} request - It is Request object
 * @param {Object} response - It is Response object
 * @description This method used for storing user data in database.
 */

/** Method for user registretion*/
export const registerUser = (request, response) => {
  logger.info('registerUser() initiated');
  /** Data initialization with Class object from request body */
  const userDataParser = new UserDataParser(request.body);
  util.isValidRegRequest(userDataParser)
    .then((isValidRes) => {
      /*Set login table , role and address type based on user account type*/
      var userLoginTable = signupConfig.sql.insert_userLogin;
      var roleId = 1;
      var address_type_id = 1;

      if (_.toLower(userDataParser.applicant.account_type) == "business") {
        userLoginTable = signupConfig.sql.insert_businessLogin;
        roleId = 2;
        address_type_id = 1;
      }
      if (_.toLower(userDataParser.applicant.account_type) == "sandbox") {
        userLoginTable = signupConfig.sql.insert_businessLogin;
        roleId = 7;
        address_type_id = 1;
      }

      let accountType = "Sandbox";
      if (_.toLower(userDataParser.applicant.account_type) === "personal") {
        accountType = "Personal"
      }

      if (_.toLower(userDataParser.applicant.account_type) === "business") {
        accountType = "Business"
      }

      logger.info('getContactId() initiated');
      //Check the contactid if user is already exist based upon emial and mobile number.(For unique email, mobile number)
      userModel.getContactId(userDataParser.contact.email, userDataParser.contact.mobile, accountType)
        .then(contactDetails => {
          if (contactDetails.length == 0) {
            // If no data found means its a first time user  
            mariadb.createConnection(config)
              .then(conn => {
                logger.info('transaction initiated');
                conn.beginTransaction()
                  .then(() => {
                    logger.info('createApplicant() called');
                    //Insert into applicant table
                    userModel.createApplicant(conn, userDataParser.applicant.account_type)
                      .then(applicantResult => {
                        logger.info('saveToken() called');
                        tokenModel.saveToken(conn, applicantResult.insertId, userDataParser.token).then(saveToken => {
                          //Insert into contact table with applicant id got from above query
                          userModel.createContact(conn, applicantResult.insertId, userDataParser.contact.first_name, userDataParser.contact.middle_name, userDataParser.contact.last_name, userDataParser.contact.email, _.toUpper(userDataParser.contact.gender), userDataParser.contact.dob, userDataParser.contact.telephone, userDataParser.contact.mobile, userDataParser.contact.phone)
                            .then(contactRes => {
                              //Insert into addresss table with contact id got from above query
                              logger.info('createAddress() called');
                              userModel.createAddress(conn, applicantResult.insertId, contactRes.insertId, address_type_id, userDataParser.address.country_id, userDataParser.address.postal_code, userDataParser.address.address_line1, userDataParser.address.address_line2, userDataParser.address.city, userDataParser.address.town, userDataParser.address.region)
                                .then(addressRes => {
                                  //Password hashing
                                  let password = hashPassword.generate(userDataParser.login.password);
                                  //Insert into user_login table for authentication
                                  logger.info('createUser() called');
                                  userModel.createUser(userLoginTable, conn, userDataParser.contact.email, applicantResult.insertId, password, userDataParser.login.passcode_pin, roleId)
                                    .then(userRes => {
                                      ////Insert into kyc table
                                      logger.info('insertKycDetails() called');
                                      userModel.insertKycDetails(conn, applicantResult.insertId)
                                        .then(kycRes => {
                                          if (_.toLower(userDataParser.applicant.account_type) !== 'sandbox') {
                                            //By default create a "EUR" currency account for user
                                            logger.info('createCurrencyAccount() called');
                                            userModel.createCurrencyAccount(conn, applicantResult.insertId, roleId)
                                              .then(currenyAccountRes => {
                                                let rowItems = [
                                                  [applicantResult.insertId, "EUR", 1],
                                                  [applicantResult.insertId, "USD", 1],
                                                  [applicantResult.insertId, "GBP", 1]
                                                ];
                                                userModel.createCurrencyExchangeAccount(conn, rowItems).then(currencyInfo => { })
                                              }).catch(err => {
                                                response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.signUp.signUpError)));
                                              })
                                              .catch(err => {
                                                response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.signUp.signUpError)));
                                              });
                                          }
                                          let apiKey = uuidAPIKey.create();
                                          let memberId = crypto.randomBytes(6).toString('hex');
                                          const url = process.env.SANDBOX_URL;
                                          const api_doc_url = process.env.SANDBOX_API_DOC_URL;
                                          const redirect_url = process.env.SANDBOX_REDIRECT_URL;

                                          //Authentication parameters
                                          let data = {
                                            Token: jwt.sign({
                                              email: userDataParser.contact.email
                                            }, process.env.PASSWORD_CONFIG),
                                            status: STATUS.SUCCESS,
                                            message: signupConfig.message.signUp.success,
                                            client_auth: jwt.sign({
                                              email: userDataParser.contact.email
                                            }, process.env.PASSWORD_CONFIG1),
                                            member_id: process.env.CLIENT_ID,
                                            api_access_key: process.env.API_KEY,
                                            'x-auth-token': userDataParser.token
                                          };
                                          //If registration for Sanbox insert into sanbox related table and give proper response
                                          if (_.toLower(userDataParser.applicant.account_type) === "sandbox") {
                                            userModel.createSandboxUser(conn, applicantResult.insertId, memberId, apiKey.apiKey, url, api_doc_url, redirect_url)
                                              .then(sandRes => {
                                                if (sandRes.affectedRows > 0) {
                                                  //send welcome mail
                                                  mailer.signupMail(userDataParser.contact.email, userDataParser.contact.first_name, userDataParser.contact.last_name)
                                                    .then((resolve) => { })
                                                    .catch((err) => { });

                                                  //create response object
                                                  util.signUpResObject(data, applicantResult.insertId, userDataParser.contact, userDataParser.address, userDataParser.applicant)
                                                    .then(data => {
                                                      conn.commit();
                                                      logger.info('registerUser() execution completed');
                                                      response.send(ResponseHelper.buildSuccessResponse(data, signupConfig.message.signUp.success, STATUS.SUCCESS));
                                                    })
                                                }
                                              })
                                              .catch(err => {
                                                logger.error(err);
                                                conn.rollback();
                                                conn.close();
                                                logger.info('registerUser() execution completed');
                                                response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.signUp.signUpError)));
                                              })
                                          } else {
                                            //send welcome mail
                                            mailer.signupMail(request.body.email, request.body.first_name, request.body.last_name)
                                              .then((resolve) => { })
                                              .catch(err => { });
                                            //create response object
                                            util.signUpResObject(data, applicantResult.insertId, userDataParser.contact, userDataParser.address, userDataParser.applicant)
                                              .then(data => {
                                                conn.commit();
                                                logger.info('registerUser() execution completed');
                                                response.send(ResponseHelper.buildSuccessResponse(data, signupConfig.message.signUp.success, STATUS.SUCCESS));
                                              })
                                          }
                                        })
                                        .catch(err => {
                                          conn.rollback();
                                          response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.signUp.signUpError)));
                                        });
                                    })
                                    .catch(err => {
                                      conn.rollback();
                                      response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.signUp.signUpError)));
                                    })
                                })
                                .catch(err => {
                                  conn.rollback();
                                  conn.close();
                                  response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.signUp.signUpError)));
                                })
                            })
                            .catch(err => {
                              conn.rollback();
                              conn.close();
                              response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.signUp.signUpError)));
                            })
                        }, err => {
                          conn.rollback();
                          response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.signUp.signUpError)));
                        });
                      })
                      .catch(err => {
                        conn.rollback();
                        conn.close();
                        response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.signUp.signUpError)));
                      })
                  })
                  .catch(err => {
                    conn.rollback();
                    conn.close();
                    response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.signUp.signUpError)));
                  })
              })
              .catch(err => {
                response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.signUp.signUpError)));
              })
          } else {
            //Check for duplicate email mobile and generate propper response.
            if (contactDetails[0].email == userDataParser.contact.email && contactDetails[0].mobile == userDataParser.contact.mobile) {
              return response.send(ResponseHelper.buildSuccessResponse({}, signupConfig.message.signUp.emailAndMobileExist, STATUS.FAILURE));
            } else if (contactDetails[0].email == userDataParser.contact.email) {
              return response.send(ResponseHelper.buildSuccessResponse({}, signupConfig.message.signUp.emailExist, STATUS.FAILURE));
            } else {
              return response.send(ResponseHelper.buildSuccessResponse({}, signupConfig.message.signUp.mobileExist, STATUS.FAILURE));
            }
          }
        })
        .catch(err => {
          response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.signUp.signUpError)));
        })
    }, (error) => {
      response.send(ResponseHelper.buildSuccessResponse({}, error.msg, STATUS.FAILURE));
    })
    .catch((err) => {
      response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.signUp.signUpError)));
    })
}

/**
 * This function is used to get country details by country name 
 * @method isUserExists 
 * @param {Object} request - It is Request object
 * @param {Object} response - It is Response object
 * @description This method checks wheather the user provided email id or password is already
 * exists in our database or not.
 */


//Method for cheking existing email id or mobile number
export const isUserExists = (request, response) => {
  logger.info('isUserExists() initiated');
  const value = request.body.userId;

  const user_type = request.body.type;
  let type = 'mobile';

  if (_.includes(value, "@")) {
    type = 'email';
  }

  userModel.isUserExists(value, type, user_type)
    .then(result => {
      if (_.size(result) > 0) {
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
    })
    .catch(err => {
      logger.error(err);
      response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.signUp.signUpError)));
    })
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
