/**
 * otpController Controller
 * otpController is used for send otp to user email and mobile and verify the email and mobile then
   only we will allow into next steps
 * @package otpController
 * @subpackage controller/otp/otpController
 * @author SEPA Cyber Technologies, Sujit Kumar.
 */

"use strict";

import { OTP } from '../model/otp';
import { Utils } from '../utility/utils';
import { configVariable } from '../utility/otp';
import { sendEmail, validateEmail, randomNumber} from '../mailer/mail';
import { mobileOtp } from '../controller/commonCode';
import { langEngConfig } from '../utility/lang_eng';
const otp = new OTP();

const STATUS = {
	FAILED: 1,
	NO_MONEY: 3,
	INVALID_MOBILE: 4,
	SUCCESS: 0
};

const EXPIRE = {
	FAILED: 0,
	SUCCESS: 1
}

const MOBICA_ERRORS = {
	ERROR_INSUFFICIENT_BALANCE: 1117,
	ERROR_INCORRECT_MOBILE_NUMBER: 1006,
};

const OTP_LENGTH = {
	MIN_LENGTH: 6,
	MAX_LENGTH: 6,
};
class OTPRequestData {
	constructor(otpRequest) {
		this.otpValue = otpRequest.otpReference;
		this.otpId = otpRequest.referenceValue;
	}
	/**
	 * @function isValidOTPRequest
	 * @desc this function is to validate user given otp
	 * @param None
	 * @return True if request is valid OTP. False if request is invalid
	 * 
	 */

	isValidOTPRequest() {
		if (Utils.isEmptyObject(this.otpId)) {
			return false;
		}
		return true;
	}
	isValidOTPValue() {
		if (Utils.isEmptyObject(this.otpValue) ||
			this.otpValue.length < OTP_LENGTH.MIN_LENGTH ||
			this.otpValue.length > OTP_LENGTH.MAX_LENGTH) {
			return false
		}
		return true;
	};
}
/**
 * this function is used to send OTP to email   
 * @method _sendOTPToEmail 
 * @param {Object} request - It is Request object
 * @param {Object} response - It is Response object
 */
const _sendOTPToEmail = (emailId, response) => {
	const oneTimePasscode = randomNumber();
	logger.info("initialize _sendOTPToEmail ")
	_saveOtp(emailId, oneTimePasscode, 5, 'email', otp)
		.then((message) => {
			return response.send(ResponseHelper.buildSuccessResponse(message, configVariable.message.emailOtpSent, STATUS.SUCCESS));
			// sendEmail(emailId, oneTimePasscode, (err, results) => {
			// 	if (err) {
			// 		logger.error("error in send email");
			// 		return response.send(ResponseHelper.buildSuccessResponse({},configVariable.message.sendEmailError, STATUS.FAILED));
			// 	} else {
			// 		logger.info("otp send ");
			// 		return response.send(ResponseHelper.buildSuccessResponse(message, configVariable.message.emailOtpSent, STATUS.SUCCESS));
			// 	}
			// });
		})
		.catch((error) => {
			logger.error("error in save  email otp");
			response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
		});
};

/**
 * this function is used to send OTP to mobile number   
 * @method _sendOTPToMobileNumber 
 * @param {Object} request - It is Request object
 * @param {Object} response - It is Response object
 */
const _sendOTPToMobileNumber = (mobileNumber, response) => {
	const oneTimePasscode = randomNumber();
	logger.info("initialize _sendOTPToMobileNumber ")
	_saveOtp(mobileNumber, oneTimePasscode, 5, 'mobile', oneTimePasscode)
		.then((info) => {
			logger.info("save mobile otp ");
			return response.send(ResponseHelper.buildSuccessResponse(info, configVariable.message.mobileOtpSent, STATUS.SUCCESS));
			// mobileOtp(mobileNumber, `Your Pay Voo code: ${oneTimePasscode} (it will expire in 5 mins).`)
			// 	.then((result) => {
			// 		logger.info("send  mobile otp ");
			// 		return response.send(ResponseHelper.buildSuccessResponse(info, configVariable.message.mobileOtpSent, STATUS.SUCCESS));
			// 	})
			// 	.catch((error) => {
			// 		logger.error("error in send   mobile  otp");
			// 		if (error.status == MOBICA_ERRORS.ERROR_INSUFFICIENT_BALANCE) {
			// 			return response.send(ResponseHelper.buildFailureResponse(new Error(configVariable.message.sendMobileError)));
			// 			// return response.send(new Error(configVariable.message.sendMobileError));
			// 		}
			// 		if (error.status == MOBICA_ERRORS.ERROR_INCORRECT_MOBILE_NUMBER) {
			// 			return response.send(ResponseHelper.buildFailureResponse(new Error(configVariable.message.sendMobileError)));
			// 			// return response.send(new Error(configVariable.message.sendMobileError));
			// 		}
			// 		return response.send(ResponseHelper.buildFailureResponse(new Error(configVariable.message.sendMobileError)));
			// 		// return response.send(new Error(configVariable.message.sendMobileError));
			// 	});
		});
};
/**
 * this function is used to save Otp in data base  
 * @method _saveOtp 
 * @param {Object} request - It is Request object
 * @param {Object} response - It is Response object
 */
var _saveOtp = function (referenceValue, oneTimePasscode, expire, type) {
	return new Promise(function (resolve, reject) {
		logger.info("initialize _saveOtp ");
		otp.getUserId(referenceValue).then(rows => {
			logger.info(" get user iD ");
			var emailNumber = '', mobileNumber = '';
			if (_.size(rows) < 1) {
				if (type === "email") {
					logger.info(" if type email");
					emailNumber = referenceValue, mobileNumber = '';
				} else {
					logger.info(" if type mobile");
					emailNumber = '', mobileNumber = referenceValue;
				}
				otp.saveOTP(oneTimePasscode, emailNumber, mobileNumber, expire).then(rows => {
					logger.info(" success _saveOtp");
					if (type === 'email') {
						resolve({ "message": configVariable.message.emailOtpSent, status: STATUS.SUCCESS, expire: EXPIRE.FAILED });
					} else {
						resolve({ "message": configVariable.message.mobileOtpSent, status: STATUS.SUCCESS, expire: EXPIRE.FAILED });
					}
				}).catch(err => {
					logger.error("error in save Otp");
					reject({ "message": configVariable.message.otpFailed, status: STATUS.FAILED, expire: EXPIRE.FAILED, err: err });
				})
			} else {
				logger.info("otp update");
				var today = new Date();
				global.date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
				global.time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
				var currentDate = date + ' ' + time;
				otp.updateOTP(referenceValue, oneTimePasscode, currentDate).then(res => {
					logger.info(" update OTP");
					resolve({ "message": configVariable.message.otpsent, status: STATUS.SUCCESS, expire: EXPIRE.FAILED });
				}).catch(err => {
					logger.error(" error in update otp ");
					reject({ "message": configVariable.message.otpFailed, status: STATUS.FAILED, expire: EXPIRE.FAILED, err: err });
				})
			}
		}, (err) => {
			logger.error(" error in generate otp ");
			reject({ "message": configVariable.message.otpFailed, status: STATUS.FAILED, expire: EXPIRE.FAILED, err: err });

		})
	})
}

/**
 * this is the common function for generate OTP for mobile and email 
 * @method generateOTP 
 * @param {Object} request - It is Request object
 * @param {Object} response - It is Response object
 */
export const generateOTP = function (request, response) {
	logger.info("initialize generateOTP ");
	const otpRequestData = new OTPRequestData(request.body);
	if (!otpRequestData.isValidOTPRequest()) {
		logger.error("otp not valid ");
		return response.send(ResponseHelper.buildSuccessResponse({},configVariable.message.checkEmailMobile, STATUS.FAILED));
	}
    const otp = new OTP(); //do I need instance?
	if (validateEmail(otpRequestData.otpId)) {
		logger.info("check email is valid ");
		return _sendOTPToEmail(otpRequestData.otpId, response);
	}
	logger.info("call _sendOTPToMobileNumber function  ");
	return _sendOTPToMobileNumber(otpRequestData.otpId, response);
};

/**
 * this function is used for verified OTP from data base 
 * @method verifyOTP 
 * @param {Object} request - It is Request object
 * @param {Object} response - It is Response object
 */
export const verifyOTP = (request, response) => {
	logger.info("initialize verifyOTP() ");
	const otpRequestData = new OTPRequestData(request.body);
	if (!otpRequestData.isValidOTPRequest() ||
		!otpRequestData.isValidOTPValue()) {
		logger.info("check otp is valid or not ");
		return response.send(ResponseHelper.buildSuccessResponse({}, configVariable.message.checkEmailMobile,STATUS.FAILED));
	}

	const otp = new OTP(); //do I need instance?
	otp.isValidOTP(otpRequestData.otpValue, otpRequestData.otpId)
		.then(result => {
			logger.info("initialize  isValidOTP function ");
			//  need discuss how to check otp is expire or not
			if (result.length == 0) {
				logger.info("otp already verified ");
				return response.send(ResponseHelper.buildSuccessResponse({},configVariable.message.checkInput,STATUS.FAILED));
			}
			if (new Date(result[0].created).getTime() + 5 * 60 * 1000 < new Date().getTime()) {
				logger.warn("check otp is expired or not ");
				return response.send(ResponseHelper.buildSuccessResponse({},configVariable.message.otpExpire,STATUS.SUCCESS));
			} else {
				logger.info("otp verified ");
				otp.updateOtpStatus(result, 1).then(()=>{
					return response.send(ResponseHelper.buildSuccessResponse({},configVariable.message.otpVerifiedTrue,STATUS.SUCCESS));
				})
				.catch(err=>{
					return response.send(ResponseHelper.buildSuccessResponse({},configVariable.message.checkInput,STATUS.FAILED));
				})
				
			}
		})
		.catch(err => {
			logger.error('error in isValidOTP ');
			return response.send(new Error( configVariable.message.otpVerified));
		});
}
