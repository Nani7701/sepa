
import { Kyc } from '../model/kyc';
import { BusinessRegistration } from '../model/businessRegistration';
import { UserModel } from '../model/signUp';
import { langEngConfig } from '../utility/lang_eng';

const kyc = new Kyc();
const businessRegistration = new BusinessRegistration();
const userModel = new UserModel();

const STATUS = {
  FAILED: 1,
  SUCCESS: 0,
  VALID: 2,
  UN_AUTHORIZED: 403
};

const SANCTION = "Success"
const KYC_SUCCESS = ['SUCCESS', 'SUCCESS_DATA_CHANGED', 'FRAUD_SUSPICION_CONFIRMED', 'REVIEW_PENDING', 'FRAUD_SUSPICION_PENDING', 'FINISH']

class ValidateKycData {
  constructor(kycRequest) {
    this.kycApplicantId = kycRequest.applicant_id;
  }
}

/**
* This function is used to Initiate controller for triggering kyc identity 
* @method createIdentity 
* @param {Object} request - It is Request object
* @param {Object} response - It is Response object
*/

export const createIdentity = function (request, response) {
  logger.info('initialize createIdentity()');
  const validateKycData = new ValidateKycData(request.params);
  logger.info('Proceed for _fetchUserKycDetails()');
  return _fetchUserKycDetails(validateKycData.kycApplicantId, request, response);
}

/**
 * This function is used to fetching kyc related information based on the applicantId
 * @method _fetchUserKycDetails 
 * @param {Integer} applicant_id - Used for fetching user details for identity
 * @param {Object}  req - It is Request object
 * @param {Object}  res - It is Response object
 */



const _fetchUserKycDetails = (applicant_id, req, res) => {
  logger.info('Initiated _fetchUserKycDetails()');
  if (_.toLower(req.body.account_type) == "business" && req.body.user_id) {
    businessRegistration.getBusinessId(applicant_id).then(result => {
      if (_.size(result) > 0) {
        kyc.getIndividualApplicant(result[0].business_id, req.body.user_id).then(results => {
          if (results.length > 0) {
            userModel.getApplicantContact(results[0].contact_id)
              .then(contact => {
                logger.info('getApplicantContact() success');
                if (contact[0] && contact[0].applicant_id && _.size(contact) > 0) {
                  kyc.getUserByApplicant(contact[0].applicant_id).then(results => {
                    if (results.length > 0) {
                      logger.info('Successfully fetched getUserByApplicant()');
                      let dateObj = new Date(results[0].dob);
                      let identInfo = prepareIdentData(results[0], results[0].fullName, dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
                      kyc.checkUser(results[0].applicant_id).then(response => {
                        if (response.status == STATUS.FAILED && response.res[0].sanctions_status == SANCTION) {
                          res.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.ident.sanctionError, STATUS.VALID))
                        } else {
                          if (response.status == STATUS.FAILED && response.res[0].id && response.res[0].TransactionNumber && KYC_SUCCESS.includes(response.res[0].kyc_status)) {
                            logger.info('You already submitted kyc proccess');
                            res.send(ResponseHelper.buildSuccessResponse(response.res[0], langEngConfig.message.ident.userFound, STATUS.FAILED))
                          }
                          else {
                            return _requestForIdentId(identInfo, results[0], req, res)
                          }
                        }
                      }).catch(err => {
                        logger.error('Some thing went wrong , While verifying user')
                        res.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.ident.internalError)));
                      });
                    }
                    else {
                      logger.debug('User not found')
                      res.send(ResponseHelper.buildFailureResponse(langEngConfig.message.ident.noDataError));
                    }
                  }).catch(err => {
                    res.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.ident.internalError)));
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
          else {
            logger.info('getIndividualApplicant not found');
            response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.businessdetails.applicant_notFound, STATUS.FAILED));
          }
        }).catch(error => {
          logger.error(error)
          response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
        })
      }
      else {
        logger.info('Business Id not found');
        response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.businessdetails.businessId_notFound, STATUS.FAILED));
      }
    }).catch(error => {
      logger.error(error)
      response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
    })
  }
  else {
    kyc.getUserByApplicant(applicant_id).then(results => {
      if (results.length > 0) {
        logger.info('Successfully fetched getUserByApplicant()');
        let dateObj = new Date(results[0].dob);
        let identInfo = prepareIdentData(results[0], results[0].fullName, dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
        kyc.checkUser(results[0].applicant_id).then(response => {
          if (response.status == STATUS.FAILED && response.res[0].sanctions_status == SANCTION) {
            res.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.ident.sanctionError, STATUS.VALID))
          } else {
            if (response.status == STATUS.FAILED && response.res[0].id && response.res[0].TransactionNumber && KYC_SUCCESS.includes(response.res[0].kyc_status)) {
              logger.info('User Identified and return existing Identity Info');
              res.send(ResponseHelper.buildSuccessResponse(response.res[0], langEngConfig.message.ident.userFound, STATUS.FAILED))
            }
            else {
              return _requestForIdentId(identInfo, results[0], req, res)
            }
          }
        }).catch(err => {
          logger.error('Some thing went wrong , While verifying user')
          res.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.ident.internalError)));
        });
      }
      else {
        logger.debug('User not found')
        res.send(ResponseHelper.buildFailureResponse(langEngConfig.message.ident.noDataError));
      }
    }).catch(err => {
      res.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.ident.internalError)));
    })
  }

  // kyc.getUserByApplicant(user_id).then(results => {
  //   if (results.length > 0) {
  //     logger.info('Successfully fetched getUserByApplicant()');
  //     let identInfo = prepareIdentData(results[0]);
  //     kyc.checkUser(results[0].applicant_id).then(response => {
  //       if (response.status == STATUS.FAILED && response.res[0].id && response.res[0].TransactionNumber) {
  //         logger.info('User Identified and return existing Identity Info');
  //         res.send(ResponseHelper.buildSuccessResponse(response.res[0], langEngConfig.message.ident.userFound, STATUS.FAILED))
  //       }
  //       else {
  //         return _requestForIdentId(identInfo, results[0], req, res)
  //       }
  //     }).catch(err => {
  //       logger.error('Some thing went wrong , While verifying user')
  //       res.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.ident.internalError)));
  //     });
  //   }
  //   else {
  //     logger.debug('User not found')
  //     res.send(ResponseHelper.buildFailureResponse(langEngConfig.message.ident.noDataError));
  //   }
  // }).catch(err => {
  //   res.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.ident.internalError)));
  // })
}

/**
 * This function is used to request identity and update status of application user
 * @method _requestForIdentId 
 * @param {Object} identObj - Used for request identity with ident data .
 * @param {Object} kycInfo - Used for update kyc details
 * @param {Object}  res - It is Response object
 */

const _requestForIdentId = (identObj, identInfo, req, res) => {
  _callIdentityService(identObj, req).then(function (res1) {
    logger.info('Proceed for identity creation')
    if (res1 && res1.body.status == STATUS.FAILED) {
      logger.info('Identity response captured and Initiate Request')
      if (!identInfo.kyc_transaction_id && identInfo.kyc_status == 'PENDING' && !identInfo.kyc_vendor_id) {
        logger.debug('Send initiate Request as email')
        //sendKycStatus(identInfo.email, identInfo.mobile, `${langEngConfig.message.email.messageInitiated}`, false).then((message) => { }, (error) => { })
      }
      let updateKycModel = { "sanctions_status": res1.body.data.pepSanction.sanctions_status, "pep_status": res1.body.data.pepSanction.pep_status, "transactionNumber": (res1.body.data.transactionNumber) ? res1.body.data.transactionNumber : '', "id": (res1.body.data.id) ? res1.body.data.id : '', "applicantId": identInfo.applicant_id };
      return kyc.updateKycDetails(updateKycModel).then(results => {
        if (_.size(results) > 0) {
          logger.info('Identity response captured')
          if (res1.body.data && res1.body.data.transactionNumber && res1.body.data.id) {
            res.send(ResponseHelper.buildSuccessResponse(res1.body.data, langEngConfig.message.ident.successIdent, 0))
          } else {
            res.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.ident.sanctionError, 1))
          }
        }
        else {
          logger.error('Identity response failure , while updating')
          res.send(ResponseHelper.buildFailureResponse(langEngConfig.message.ident.operationError));
        }
      }).catch(err => {
        logger.error('Some thing went wrong ,.......')
        res.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.ident.internalError)));
      })
    }
    else {
      if (res1 && res1.body.status == STATUS.UN_AUTHORIZED) {
        logger.debug('Unauthorized user')
        res.send(ResponseHelper.buildFailureResponse(langEngConfig.message.ident.authError));
      }
      else {
        if (res1.body.status == STATUS.SUCCESS) {
          logger.debug('Some thing faile to getting')
          res.send(ResponseHelper.buildFailureResponse(res1.body.message));
        }
        else {
          if (res1.body && res1.body.message.message && res1.body.message.status == STATUS.SUCCESS) {
            //res.send(ResponseHelper.buildFailureResponse(response.body.message.message));
            // res.send(ResponseHelper.buildFailureResponse(res1.body.message));
            res.send(ResponseHelper.buildSuccessResponse(
              res1.body
              , langEngConfig.message.token.tokenExpired, STATUS.VALID));
          } else {
            logger.debug('Please provide header mandatory field')
            res.send(ResponseHelper.buildFailureResponse(langEngConfig.message.ident.headerError));
          }
        }
      }
    }
  }).catch(err => {
    logger.error('Some thing went wrong ,.......')
    res.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.ident.internalError)));
  })
}

/**
 * This function is used to make request to museService trigger identity with user data
 * @method _callIdentityService 
 * @param {Object} userInfo - userInfo is object used to generate identity in museServer 
 * @param {Object} req - It is request object 
 * 
 */

var _callIdentityService = function (userInfo, req) {
  logger.info('Identity museService request initiated');
  return new Promise((resolve, reject) => {
    request({
      method: 'post',
      headers: { "accept": "application/json", "authorization": req.headers["authorization"], "member_id": req.headers["member_id"], "api_access_key": req.headers["api_access_key"], "client_auth": req.headers["client_auth"] },
      url: `http://${process.env.GATEWAY_URL}:${process.env.GATEWAY_PORT}/kyc_idnow/kycId`,
      body: userInfo,
      json: true,
    }, function (err, res1) {
      if (res1) {
        logger.info('Identity museService success');
        resolve(res1)
      } else {
        logger.info('Identity museService failure');
        reject(err)
      }
    })
  });
}

/**
 * This function is used prepare user data for trigger kyc
 * @method prepareIdentData 
 * @param {Object} ident - userInfo
 */

function prepareIdentData(ident, queryName, year, month, day) {
  let birthDate = (ident.dob).slice(0, 10);
  return {
    "result": {
      "birthday": birthDate,
      "birthplace": "",
      "city": ident.city,
      "country": (ident.country_name != 'UK') ? ident.country_name : 'GB',
      "custom1": ident.address_line1,
      "custom2": "",
      "custom3": "",
      "email": ident.email,
      "firstname": ident.first_name,
      "gender": ident.gender,
      "lastname": ident.last_name,
      "mobilephone": ident.mobile,
      "nationality": (ident.country_name != 'UK') ? ident.country_name : 'GB',
      "NameQuery": (queryName) ? queryName : '',
      "YearOfBirth": (year) ? year : '',
      "MonthOfBirth": (month) ? month : '',
      "DayOfBirth": (day) ? day : ''
    }
  }
}
