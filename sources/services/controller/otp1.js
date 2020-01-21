/**
 * otpController Controller
 * otpController is used for send otp to user email and mobile and verify the email and mobile then
   only we will allow into next steps
 * @package otpController
 * @subpackage controller/otp/otpController
 * @author SEPA Cyber Technologies, Sekhar Suman Sahu.
 */

import {
  OtpModel
} from '../model/otp1';
import {
  Utils
} from '../utility/utils';
import {
  configVariable as otpUtil
} from '../utility/otp';
let util = new Utils();
let otpModel = new OtpModel();

class Otp {
  constructor(data) {
    this.otp = __getOtp();
    this.refferValue = data.referenceValue;
    this.createdOn = util.getCurrentTimeStamp();
  }
}

const STATUS = {
  SUCCESS: 0,
  FAILURE: 1
}

//Method for generating OTP
export const generateOtp = (request, response) => {
  __createOtp(request, response).then(otpRes => {
    return otpRes;
  })
}

//Method to create OTP
const __createOtp = async (request, response) => {
  let otp = new Otp(request.body);
  let type = 'mobile';

  if (otp.refferValue.includes('@')) {
    type = 'email';
  }

  try {
    //Check wheather the email or mobile number is already exist.
    let checkunique = await otpModel.isUnique(otp.refferValue);
    if (checkunique.length > 0) {
      //If exist update the OTP
      let doUpdateOtp = await otpModel.updateOtp(otp.otp, otp.createdOn, otp.refferValue);
    } else {
      //If not create a new OTP
      let doCreateotp = await otpModel.saveOtp(otp.refferValue, otp.otp, otp.createdOn);
    }

    //Based upon the inpust type send the proper response
    //Need to write sending mail or message funcationality below thos line
    if (type == 'mobile') {
      return response.send(ResponseHelper.buildSuccessResponse({}, otpUtil.message.mobileOtpSent, STATUS.SUCCESS));
    } else {
      return response.send(ResponseHelper.buildSuccessResponse({}, otpUtil.message.emailOtpSent, STATUS.SUCCESS));
    }
  } catch (err) {
    logger.error('Error occured' + err);
    return response.send(ResponseHelper.buildFailureResponse(new Error(CONSTANTS.ERROR_MESSAGE)));
  }
}

//Method veriying OTP
export const verifyOtp = (request, response) => {
  __verifyOtp(request, response).then(otpRes => {
    return otpRes;
  })
}

const __verifyOtp = async (request, response) => {
  let refferValue = request.body.referenceValue;
  let otp = request.body.otpReference;

  try {
    let isExpired = await otpModel.isExpired(refferValue);
    if (isExpired.length > 0) {

      let cuurentTime = Date.now(); //current time in miliseconds
      let otpCreatedTime = Date.parse(isExpired[0].created_on); //otp timestamp in millisecond
      let diffMili = cuurentTime - otpCreatedTime;
      let diffSec = diffMili / 1000;
      let diffmin = Math.floor(diffSec / 60); // Converting difference milisecond in minute

      if (isExpired[0].isVerified) {
        return response.send(ResponseHelper.buildSuccessResponse({}, otpUtil.message.otpVerified, STATUS, FAILURE));
      } else if (diffmin > 5) {
        let expOtp = await otpModel.doExpireOtp(refferValue);
        return response.send(ResponseHelper.buildSuccessResponse({}, otpUtil.message.otpExpire, STATUS.FAILURE));
      } else {
        if (otp == isExpired[0].otp) {
          let verifyOtpRes = await otpModel.verifyOtp(util.getCurrentTimeStamp(), refferValue);
          return response.send(ResponseHelper.buildSuccessResponse({}, otpUtil.message.otpVerifiedTrue, STATUS.SUCCESS));
        } else {
          return response.send(ResponseHelper.buildSuccessResponse({}, otpUtil.message.checkInput, STATUS.FAILURE));
        }
      }
    } else {
      return response.send(ResponseHelper.buildSuccessResponse({}, otpUtil.message.checkEmailMobile, STATUS.FAILURE));
    }
  } catch (err) {
    logger.error('Error occured ' + err);
    return response.send(new Error(otpUtil.message.otpVerifiedFalse));
  }
}


//Method to create 6 digit OTP
const __getOtp = () => {
  let digit = '0123456789';
  let otp = '';

  for (let i = 0; i < 6; i++) {
    otp += digit[Math.floor(Math.random() * 10)];
  }
  return '012345';
}