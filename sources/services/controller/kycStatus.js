/**
* @kyc Controller
* @description It will get kyc (IDNow) status of a user.
* @fires It serves status for the PayVoo user from IdNow.
* @author SEPA Cyber Technologies , Satyanarayana G .
*/


import { Kyc } from '../model/kyc';
import { Utils } from '../utility/utils';
import { sendKycStatus } from '../mailer/mail';
import { langEngConfig } from '../utility/lang_eng';

const kyc = new Kyc();

const STATUS = {
  FAILED: 1,
  SUCCESS: 0,
  VALID: 2
};

const KYC_DEFAULT_STATUS = ['SUCCESS','SUCCESS_DATA_CHANGED','FRAUD_SUSPICION_CONFIRMED'];
const KYC_SUCCESS = ['SUCCESS','SUCCESS_DATA_CHANGED','FRAUD_SUSPICION_CONFIRMED','REVIEW_PENDING','FRAUD_SUSPICION_PENDING','FINISH']

const DEFAULT_STATUS = 'PENDING';
const SUCCESS_STATUS = 'SUCCESS';

class ValidateKycData {
  constructor(kycRequest) {
    this.kycApplicantId = kycRequest.applicant_id;
  }
	/**
	 * @function isValidKYCRequest
	 * @desc this function is to validate user kycApplicantId
	 * @param None
	 * @return True if request is valid kycApplicantId. False if request is invalid
	 * 
	 */
  isValidKYCRequest() {
    if (Utils.isEmptyObject(this.kycApplicantId)) {
      return true;
    }
    return false;
  }
}

/**
 * @desc This function is used to triggering kyc status
 * @method kycCurrentStatus 
 * @param {Object} request - It is Request object
 * @param {Object} response - It is Response object
 */
export const kycCurrentStatus = function (request, response) {
  logger.info('initialize kycCurrentStatus()');
  const validateKycData = new ValidateKycData(request.params);
  logger.info('Procced for _fetchUserDetails()');
  return _fetchUserDetails(validateKycData.kycApplicantId, request, response);
}


/**
 * @desc This function is used to sending email && mobile messages for kyc status
 * @method notifyKycStatus 
 * @param {Object} request - It is Request object
 * @param {Object} response - It is Response object
 */
export const notifyKycStatus = function (request, response) {
  logger.info('initialize notifyKycStatus()');
  return _notifyKycStatus(request.params.email, request.params.mobileNumber, request.params.status, response);
}


/**
 * @desc This function is used to verify kyc with applicantId
 * @method verifyKyc 
 * @param {Object} request - It is Request object
 * @param {Object} response - It is Response object
 */
export const verifyKyc = function (request, response) {
  logger.info('initialize verifyKyc()');
  const validateKycData = new ValidateKycData(request.params);
  logger.info('Procced for _verifyKyc()');
  return _verifyKyc(validateKycData.kycApplicantId, response);
}

/**
 * @desc This function is used to update the kyc status with respect to identity verification
 * @method updateKycStatus 
 * @param {Object} request - It is Request object
 * @param {Object} response - It is Response object
 */

export const updateKycStatus = function (request, response) {
  logger.info('initialize updateKycStatus()');
  const validateKycData = new ValidateKycData(request.params);
  logger.info('Procced for updateKycStatus()');
  return _updateKycStatus(validateKycData.kycApplicantId, request, response);
}


/**
 * @desc This function is used to update kyc status
 * @method _updateKycStatus 
 * @param {Integer} applicant_id - Used for fetching user details 
 * @param {Object}  req - It is Request object
 * @param {Object}  res - It is Response object
 * @return
 */

const _updateKycStatus = (applicant_id, req, res) => {
  let kycObject = {};
  kycObject.applicantId = applicant_id;
  kycObject.transactionNumber = (req.body.status == 'PENDING') ? req.body.transactionNumber : req.body.transactionNumber;
  kycObject.id = (req.body.status == 'PENDING') ? req.body.identId :  req.body.identId;
  kycObject.status = req.body.status;
  return kyc.updateKycStatus(kycObject).then(results => {
    if (results.affectedRows) {
      logger.info('kyc status updated')
      res.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.kyc.updateSuccess, STATUS.SUCCESS))
    }
    else {
      logger.error('Identity response failure , while updating')
      res.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.kyc.updateFail, STATUS.FAILED))
    }
  }, err => {
    logger.error('Identity response failure , while updating')
    res.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.kyc.updateFail, STATUS.FAILED))
  }).catch(err => {
    logger.error('Some thing went wrong ,.......')
    res.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.internalError)));
  })

}



/**
 * @desc This function is used to fetch user details for kyc
 * @method _fetchUserDetails 
 * @param {Integer} applicant_id - Used for fetching user details 
 * @param {Object}  req - It is Request object
 * @param {Object}  res - It is Response object
 * @return
 */

const _fetchUserDetails = (applicant_id, req, res) => {
  logger.info('initiated _fetchUserDetails()');
  kyc.getKycByApplicant(applicant_id).then(results => {
    if (results.length > 0) {
      logger.info('successfully fetched getKycByApplicant()');
      let applicantId = results[0].applicant_id,
        transactionNumber = results[0].kyc_transaction_id,
        kycStatus = results[0].kyc_status,
        mobile = results[0].mobile;
      if (!KYC_DEFAULT_STATUS.includes(kycStatus) && transactionNumber) {
        logger.info('proceed for kyc if transation no exist');
        requestForKycStatus(transactionNumber, req).then(function (response) {
          if (response) {
            try {
              if (response && response.body.data && response.body.data.identificationprocess && response.body.data.identificationprocess.result) {
                kycStatusSuccess(results[0].email, mobile, response.body.data.identificationprocess.result, response.body.data.identificationprocess.reason, transactionNumber).then(function (response) {
                  res.send(response);
                })
              }
              else {
                if (response && response.body.data && response.body.data.errors && response.body.data.errors.length > 0) {
                  kycStatusError(results[0].email, mobile, applicantId, response.body.data.errors).then(function (response) {
                    res.send(response);
                  })
                }
                else {
                  if (response.body && response.body.message.message && response.body.message.status == STATUS.SUCCESS) {
                    //res.send(ResponseHelper.buildFailureResponse(response.body.message.message));
                    // res.send(ResponseHelper.buildFailureResponse(res1.body.message));
                    res.send(ResponseHelper.buildSuccessResponse(
                      response.body
                      , langEngConfig.message.token.tokenExpired, STATUS.VALID));
                  }
                  else {
                    res.send(ResponseHelper.buildFailureResponse(langEngConfig.message.kyc.emptyResponse));
                  }
                }
              }
            }
            catch (e) {
              logger.error('Somthing went wrong while getting response');
              res.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.kyc.internalError)));
            }
          }
          else {
            logger.error('Somthing went wrong while getting response');
            res.send(ResponseHelper.buildFailureResponse(langEngConfig.message.kyc.internalError));
          }
        })
      }
      else if (kycStatus == DEFAULT_STATUS && !transactionNumber) {
        logger.info('kyc status return');
        res.send(ResponseHelper.buildSuccessResponse({ 'kyc_status': DEFAULT_STATUS }, langEngConfig.message.kyc.statusMessage, STATUS.SUCCESS))
      } else {
        logger.info('kyc status return');
        res.send(ResponseHelper.buildSuccessResponse({ 'kyc_status': SUCCESS_STATUS }, langEngConfig.message.kyc.statusMessage, STATUS.SUCCESS))
      }
    }
    else {
      logger.debug('No kyc data found with applicant id');
      res.send(ResponseHelper.buildFailureResponse(langEngConfig.message.kyc.noDataError));
    }
  }).catch(e => {
    logger.error('Somthing went wrong while getting response');
    res.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.kyc.internalError)));
  })
}

/**
 * @desc This function is used to make request to museService trigger kyc
 * @method requestForKycStatus 
 * @param {String} transactionNumber - Generating new transaction Number for unique kyc status
 * @param {Object} req - It is request object 
 * @return
 */
const requestForKycStatus = function (transactionNumber, req) {
  logger.info('Request initiated for kyc trigger for access museService');
  return new Promise((resolve, reject) => {
    request({
      method: 'post',
      headers: { 'accept': 'application/json', 'authorization': req.headers['authorization'], 'member_id': req.headers['member_id'], 'api_access_key': req.headers['api_access_key'], 'client_auth': req.headers['client_auth'] },
      url: `http://${process.env.GATEWAY_URL}:${process.env.GATEWAY_PORT}/kyc_idnow/kycStatus`,
      body: {
        'transactionnumber': transactionNumber
      },
      json: true
    }, function (error, response) {
      if (response) {
        logger.info('Request success for kyc trigger for access museService');
        resolve(response)
      }
      logger.error('Request fail for kyc trigger for access museService');
      reject(error)
    })
  });
}

/**
 * @desc This function is used to handle kyc status success response from museService 
 * @method kycStatusSuccess 
 * @param {String} email - It is used for sending email notifications using smtp
 * @param {String} mobile - It is used for sending mobile notifications using mobica
 * @param {String} identityStatus - It is used for reference to status of applicant
 * @param {Object} identityReason - It is used for reference to identityReason for identityStatus
 * @return 
 */
const kycStatusSuccess = function (email, mobile, identityStatus, identityReason, transactionNumber) {
  logger.info('Capturing kyc success response');
  return new Promise((resolve, reject) => {
    kyc.checkSuccessKyc(identityStatus, transactionNumber).then((results, err) => {
      if (!err && identityStatus == 'CANCELED') {
        logger.info('Return kyc success response');
        logger.info('Sending emil in kyc implementation Success');
        sendKycStatus(email, mobile, ` ${identityReason}`,true).then((message) => { }, (error) => { })
        resolve(ResponseHelper.buildSuccessResponse({ 'kyc_status': identityStatus, 'reason': identityReason }, `${langEngConfig.message.kyc.success}${identityStatus}`, STATUS.SUCCESS))
      }
      if (!err &&  KYC_SUCCESS.includes(identityStatus)) {
        // identityStatus == 'SUCCESS'
        logger.info('Return kyc success response');
        logger.info('Sending email in kyc implementation Success');
        sendKycStatus(email, mobile, ` ${identityStatus}`,true).then((message) => { }, (error) => { })
        resolve(ResponseHelper.buildSuccessResponse({ 'kyc_status': identityStatus }, `${langEngConfig.message.kyc.success}${identityStatus}`, STATUS.SUCCESS))
      }
      if (err) {
        logger.info('Return kyc success response , But failure ');
        reject(ResponseHelper.buildFailureResponse(langEngConfig.message.kyc.operationError))
      }
      logger.info('Return kyc success response');
      resolve(ResponseHelper.buildSuccessResponse({ 'kyc_status': identityStatus }, `${langEngConfig.message.kyc.success}${identityStatus}`, STATUS.SUCCESS))
    }).catch(err => {
      reject(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.kyc.internalError)))
    })
  });
}


/**
 * @desc This function is used to handle kyc status failure response from museService 
 * @method kycStatusError 
 * @param {String}  email - It is used for sending email notifications using smtp
 * @param {Integer} applicantId  - It is used for sending email notifications using smtp
 * @param {String}  mobile - It is used for sending mobile notifications using mobica
 * @param {Array}   identityError - It is used for reference to status of applicant while identityError
 * @return
 */
const kycStatusError = function (email, mobile, applicantId, identityError) {
  logger.info('Capturing kyc error response');
  return new Promise((resolve, reject) => {
    if ((typeof identityError[0].cause === 'string' || identityError[0].cause instanceof String) && (identityError[0].cause).includes('FRAUD_SUSPICION')) {
      logger.info('Sending emil in kyc implementation Fail');
      sendKycStatus(email, mobile, `${langEngConfig.message.email.messageFraud} `,false).then((message) => { }, (error) => { })
    }
    let messageData = (identityError[0].cause == 'OBJECT_NOT_FOUND') ? identityError[0].key : identityError[0].cause;
    kyc.checkFailureKyc(messageData, applicantId).then((results, err) => {
      if (!err && results) {
        logger.info('Return kyc fail response');
        resolve(ResponseHelper.buildSuccessResponse({ 'serverResponse': identityError }, `${(identityError[0].cause == 'OBJECT_NOT_FOUND') ? identityError[0].key : langEngConfig.message.kyc.apiError}`, STATUS.VALID))
      }
      logger.info('Return kyc fail response');
      resolve(ResponseHelper.buildSuccessResponse({ kyc_status: langEngConfig.message.kyc.noDataError }, langEngConfig.message.kyc.noDataError, STATUS.FAILED))
    }).catch(err => {
      reject(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.kyc.internalError)))
    })
  });
}

/**
 * @desc This function is used to check kyc with applicantId
 * @method _verifyKyc 
 * @param {Integer} applicantId  - It is used for getting applicant kyc status
 * @param {Object}  res - It is response object
 * @return
 */
const _verifyKyc = function (applicantId, res) {
  logger.info(`Initiated _checkPayVooKyc`);
  kyc.checkPayVooKycStatus(applicantId)
    .then((results, err) => {
      if (!err && results.length == 0) {
        logger.debug(`No records found with applicantId`);
        res.send(ResponseHelper.buildSuccessResponse({ 'kyc_status': langEngConfig.message.kyc.noDataError }, langEngConfig.message.kyc.noDataError, STATUS.SUCCESS))
      } else {
        logger.info(`successfully return kyc details`);
        res.send(ResponseHelper.buildSuccessResponse({ 'kyc_status': results[0].kyc_status }, langEngConfig.message.kyc.successKyc, STATUS.SUCCESS))
      }
    })
    .catch(err => {
      logger.error(`successfully return kyc details`);
      res.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.kyc.internalError)))
    });
}

/**
 * @desc This function is used to sending email && mobile messages for kyc status
 * @method kycStatusError 
 * @param {String}  email - It is used for sending email notifications using smtp
 * @param {String}  mobile - It is used for sending mobile notifications using mobica
 * @param {String}  status  - It is used for sending kyc status
 * @param {Object}  res - It is response Object
 * @return
 */
const _notifyKycStatus = function (email, mobile, status, res) {
  logger.info(`Initiated sendKycStatus`);
  sendKycStatus(email, mobile, ` ${status}`,false).then((data) => {
    res.send(ResponseHelper.buildSuccessResponse({}, data.message, STATUS.SUCCESS))
  }, (error) => {
    res.send(ResponseHelper.buildSuccessResponse({}, error.message, STATUS.FAILED))
  }).catch((error) => {
    logger.error(`Sending kyc status failure at sendKycStatus`);
    res.send(ResponseHelper.buildFailureResponse(new Error(`${error.message ? error.message : langEngConfig.message.notification.internalError}`)))
  });
}