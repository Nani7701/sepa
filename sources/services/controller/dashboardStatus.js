
/**
 * dashboardStatus
 * This controller contain the methods used for dashbord status.
 * @package dashboardStatus
 * @subpackage model/dashboardStatus
 *  @author SEPA Cyper Technologies, Sekhara Suman Sahu
 */
"use strict";

//Import the Model
import { DashboardModel } from '../model/dashboardModel';
import { langEngConfig } from '../utility/lang_eng';
import { signupConfig } from '../utility/signUpConfig';
const dashboard = new DashboardModel();
const STATUS = {
  SUCCESS: 0,
  FAILURE: 1
}

/**
* @desc Method for gettng the status details of letious steps. 
* @method getDashboardStatus 
* @param {Object} request - It is Request object
* @param {Object} response - It is Response object
* @return return status details list
*/
export const getDashboardStatus = (request, response) => {
  logger.info('getDashboardStatus() initiated');
  let applicant_id = request.params.applicant_id;
  dashboard.getBusinessId(applicant_id).then(business_id => {
    let businessId = business_id[0].business_id;
    dashboard.getDashboardStatus(businessId)
      .then(result => {
        if (result != 0) {
          let columnSum = (parseInt(result[0].type_of_business) + parseInt(result[0].personal_profile) + parseInt(result[0].business_owner_details) + parseInt(result[0].business_address));
          dashboard.getApplicationStatus(businessId).then(kycObj => {
            let status = {
              "isRestricted": result[0].isRestricted,
              "type_of_business": result[0].type_of_business,
              "personal_profile": result[0].personal_profile,
              "business_owner_details": result[0].business_owner_details,
              "business_address": result[0].business_address
            };

            if (kycObj[0].count == 4) {
              status.isDocsUploaded = 2
              if ((columnSum + 2) == 10) {
                status.isCompleted = 1
                response.send(ResponseHelper.buildSuccessResponse({ "Dashboard Status": status }, signupConfig.message.kyb_status.Get_status, STATUS.SUCCESS));
              } else {
                status.isCompleted = 0
                response.send(ResponseHelper.buildSuccessResponse({ "Dashboard Status": status }, signupConfig.message.kyb_status.Fail_status, STATUS.SUCCESS));
              }
            }
            else {
              status.isDocsUploaded = 0
              status.isCompleted = 0
              response.send(ResponseHelper.buildSuccessResponse({ "Dashboard Status": status }, signupConfig.message.kyb_status.Fail_status, STATUS.SUCCESS));
            }
            
          }).catch(err => {
            logger.error('getApplicationStatus() Error');
            response.send(ResponseHelper.buildFailureResponse(signupConfig.message.kyb_status.error));
          })
        } else {
          logger.info('getDashboardStatus() succcessfully exited');
          response.send(ResponseHelper.buildSuccessResponse({}, signupConfig.message.kyb_status.isert_status, STATUS.FAILURE));
        }
      })
      .catch(err => {
        logger.error('getDashboardStatus() Error');
        response.send(ResponseHelper.buildFailureResponse(signupConfig.message.kyb_status.error));
      })
  })
    .catch(err => {
      response.send(ResponseHelper.buildSuccessResponse({}, signupConfig.message.kyb_status.isert_status, STATUS.FAILURE));
    })

}


/**
* @desc Method for inserting business_id,type_of_business,personal_profile,business_owner_details,business_address status. 
* @method getDashboardStatus 
* @param {Object} request - It is Request object
* @param {Object} response - It is Response object
* @return return message and status code
*/
export const postDashboardStatus = (request, response) => {
  logger.info('postDashboardStatus() succcessfully initiated');
  let applicant_id = request.params.applicant_id;
  dashboard.getBusinessId(applicant_id).then(business_id => {
    let businessId = business_id[0].business_id;
    dashboard.postDashboardStatus(businessId)
      .then(result => {
        if (result) {
          logger.info('postDashboardStatus() successfully exited');
          response.send(ResponseHelper.buildSuccessResponse({}, signupConfig.message.kyb_status.success, STATUS.SUCCESS));
        } else {
          logger.error(signupConfig.message.kyb_status.error);
          response.send(ResponseHelper.buildSuccessResponse({}, signupConfig.message.kyb_status.error, STATUS.FAILURE));
        }
      })
      .catch(err => {
        logger.error(signupConfig.message.kyb_status.error);
        response.send(ResponseHelper.buildFailureResponse(langEngConfig.message.error.ErrorHandler));
      });
  })
    .catch(err => {
      response.send(ResponseHelper.buildSuccessResponse({}, signupConfig.message.kyb_status.insert_witout_business, STATUS.FAILURE));
    })

}

/**
* @desc Method for updating status of business_id,type_of_business,personal_profile,business_owner_details,business_address. 
* @method getDashboardStatus 
* @param {Object} request - It is Request object
* @param {Object} response - It is Response object
* @return return message and status code
*/
export const patchDashboardStatus = (request, response) => {
  logger.info('patchDashboardStatus() succcessfully initiated');
  let column = request.body.column;
  let status = request.body.status;
  let applicant_id = request.params.applicant_id;
  dashboard.getBusinessId(applicant_id).then(business_id => {
    let businessId = business_id[0].business_id;
    if (column.toLowerCase() == "business_address" && status == "1") {
      dashboard.indexCountry()
        .then(country1 => {
          let country = JSON.stringify(_.filter(country1, { status: 1 }))
          request.body["country"] = JSON.parse(country)
          checkAddress(request.body, businessId)
            .then(result => {
              logger.info('patchDashboardStatus() succcessfully exited');
              response.send(ResponseHelper.buildSuccessResponse(result, '', STATUS.SUCCESS));
            })
            .catch(err => {
              logger.error('patchDashboardStatus() Error');
              response.send(ResponseHelper.buildFailureResponse(new Error(signupConfig.message.error.InternalError)));
            })
        })
        .catch(err => {
          logger.error('patchDashboardStatus() Error');
          response.send(ResponseHelper.buildFailureResponse(new Error(signupConfig.message.error.InternalError)));
        })
    } else {
      dashboard.patchDashboardStatus(column, status, businessId)
        .then(result => {
          if (result.affectedRows > 0 && result.affectedRows != "undefined") {
            logger.info(langEngConfig.message.signUp.address_update);
            response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.signUp.address_update, STATUS.SUCCESS));
          } else {
            logger.error(langEngConfig.message.kyb_status.status_error);
            response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.kyb_status.status_error, STATUS.FAILURE));
          }
        })
        .catch(err => {
          logger.error('patchDashboardStatus() Error');
          response.send(ResponseHelper.buildFailureResponse(new Error(signupConfig.message.error.InternalError)));
        })
    }
  })
}


/**
* @desc Method for checking address
* @method checkAddress 
* @param {Object} value - It is contains request body  
* @param {number} businessId - It is businessId 
* @return 
*/
const checkAddress = (value, businessId) => {
  return new Promise((resolve, reject) => {
    logger.info('checkAddress() successfully Initiated');
    let changeStatus = value;

    dashboard.getContactAndAddressDetails(businessId)
      .then(address => {
        dashboard.getCompanyDetails(businessId)
          .then(kyc_company => {
            if (_.size(kyc_company) > 0 && kyc_company[0].company_details && JSON.parse(kyc_company[0].company_details).formattedAddress) {
              let kybAddress = JSON.parse(kyc_company[0].company_details).formattedAddress;
              let companyAddress = address[0];
              let company = _.filter(changeStatus.country, { country_id: companyAddress.country_id })[0];

              if (kybAddress.city == companyAddress.city && _.toLower(kybAddress.zip.replace(/ +/g, "")) == _.toLower(companyAddress.postal_code.replace(/ +/g, "")) && kybAddress.cc == company.country_code) {
                changeStatus.status = "2"
              }
            }

            dashboard.patchDashboardStatus(changeStatus.column, changeStatus.status, businessId)
              .then(result => {
                logger.info('checkAddress() successfully Exited');
                resolve(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.signUp.address_update, STATUS.SUCCESS));
              })
              .catch(err => {
                logger.error('checkAddress() Error');
                reject(ResponseHelper.buildFailureResponse(new Error(signupConfig.message.error.InternalError)));
              })
          })
          .catch(err => {
            logger.error('checkAddress() Error');
            reject(err);
          })
      })
      .catch(err => {
        logger.error('checkAddress() Error');
        reject(err);
      });
  })
}
