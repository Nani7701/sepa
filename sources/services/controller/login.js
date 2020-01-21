/**
 * loginController Controller
 * loginController is used for authentication of user to allow to enter into payvoo app.
 * it will go to  validate  the user email and password then only it will allow into payvoo
 * @package loginController
 * @subpackage controller/login/loginController
 * @author SEPA Cyper Technologies, Sekhara Suman Sahu.
 */
"use strict";

import { UserModel } from '../model/login';
import { loginConfig } from '../utility/loginConfig';
import { TokenModel } from '../model/tokenManager';
import { CONSTANTS } from '../constant';
const tokenModel = new TokenModel
const userModel = new UserModel();

/**
 * @desc This is the common login function for both business_users and personal 
 * @method loginUser
 * @param {object} request -- it is Request object
 * @param {object} response --it is Response object
 * @return returns message and status code
**/
export const loginUser = (request, response) => {
  logger.info('loginUser  initiated')
  return new Promise((resolve, reject) => {
    let email = request.body.email;
    let pwd = request.body.password;
    let mpin = request.body.password ? '' : request.body.mpin;
    let account_type = request.body.account_type;
    let role = 1;
    let roleName = "personal";
    let table = 'user_login';
    let token = uuidv1() + Math.floor(new Date() / 1000);
    const STATUS = {
      SUCCESS: 0,
      FAILURE: 1,
      ACTIVE: 1,
      INACTIVE: 0
    }

    if (account_type && typeof (account_type) != 'undefined') {
      if (_.toLower(account_type) != "personal") {
        table = 'business_users';
        (_.toLower(account_type) == "business") ? (roleName = "business", role = 2) : (roleName = "sandbox", role = 7);
      }
    } else {
      logger.debug('Email not found')
      return response.send(ResponseHelper.buildSuccessResponse({}, loginConfig.message.invalidAccountType, STATUS.FAILURE));
    }
    if (typeof (email) == 'undefined' || email == "") {
      logger.debug('Email invalid')
      return response.send(ResponseHelper.buildSuccessResponse({}, loginConfig.message.emailNotFound, STATUS.FAILURE));
    }
    if (pwd == '' && mpin == '') {
      logger.debug("password invalid")
      return response.send(ResponseHelper.buildSuccessResponse({}, loginConfig.message.passwordInvalid, STATUS.FAILURE));
    }
    var data = {
      Token: jwt.sign({ email: email }, process.env.PASSWORD_CONFIG),
      client_auth: jwt.sign({ email: email }, process.env.PASSWORD_CONFIG1, { expiresIn: 60 * 30 }),
      member_id: process.env.CLIENT_ID,
      api_access_key: process.env.API_KEY,
      message: "login successfully",
      'x-auth-token': token
    }
    if (pwd != "" && typeof (pwd) != 'undefined') {
      userModel.loginUser(email, table, role).then(loginRes => {
        if (_.size(loginRes) > 0) {
          const status = loginRes[0].status;
          if (status == STATUS.INACTIVE) {
            return response.send(ResponseHelper.buildFailureResponse(new Error(loginConfig.message.invalid_user)));
          }
          if (hashPassword.verify(pwd, loginRes[0].password)) {
            createResponse(email, roleName, data).then((data) => {
              tokenModel.saveLoginToken(JSON.parse(data).userInfo.applicant_id, token).then(saveTokenRes => {
                logger.info("check the accountType");
                if (_.toLower(account_type) != "sandbox") {
                  userModel.checkInitialPayment(JSON.parse(data).userInfo.applicant_id).then(result => {
                    if (_.size(result) > 0) {
                      logger.info('Initial payments TRUE')
                      let results = JSON.parse(data);
                      delete results.userInfo.applicant_id;
                      results.userInfo.initialPayment = false
                      return response.send(ResponseHelper.buildSuccessResponse(results, responseStatusHandler.SUCCESS.LOGIN_SUCCESS, STATUS.SUCCESS))

                    } else {
                      logger.info('Initial payments FALSE')
                      let results = JSON.parse(data);
                      delete results.userInfo.applicant_id;
                      results.userInfo.initialPayment = true
                      logger.info("response send");
                      return response.send(ResponseHelper.buildSuccessResponse(results, responseStatusHandler.SUCCESS.LOGIN_SUCCESS, STATUS.SUCCESS))
                    }
                  }).catch(err => {
                    return response.send(ResponseHelper.buildFailureResponse(new Error(CONSTANTS.ERROR_MESSAGE)));

                  })
                } else {
                  let results = JSON.parse(data);
                  delete results.userInfo.applicant_id;
                  logger.info("response send");
                  return response.send(ResponseHelper.buildSuccessResponse(results, responseStatusHandler.SUCCESS.LOGIN_SUCCESS, STATUS.SUCCESS))
                }
              }).catch((err) => {
                return response.send(ResponseHelper.buildFailureResponse(new Error(CONSTANTS.ERROR_MESSAGE)));
              })

            }).catch((err) => {
              return response.send(ResponseHelper.buildFailureResponse(new Error(CONSTANTS.ERROR_MESSAGE)));
            })
          } else {
            logger.debug('Password invalid')
            return response.send(ResponseHelper.buildSuccessResponse({}, loginConfig.message.passwordInvalid, STATUS.FAILURE));
          }
        } else {
          logger.debug('Email not found')
          return response.send(ResponseHelper.buildSuccessResponse({}, loginConfig.message.emailNotFound, STATUS.FAILURE));
        }

      }).catch(err => {
        return response.send(ResponseHelper.buildFailureResponse(new Error(CONSTANTS.ERROR_MESSAGE)));
      })
    }
    if (mpin && typeof (mpin) != 'undefined') {
      userModel.getPin(table, email).then(res => {
        if (res.length > 0) {
          const status = res[0].status;
          if (status == STATUS.INACTIVE) {
            return response.send(ResponseHelper.buildFailureResponse(new Error(loginConfig.message.invalid_user)));
          }
          if (mpin == res[0].passcode_pin) {
            logger.info("successfully get the mpin");
            createResponse(email, roleName, data).then((data) => {
              tokenModel.saveLoginToken(JSON.parse(data).userInfo.applicant_id, token).then(saveTokenRes => {
                logger.info("check the accountType");
                if (_.toLower(account_type) != "sandbox") {
                  userModel.checkInitialPayment(JSON.parse(data).userInfo.applicant_id).then((result) => {
                    if (_.size(result) > 0) {
                      logger.info("successfully get the results");
                      logger.info('Initial payments TRUE')
                      let results = JSON.parse(data);
                      delete results.userInfo.applicant_id;
                      results.userInfo.initialPayment = false
                      logger.info("response send");
                      return response.send(ResponseHelper.buildSuccessResponse(results, responseStatusHandler.SUCCESS.MPIN_LOGIN_SUCCESS, STATUS.SUCCESS));
                    } else {
                      logger.info("no results of respective person");
                      logger.info('Initial payments false')
                      let results = JSON.parse(data);
                      delete results.userInfo.applicant_id;
                      results.userInfo.initialPayment = true;
                      logger.info("response send");
                      return response.send(ResponseHelper.buildSuccessResponse(results, responseStatusHandler.SUCCESS.MPIN_LOGIN_SUCCESS, STATUS.SUCCESS));
                    }
                  }).catch((err) => {
                    return response.send(ResponseHelper.buildFailureResponse(new Error(CONSTANTS.ERROR_MESSAGE)));
                  })
                } else {
                  let results = JSON.parse(data);
                  delete results.userInfo.applicant_id;
                  logger.info("response send");
                  return response.send(ResponseHelper.buildSuccessResponse(results, responseStatusHandler.SUCCESS.LOGIN_SUCCESS, STATUS.SUCCESS))
                }
              }).catch((err) => {
                return response.send(ResponseHelper.buildFailureResponse(new Error(CONSTANTS.ERROR_MESSAGE)));
              })
            }).catch((err) => {
              return response.send(ResponseHelper.buildFailureResponse(new Error(CONSTANTS.ERROR_MESSAGE)));
            })
          } else {
            logger.debug('Password invalid');
            logger.info("response send");
            return response.send(ResponseHelper.buildSuccessResponse({}, loginConfig.message.mpin_err_msg, STATUS.FAILURE));
          }
        } else {
          logger.debug('Email not found')
          return response.send(ResponseHelper.buildSuccessResponse({}, loginConfig.message.emailNotFound, STATUS.FAILURE));
        }
      })
    }
  })
}
/**
 * @desc This is for the creating response
 * @method createResponse
 * @param {string} email -- it is request email
 * @param {string} rolename --it is rolename of person
 * @param {object} data --it is data object
 * @description -- return response object
 **/
let createResponse = function (email, roleName, data) {
  return new Promise(function (resolve, reject) {
    logger.info("createResponse() initiated");
    userModel.responseCreation(email, roleName).then(result => {
        if (_.size(result) > 0) {
          logger.info("successfully get the results");
          let isBusiness = false;
          userModel.getBusinessId(result[0].applicant_id).then(res => {
            if(res.length > 0) {
              isBusiness = true;
            } 
              data.userInfo = {
                applicant_id: result[0].applicant_id,
                email: result[0].email,
                gender: result[0].gender,
                mobile: result[0].mobile,
                phone: result[0].phone,
                first_name: result[0].first_name,
                last_name: result[0].last_name,
                account_type: result[0].account_type,
                kycStatus: result[0].kyc_status,
                country_id: result[0].country_id,
                country_name : result[0].country_name
              }
              logger.info("check the accountType");
              if (_.toLower(result[0].account_type) == "personal") {
                logger.info('User type : ' + _.toLower(result[0].account_type));
                logger.info(_.toLower(result[0].account_type) + ' user response wrapper');
                data.userInfo.first_name = result[0].first_name,
                  data.userInfo.last_name = result[0].last_name,
                  data.userInfo.next_step = result[0].next_step,
                  data.userInfo.address_line1 = result[0].address_line1,
                  data.userInfo.address_line2 = result[0].address_line2,
                  data.userInfo.city = result[0].city,
                  data.userInfo.isBusiness = isBusiness;
                data.userInfo.postal_code = result[0].postal_code,
                  data.userInfo.region = result[0].region,
                  data.userInfo.town = result[0].town
                logger.debug(_.toLower(result[0].account_type) + ' login success');
                resolve(JSON.stringify(data))
              } else {
                if (_.toLower(result[0].account_type) == "business") {
                  logger.info('User type : ' + _.toLower(result[0].account_type));
                  logger.info(_.toLower(result[0].account_type) + ' user response wrapper');
                  userModel.getBusinessId(result[0].applicant_id).then(business_Id => {
                    if (_.size(business_Id) > 0) {
                      data.userInfo["isBusiness"] = isBusiness;
                      data.userInfo["business_country_of_incorporation"] = business_Id[0].country_of_incorporation,
                        data.userInfo["business_legal_name"] = business_Id[0].business_legal_name
                      logger.info(_.toLower(result[0].account_type) + 'login success');
                      resolve(JSON.stringify(data))
                    } else {
                      data.userInfo["isBusiness"] = isBusiness;
                      data.userInfo["business_country_of_incorporation"] = null,
                        data.userInfo["business_legal_name"] = null
                      logger.debug(_.toLower(result[0].account_type) + ' login success');
                      resolve(JSON.stringify(data))
                    }
                  }).catch((err) => {
                    logger.error('Error while fetching bussiness details');
                    reject(err);
                  })
                } else {
                  logger.info('User type : ' + _.toLower(result[0].account_type));
                  logger.info(_.toLower(result[0].account_type) + ' user response wrapper');
                  userModel.getSandboxDetails(result[0].applicant_id).then((result) => {
                    if (_.size(result) > 0) {
                      data.isSandbox = 'true'
                      data.sandBoxInfo = result[0]
                      data["isBusiness"] = isBusiness;
                      data.sandBoxInfo.url = `${process.env.SANDBOX_URL}/mock/service/v1`
                      data.sandBoxInfo.api_doc_url = `${process.env.SANDBOX_API_DOC_URL}`
                      logger.info(_.toLower(result[0].account_type) + ' login success');
                      resolve(JSON.stringify(data))
                    } else {
                      logger.debug(_.toLower(result[0].account_type) + ' login success');
                      resolve(JSON.stringify(data))
                    }
                  });
                }
              }
            })
            .catch(err => {

            })
        } else {
          logger.debug('login success with empty results');
          resolve(JSON.stringify(data))
        }
      })
      .catch(err => {
        logger.error('Error while fetching logging user');
        reject(err);
      })
  })
}
