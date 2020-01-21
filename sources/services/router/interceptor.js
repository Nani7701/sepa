/**
 * tokenManager Controller
 * tokenManager is used for validate token , generate new token
 * @package tokenmanager
 * @subpackage controller/tokenManager
 * @author SEPA Cyber Technologies, Sekhara Suman Sahu.
 */

"use strict";
import { TokenModel } from '../model/tokenManager';
import { langEngConfig } from '../utility/lang_eng';

const validateToken = new TokenModel();

const STATUS = {
  SUCCESS: 0,
  FAILURE: 1,
  INVALIDTOKEN: 2
}

class Token {
  constructor(req) {
    this.token = req.headers["x-auth-token"] ? req.headers["x-auth-token"] : '';
    this.newToken = uuidv1() + Math.floor(new Date() / 1000);
    this.req = req
  }
}

/**
 * @function isTokenValid
 * @desc this method is used for validate token if token is expires then send back else call next function with applicant id 
 * @param None
 * @return return 403 if token is invalid or expired 
 * 
 */

// here we are checking router
let _isRouteValid = (request) => {
  if (_.includes(request.originalUrl, '/country/') || _.includes(request.originalUrl, 'generateOtp') || _.includes(request.originalUrl, 'verifyOtp') || _.includes(request.originalUrl, 'user/registration') || _.includes(request.originalUrl, 'user/isUserExists') || _.includes(request.originalUrl, 'user/login') || _.includes(request.originalUrl, 'user/kycEntry') ||
    _.includes(request.originalUrl, '/service/businessType') || _.includes(request.originalUrl, '/service/sectorType/')) {
    return true;
  }
  return false
};

//create a object for saving in audit log
let _createObject = (request) => {
  return JSON.stringify({
    body: request.body,
    headers: request.headers,
    originalUrl: request.originalUrl,
    params: request.params,
    rawHeaders: request.rawHeaders,
    route: request.route
  })
}

// here we are storing logs Info 
let _saveAuditLog = (token, request) => {
  logger.info('_saveAuditLog() initiated save logger')
  return new Promise(function (resolve, reject) {
    validateToken.saveLog(token, _createObject(request)).then(auditLogInfo => {
      logger.info('saveLog() save details success')
      resolve(auditLogInfo)
    }, (err) => {
      logger.error('Error while save audit logger')
      reject(err);
    });
  });
}

// check token is expire or not 
let _isTokenExpire = (tokenInfo, request, response, next) => {
  logger.info('Initiated for verifing token _isTokenExpire()');
  if (tokenInfo.length == 0) {
    logger.info('No data found for verifying token');
    return response.send(ResponseHelper.buildSuccessResponse({
      "message": {
        "message": langEngConfig.message.token.tokenExpired, "status": STATUS.SUCCESS
      }
    }, langEngConfig.message.token.tokenExpired, STATUS.INVALIDTOKEN));
  } else {
    logger.info('Checking token is valid ....');
    var date = new Date()
    if (new Date(tokenInfo[0].created_on).getTime() + process.env.TOKEN_EXP_TIME * 60000 > date.getTime()) {
      logger.info('Valid token proceed for next level ....');
      request.params["applicant_id"] = tokenInfo[0].applicant_id;
      next();
    } else {
      logger.info('Token is expire ......');
      return response.send(ResponseHelper.buildSuccessResponse({
        "message": {
          "message": langEngConfig.message.token.tokenExpired, "status": STATUS.SUCCESS
        }
      }, langEngConfig.message.token.tokenExpired, STATUS.INVALIDTOKEN));
    }
  }
}

// check token is valid or not 
let isTokenValid = (request, response, next) => {
  logger.info('Token validater initiated isTokenValid()')
  var token = new Token(request);
  _saveAuditLog(token.token, token.req).then(auditInfo => {
    logger.info('Audit log captured _saveAuditLog()')
    if (_isRouteValid(request)) {
      logger.debug('Valid router proceed for next _isRouteValid()')
      next();
    } else {
      if (token.token == '' || token.token == 'undefined') {
        return response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.token.invalid, STATUS.FAILURE))
      }
      validateToken.getTokenDetails(token.token).then(tokenInfo => {
        logger.info('Checking token is valid _isTokenExpire()')
        return _isTokenExpire(tokenInfo, request, response, next)
      }, err => {
        logger.error('Fail while geting token getTokenDetails()')
        return response.send(ResponseHelper.buildFailureResponse(new Error(CONSTANTS.ERROR_MESSAGE)));
      })
    }
  }, err => {
    logger.error('Fail while save audit log token _saveAuditLog()')
    return response.send(ResponseHelper.buildFailureResponse(new Error(CONSTANTS.ERROR_MESSAGE)));
  })
}

/**
 * @function refreshToken
 * @desc this method is used for  generate new token is token is expire middle of operation/ transaction;
 * @param None
 * @return return with new token
 */

let refreshToken = (request, response, next) => {
  var token = new Token(request)
  validateToken.getTokenDetails(token.token)
    .then(tokenInfo => {
      if (tokenInfo.length == 0) {
        logger.info('getTokenDetails() token is expire')
        // response.send({ message: 'token is expire', status: STATUS.FAILURE })
        return response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.token.tokenExpired, STATUS.FAILURE));
      } else {
        logger.info('getTokenDetails() with refershToken()')
        validateToken.saveToken(tokenInfo[0].applicant_id, token.newToken)
          .then(tokenInfo => {
            logger.info('saveToken() success')
            // response.send({ 'x-auth-token': token.newToken, status: STATUS.SUCCESS }); 
            return response.send(ResponseHelper.buildSuccessResponse({ 'x-auth-token': token.newToken }, langEngConfig.message.token.invalid, STATUS.FAILURE))
          }, err => {
            logger.error('saveToken() fail')
            return response.send(ResponseHelper.buildFailureResponse(new Error(CONSTANTS.ERROR_MESSAGE)));
          })
      }
    }, err => {
      logger.error('getTokenDetails() failure while fetching detailes')
      return response.send(ResponseHelper.buildFailureResponse(new Error(CONSTANTS.ERROR_MESSAGE)));
    })
}



export {
  isTokenValid,
  refreshToken
}
