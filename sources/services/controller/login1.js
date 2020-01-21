/**
 * login Controller
 * login is used for authenticating user into payvoo app.
 * @package login
 * @subpackage controller/login
 * @author SEPA Cyber Technologies, Sekhara Suman Sahu.
 */


/* This file is modified version of current login process, With changed database structure and use of async/await
   concept in Node.js. */

import {
  Login
} from '../model/login1';
import {
  loginConfig
} from '../utility/loginConfig';
import {
  TokenModel
} from '../model/tokenManager';

let tokemodel = new TokenModel();
const loginModel = new Login();


const STATUS = {
  SUCCESS: 0,
  FAILURE: 1
}

//Method to handle request from login route
export const loginUser = (request, response) => {
  __authenticateUser(request, response).then((authRes) => {
    return authRes;
  })
}


//Method to authenticate an user.
const __authenticateUser = async (request, response) => {

  let userId = request.body.userId;
  let password = request.body.password;
  let accountType = _.toLower(request.body.account_type);
  let token = uuidv1() + Math.floor(new Date() / 1000);

  let typeOfUserId = 'mobile';
  let typeOfpassword = 'password';

  if (userId.includes('@')) {
    typeOfUserId = 'user_id';
  }

  if (userId.includes('-')) {
    typeOfUserId = 'customerId';
  }

  if (password.length == 4) {
    typeOfpassword = 'passcode_pin';
  }

  try {

    let authRes = await loginModel.authenticate(typeOfpassword, typeOfUserId, userId, accountType);
    if (authRes.length > 0) {

      if (typeOfpassword == 'password' && hashPassword.verify(password, authRes[0].password)) {
        let loginResponse = await __loginResObject(authRes[0].applicant_id, token);

        let saveToken = await tokemodel.saveLoginToken(authRes[0].applicant_id, token);

        return response.send(ResponseHelper.buildSuccessResponse(loginResponse, loginConfig.message.loginSuccess, STATUS.SUCCESS));
      } else if (typeOfpassword == 'passcode_pin' && password == authRes[0].passcode_pin, token) {
        let loginResponse = await __loginResObject(authRes[0].applicant_id, token);

        let saveToken = await tokemodel.saveLoginToken(authRes[0].applicant_id, token);
        return response.send(ResponseHelper.buildSuccessResponse(loginResponse, loginConfig.message.loginSuccess, STATUS.SUCCESS));

      } else {
        if (typeOfpassword == 'password'){
          return response.send(ResponseHelper.buildSuccessResponse({}, loginConfig.message.passwordInvalid, STATUS.FAILURE));
        } else {
          return response.send(ResponseHelper.buildSuccessResponse({}, loginConfig.message.invalidMapin, STATUS.FAILURE));
        }
      }

    } else {
      return response.send(ResponseHelper.buildSuccessResponse({}, loginConfig.message.userNotFound, STATUS.FAILURE));
    }
  } catch (err) {
    return response.send(ResponseHelper.buildFailureResponse(new Error(CONSTANTS.ERROR_MESSAGE)));
  }
}

//Method for generating login response
const __loginResObject = async (applicantId, token) => {

  let isBusiness = false;
  let userData = await loginModel.getUserData(applicantId);
  

  let loginRes = {
    Token: jwt.sign({
      email: userData[0].user_id
    }, process.env.PASSWORD_CONFIG),
    client_auth: jwt.sign({
      email: userData[0].user_id
    }, process.env.PASSWORD_CONFIG1, {
      expiresIn: 60 * 30
    }),
    member_id: process.env.CLIENT_ID,
    api_access_key: process.env.API_KEY,
    message: "login successfully",
    'x-auth-token': token,
    'userInfo': {
      "email": null,
      "gender": null,
      "mobile": null,
      "phone" : null,
      "first_name": null,
      "last_name": null,
      "account_type": null,
      "kycStatus": null,
      "country_id": 0,
      "country_name" : null,
      "address_line1" : null,
      "address_line2" : null,
      "city" : null,
      "postal_code" : null,
      "isBusiness": isBusiness,
      "business_country_of_incorporation": null,
      "business_legal_name": null,
      "initialPayment": true
    }
  }

  let getCompanyData = await loginModel.getCompanyDetail(applicantId);

  if (getCompanyData.length > 0) {
    isBusiness = true;

    loginRes.userInfo.business_country_of_incorporation = getCompanyData[0].country_of_incorporation,
      loginRes.userInfo.business_legal_name = getCompanyData[0].business_legal_name
  } else {
    loginRes.userInfo.business_country_of_incorporation = null,
      loginRes.userInfo.business_legal_name = null
  }

  let isInitialPayment = await loginModel.checkInitialPayment(applicantId);
  if (isInitialPayment.length > 0) {
    loginRes.userInfo.initialPayment = false;
  } else {
    loginRes.userInfo.initialPayment = true;
  }

  if (userData[0].account_type == 'personal') {
    loginRes.userInfo.email = userData[0].user_id,
      loginRes.userInfo.gender = userData[0].gender,
      loginRes.userInfo.mobile = userData[0].mobile,
      loginRes.userInfo.phone = userData[0].phone,
      loginRes.userInfo.first_name = userData[0].first_name,
      loginRes.userInfo.last_name = userData[0].last_name,
      loginRes.userInfo.account_type = userData[0].account_type,
      loginRes.userInfo.kycStatus = userData[0].kyc_status,
      loginRes.userInfo.country_id = userData[0].country_id,
      loginRes.userInfo.country_name = userData[0].country_name,
      loginRes.userInfo.address_line1 = userData[0].address_line1,
      loginRes.userInfo.address_line2 = userData[0].address_line2,
      loginRes.userInfo.city = userData[0].city,
      loginRes.userInfo.postal_code = userData[0].postal_code

  } else {
    loginRes.userInfo.email = userData[0].user_id,
      loginRes.userInfo.gender = userData[0].gender,
      loginRes.userInfo.mobile = userData[0].mobile,
      loginRes.userInfo.phone = userData[0].phone,
      loginRes.userInfo.first_name = userData[0].first_name,
      loginRes.userInfo.last_name = userData[0].last_name,
      loginRes.userInfo.account_type = userData[0].account_type,
      loginRes.userInfo.kycStatus = userData[0].kyc_status,
      loginRes.userInfo.country_id = userData[0].country_id,
      loginRes.userInfo.country_name = userData[0].country_name,
      loginRes.userInfo.isBusiness = isBusiness
  }

  return loginRes;
}
