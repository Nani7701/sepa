/**
 * loginController Controller
 * loginController is used for authentication of user to allow to enter into payvoo app.
 * it will go to  validate  the user email and password then only it will allow into payvoo
 * @package loginController
 * @subpackage controller/login/loginController
 * @author SEPA Cyper Technologies, Sekhara Suman Sahu.
 */

"use strict";

import { User } from '../model/password';
import { configVariable } from '../utility/password';
import { loginConfig } from '../utility/loginConfig';
import { langEngConfig } from '../utility/lang_eng';
import { forgotStatus } from '../mailer/mail';
//import { logger } from 'handlebars';
const crypto = require('crypto');
const user = new User();

const STATUS = {
  FAILED: 1,
  SUCCESS: 0
};

const EXPIRE = {
  FAILED: 1,
  SUCCESS: 0
}

class UserRequest {
  constructor(userRequest) {
    this.business_type = (userRequest.body.account_type === 'business' || userRequest.body.account_type === 'sandbox') ? `business_users` : `user_login`;
    this.email = userRequest.body.email;
    this.account_type = userRequest.body.account_type;
    this.Update_business_type = (userRequest.params.type === 'business' || userRequest.params.type === 'sandbox') ? `business_users` : `user_login`;
    this.code = userRequest.params.code;
    this.newPassword = userRequest.body.newPassword;
    this.applicant_id = userRequest.params.applicant_id;
    this.password = userRequest.body.password;
    this.id = userRequest.body.id;
  }
	/**
	 * @function isValidUserRequest
	 * @desc this function is to validate user given otp
	 * @param None
	 * @return True if request is valid OTP. False if request is invalid
	 * 
	 */
  isValidOTPRequest(businessType) {
    if (Utils.isEmptyObject(businessType)) {
      return false; 
    }
    return true;
  }
}
/**
 * @desc Method for set the forgotPassword
 * @method forgotPassword 
 * @param {Object} request - It is Request object
 * @param {Object} response - It is Response object
 */
var forgotPassword = (req, res) => {
  logger.info('forgotPassword() intiated');
  const userRequest = new UserRequest(req);
  if (userRequest.account_type == "" || userRequest.email == "") {
    res.send(ResponseHelper.buildSuccessResponse({}, `${loginConfig.message.invalidAccountType} or ${loginConfig.message.invalid_email}`, STATUS.FAILED));
  } else {
    user.forgotPassword(userRequest.business_type, userRequest.email).then(userInfo => {
      logger.info(' response of user.forgotPassword()');
      if (userInfo.length == 0) {
        logger.warn('userInfo.length must be equal to zero');
        res.send(ResponseHelper.buildSuccessResponse({}, configVariable.message.errorInSendEmail, EXPIRE.FAILED));
      } else{
        let user_info = _encrypt(userInfo[0].user_id);
        sendResetLink(userRequest.email, userRequest.account_type,user_info).then(info => {
          logger.info('user.sendResetLink() intiated');
          res.send(ResponseHelper.buildSuccessResponse({}, `Email sent to ${req.body.email},${configVariable.message.infoResetPassword}`, STATUS.SUCCESS));
        }).catch(err => {
          logger.info('error while user.sendResetLink()');
          res.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
        })
      }
    }).catch(e=>{
      logger.error("error while forgotPassword")
      res.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
    })
  }
}
/**
 * @desc Method for update the Password
 * @method forgotPassword 
 * @param {Object} request - It is Request object
 * @param {Object} response - It is Response object
 */
var updatePassword = (req, res) => {
  logger.info('updatePassword intiated');
  const userRequest = new UserRequest(req);
  user.updatePassword(userRequest.Update_business_type, userRequest.newPassword, _decrypt(userRequest.code)).then(info => {
    logger.info('user.updatePassword() executed');
    res.send(ResponseHelper.buildSuccessResponse(info, configVariable.message.passwordUpdated, STATUS.SUCCESS));
  }, (err) => {
    logger.error('error in user.updatePassword()');
    res.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
  })

}

/**
 * @desc Method for change the Password
 * @method changePassword 
 * @param {Object} request - It is Request object
 * @param {Object} response - It is Response object
 */
var changePassword = (req, res) => {
  logger.info('changePassword() intiated');
  const userRequest = new UserRequest(req);
  user.changePassword(userRequest.business_type, userRequest.applicant_id).then(password => {
    logger.info('user.changePassword() start');
    if (hashPassword.verify(req.body.oldPassword, password[0].password)) {
      logger.warn('password must be verify');
      user.saveNewPassword(userRequest.business_type, userRequest.newPassword, userRequest.applicant_id).then(message => {
        logger.info(' Response of user.saveNewPassword()');
        res.send(ResponseHelper.buildSuccessResponse({}, configVariable.message.passwordChange, STATUS.SUCCESS));

      }, (err) => {
        logger.error('error in user.saveNewPassword()');
        res.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
      })
    } else {
      logger.error('error while password verification');
      res.send(ResponseHelper.buildSuccessResponse({}, configVariable.message.oldPasswordNotValid, STATUS.FAILED));
    }
  }, (err) => {
    logger.error('error in user.changePassword()');
    res.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
  })
}

/**
 * @desc Method for reset the Password
 * @method resetPassword 
 * @param {Object} request - It is Request object
 * @param {Object} response - It is Response object
 */
var resetPassword = (req, res) => {
  logger.info('resetPassword() intiated');
  const userRequest = new UserRequest(req);
  user.resetPassword(userRequest.business_type, userRequest.password, _decrypt(userRequest.id)).then(message => {
    logger.info('response of user.resetPassword()');
    res.send(ResponseHelper.buildSuccessResponse({}, configVariable.message.passwordChangeSuccessfully, STATUS.SUCCESS));
  }, (err) => {
    logger.error('error while user.password()');
    res.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
  })

}

var _encrypt = (text) => {
  var cipher = crypto.createCipher('aes-256-cbc', 'd6F3Efeq')
  var crypted = cipher.update(text, 'utf8', 'hex')
  crypted += cipher.final('hex');
  return crypted;
}

var _decrypt = (text) => {
  var decipher = crypto.createDecipher('aes-256-cbc', 'd6F3Efeq')
  var dec = decipher.update(text, 'hex', 'utf8')
  dec += decipher.final('utf8');
  return dec;
}



let sendResetLink = function (email, accountType, userId) {
  logger.info('sendResetLink() intiated');
  return new Promise(function (resolve, reject) {
    var link = `https://${process.env.FORGOT_PASSWORD_URL}/#/index/forgot/${accountType}/${userId}`
    forgotStatus(email, link, accountType).then(function (data) {
      logger.info('sendResetLink() executed');
      resolve(data)
    }, function (err) {
      logger.error('error in sendResetLink()');
      reject(err)
    })
  })
}


export {
  forgotPassword,
  updatePassword,
  changePassword,
  resetPassword
}