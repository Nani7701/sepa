
/**
 * businessOwner controller
 * This is a controller file, where the businessOwner signup related data is entered.
 * @package businessOwner
 * @subpackage sources\services\controller\businessOwner\businessOwner
 * @author SEPA Cyber Technologies, Tarangini dola , Satyanarayana G
 */
"use strict";

import { config } from '../dbconfig/connection';
import { mariadb } from '../dbconfig/dbconfig';

import { decrypt } from '../utility/validate';

import { langEngConfig as configVariable, langEngConfig } from '../utility/lang_eng';
import { BusinessOwner } from '../model/businessOwner';
const registerBusinessOwner = new BusinessOwner();

const STATUS = {
  FAILED: 1,
  SUCCESS: 0
};
const OWNERTYPE = {
  DIRECTOR: 'director',
  BUSINESSOWNER: 'businessowner',
  SHAREHOLDER: 'shareholder'
}
class Owner {
  constructor(request) {
    this.ownerDetails = {
      "first_name": request.body.first_name ? request.body.first_name : '',
      "last_name": request.body.last_name ? request.body.last_name : '',
      "email": request.body.email ? request.body.email : '',
      "gender": request.body.gender ? request.body.gender : '',
      "dob": request.body.dob ? request.body.dob : '',
      "mobile": request.body.mobile ? request.body.mobile : '',
      "business_id": request.body.business_id ? request.body.business_id : '',
      "business_owner_type": request.body.business_owner_type ? request.body.business_owner_type : '',
      "percentage": request.body.percentage ? request.body.percentage : '',
      "status": request.body.status ? request.body.status : '',
      "type": request.body.type ? request.body.type : '',
      "isKyc": request.body.isKyc,
      "kyb_bisiness_owner_id": request.body.kyb_bisiness_owner_id ? request.body.kyb_bisiness_owner_id : ''
    };
    this.id = request.params.id;
    this.type = request.params.type;
    this.contact_id = request.params.contact_id;
    this.kyb_document_id = request.params.kyb_document_id;
    this.token = request.params.token;
    this.applicantId = request.params.applicant_id;
    this.token_link = request.body.token ? request.body.token : '';
  }
}

/**
* @desc This function is for saving Business Owner  
* @method saveBusinessOwner 
* @param {Object} request - It is Request object
* @param {Object} response - It is Response object
* @return return message and status code
*/
var saveBusinessOwner = (request, response) => {
  mariadb.createConnection(config).then(conn => {
    logger.info('connection created for save business owner');
    conn.beginTransaction().then(() => {
      logger.info('transaction start');
      const owner = new Owner(request);
      registerBusinessOwner.getBusinessId(owner.applicantId).then((businessId) => {
        owner.ownerDetails.business_id = businessId[0].business_id;
        registerBusinessOwner.saveApplicant('business').then(applicant => {
          logger.info('business application save in db');
          registerBusinessOwner.saveContact(applicant.insertId, owner.ownerDetails).then(contact => {
            logger.info('business contact save in db');
            registerBusinessOwner.saveBusinessOwner(contact.insertId, owner.ownerDetails).then(owners => {
              registerBusinessOwner.insertKycDetails(applicant.insertId, owner.ownerDetails).then(kycEntry => {
                logger.info('business registerBusinessOwner save in db and commit ');
                conn.commit(); conn.close();
                logger.info('create a response for save business owner ');
                response.send(ResponseHelper.buildSuccessResponse({ "user_id": (contact.insertId) ? contact.insertId : null, "isKyc": owner.ownerDetails.isKyc }, configVariable.message.businessOwner.success, STATUS.SUCCESS));
              }, (err) => {
                logger.error('error in failure entry insert');
                conn.rollback(err); conn.close();
                response.send(ResponseHelper.buildFailureResponse(new Error(configVariable.message.businessOwner.fail)));
              });
            }, (err) => {
              logger.error('error in saveBusinessOwner');
              conn.rollback(err); conn.close();
              response.send(ResponseHelper.buildFailureResponse(new Error(configVariable.message.businessOwner.fail)));
            });
          }, (err) => {
            logger.error('error in saveContact');
            conn.rollback(err); conn.close();
            response.send(ResponseHelper.buildFailureResponse(new Error(configVariable.message.businessOwner.fail)));
          });
        }, (err) => {
          logger.error('error in save businessApplicant');
          conn.rollback(err); conn.close();
          response.send(ResponseHelper.buildFailureResponse(new Error(configVariable.message.businessContact.fail)));
        });
      }, (err) => {
        logger.error('error in save businessApplicant');
        conn.rollback(err); conn.close();
        response.send(ResponseHelper.buildFailureResponse(new Error(configVariable.message.businessApplicant.fail)));
      });
    }).catch((err) => {
      logger.debug('error in beginTransaction');
      response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)))
    });
  }).catch((err) => {
    logger.error('error in createConnection');
    response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)))
  })
}

/** 
* @method _createIndexResponse 
* @param {list} request - It contains StakeholdersInfo list 
* @param {Object} response - It is type of stack holder
*/
var _createIndexResponse = (list, value, contactList, kycList, addressList) => {
  return new Promise((resolve, reject) => {
    let compareData = [];
    let addressData = [];
    _.forEach(contactList, function (row1) {
      _.forEach(kycList, function (row2) {
        _.forEach(addressList, function (row3) {
          let kycObj = {};
          if (row1.applicant_id == row2.applicant_id) {
            kycObj.email = row1.email;
            kycObj.kyc_status = row2.kyc_status;
            kycObj.kyc_transaction_id = row2.kyc_transaction_id;
            kycObj.kyc_vendor_id = row2.kyc_vendor_id;
            compareData.push(kycObj);
          }
        });
      });
    });

    _.forEach(contactList, function (row1) {
      _.forEach(addressList, function (row2) {
        let addressObj = {};
        if (row1.contact_id == row2.contact_id) {
          addressObj.applicant_id = row1.applicant_id;
          addressObj.email = row1.email;
          addressData.push(addressObj);
        }
      });
    });

    if (_.size(list) > 0) {
      logger.info('insert is Kyc flag  ');
      _.forEach(list, function (row) {
        row['isKyc'] = false;
        row['kyc_status'] = ''
        row['is_verified'] = false;
        row['kycInitiated'] = false;
        row['transactionId'] = "";
        row['id'] = "";
        _.forEach(compareData, function (row2) {
          if (row.email == row2.email) {
            row['kyc_status'] = row2.kyc_status;
            if (row2.kyc_transaction_id && row2.kyc_vendor_id) {
              row['kycInitiated'] = true;
              row['transactionId'] = row2.kyc_transaction_id;
              row['id'] = row2.kyc_vendor_id;
            }
          }
        });

        _.forEach(addressData, function (row3) {
          if (row3.email == row.email) {
            row['is_verified'] = true;
          }
        });


      });
      logger.info('check size of shareHolder ');
      if (_.size(_.filter(list, { type: OWNERTYPE.SHAREHOLDER })) > 0) {
        logger.info('inside block of SHAREHOLDER > 0 ');
        var max = Math.max.apply(Math, list.map(function (o) { return o['percentage']; }))
        logger.info('check percentage of shareholder');
        _.forEach(_.filter(list, { percentage: `${Math.max.apply(Math, _.filter(list, { type: OWNERTYPE.SHAREHOLDER }).map(function (o) { return o['percentage']; }))}` }), function (row) {
          row['isKyc'] = true
          row['kyc_status'] = (row['kyc_status'] == '') ? '' : row['kyc_status']
        });
      }
      logger.info('check size of BUSINESSOWNER ');
      if (_.size(_.filter(list, { type: OWNERTYPE.BUSINESSOWNER })) > 0) {
        logger.info(' BUSINESSOWNER  >0');
        _.forEach(_.filter(list, { type: OWNERTYPE.BUSINESSOWNER }), function (row) {
          row["isKyc"] = true
          row['kyc_status'] = (row['kyc_status'] == '') ? '' : row['kyc_status']
        });
      }
      setTimeout(function () {
        if (value == OWNERTYPE.DIRECTOR) {
          logger.info(' if type director check size of director ');
          if (_.size(_.filter(list, { type: OWNERTYPE.DIRECTOR })) > 0) {
            logger.info('create a response for director ');
            resolve({ directors: _.filter(list, { type: OWNERTYPE.DIRECTOR }), status: STATUS.SUCCESS });
          }
          logger.warn('create a response if size of director is < 1 ');
          resolve({ directors: _.filter(list, { type: OWNERTYPE.DIRECTOR }), status: STATUS.FAILED });

        } else if (value == OWNERTYPE.SHAREHOLDER) {
          logger.info('create a response for shareholder ');
          if (_.size(_.filter(list, { type: OWNERTYPE.SHAREHOLDER })) > 0) {
            logger.debug('create a response for shareholder ');
            resolve({ shareholder: _.filter(list, { type: OWNERTYPE.SHAREHOLDER }), status: STATUS.SUCCESS });
          }
          logger.warn('create a response if size of shareholder is < 1 ');
          resolve({ shareholder: _.filter(list, { type: OWNERTYPE.SHAREHOLDER }), status: STATUS.FAILED });
        } else if (value == OWNERTYPE.BUSINESSOWNER) {
          logger.info('create a response for businessOwner ');
          if (_.size(_.filter(list, { type: OWNERTYPE.BUSINESSOWNER })) > 0) {
            logger.info('create a response for businessOwner ');
            resolve({ businessowner: _.filter(list, { type: OWNERTYPE.BUSINESSOWNER }), status: STATUS.SUCCESS });
          }
          logger.warn('create a response if size of businessOwner is < 1 ');
          resolve({ businessowner: _.filter(list, { type: OWNERTYPE.BUSINESSOWNER }), status: STATUS.FAILED });
        } else if (value == 'all') {
          logger.info('create a response for director, shareholder and businessowner ');
          resolve({ Businessowner: _.filter(list, { type: OWNERTYPE.BUSINESSOWNER }), Shareholder: _.filter(list, { type: OWNERTYPE.SHAREHOLDER }), Directors: _.filter(list, { type: OWNERTYPE.DIRECTOR }), status: STATUS.SUCCESS });
        }
        logger.warn('create a response in record not found ');
        resolve({ message: configVariable.message.businessOwner.recordNotFound, status: STATUS.SUCCESS });
      }, 300)
    } else {
      logger.debug('create a response in record not found ');
      reject({ message: configVariable.message.businessOwner.recordNotFound, status: STATUS.FAILED });
    }
  });

}

/**
* @desc this function used for get list of director shareholder and business Owner  
* @method getBusinessOwnersById 
* @param {Object} request - It is Request object
* @param {Object} response - It is Response object
* @return return with details of Stackholders
*/
var getStakeholdersInfo = function (request, response) {
  logger.info('initialize  getStakeholdersInfo funxtion');
  const owner = new Owner(request);
  let applicantId = owner.applicantId;
  logger.info('create request and call registerBusinessOwner.getBusinessId function ');
  registerBusinessOwner.getBusinessId(applicantId).then(businessId => {
    logger.info('get response from registerBusinessOwner.getBusinessId  ');
    if (businessId[0] && businessId[0].business_id) {
      registerBusinessOwner.getStakeholdersInfo(businessId[0].business_id).then((ownerList => {
        if (_.size(ownerList) > 0) {
          registerBusinessOwner.getStakeholdersContactInfo(businessId[0].business_id).then((cantactList => {
            logger.info('get response from registerBusinessOwner.getStakeholdersInfo and call _createIndexResponse ');
            let applicants = [];
            cantactList.forEach(r => {
              applicants.push(r.applicant_id)
            });
            registerBusinessOwner.getAddressDetails(applicants).then((addressList => {
              registerBusinessOwner.getKycDetails(applicants).then((kycList => {
                _createIndexResponse(ownerList, owner.type, cantactList, kycList, addressList).then(result => {
                  logger.info('get response from _createIndexResponse and send to user ');
                  response.send(ResponseHelper.buildSuccessResponse({ "ownerList": result }, configVariable.message.businessOwner.StakeholderSuccess, STATUS.SUCCESS));
                  //response.send(result);
                }, err => {
                  logger.error('error in _createIndexResponse ');
                  response.send(ResponseHelper.buildFailureResponse(new Error(configVariable.message.error.ErrorHandler)));
                  //response.send(`${err}`);
                });
              }), (err) => {
                logger.debug('registerBusinessOwner.getStakeholdersInfo(owner.id)');
                response.send(ResponseHelper.buildFailureResponse(new Error(configVariable.message.error.ErrorHandler)));
                //response.send(`${err}`);
              });
            }), (err) => {
              logger.debug('registerBusinessOwner.getStakeholdersInfo(owner.id)');
              response.send(ResponseHelper.buildFailureResponse(new Error(configVariable.message.error.ErrorHandler)));
              //response.send(`${err}`);
            });
          })
            , (err) => {
              logger.debug('registerBusinessOwner.getStakeholdersInfo(owner.id)');
              response.send(ResponseHelper.buildFailureResponse(new Error(configVariable.message.error.ErrorHandler)));
              //response.send(`${err}`);
            });

        }
        else {
          response.send(ResponseHelper.buildSuccessResponse({}, configVariable.message.businessOwner.recordNotFound, STATUS.FAILED))
        }

      }), (err) => {
        logger.debug(' registerBusinessOwner.getStakeholdersInfo(owner.id)');
        response.send(ResponseHelper.buildFailureResponse(new Error(configVariable.message.error.ErrorHandler)));
        //response.send(`${err}`);
      });
    } else {
      logger.error('error in registerBusinessOwner.getBusinessId');
      response.send(ResponseHelper.buildSuccessResponse({}, configVariable.message.businessOwner.businessFail, STATUS.FAILED));
    }
  }, err => {
    logger.debug(' registerBusinessOwner.getBusinessId(owner.applicantId)');
    response.send(ResponseHelper.buildFailureResponse(new Error(configVariable.message.error.ErrorHandler)));
    //response.send(`${err}`);
  });
}

/**
* @desc this function used for get business details by id 
* @method getBusinessOwnersById 
* @param {Object} request - It is Request object
* @param {Object} response - It is Response object
* @return return with details of business owner
*/
var getBusinessOwnersById = function (request, response) {
  logger.info('initialize  getBusinessOwnersById and call  registerBusinessOwner.getBusinessOwnersById');
  logger.info('create request and call registerBusinessOwner.getBusinessId function ');
  const owner = new Owner(request);
  registerBusinessOwner.getBusinessId(owner.applicantId).then(result => {
    logger.info('get response from    registerBusinessOwner.getBusinessId  ');
    if (_.size(result) > 0) {
      registerBusinessOwner.getBusinessOwnersById(result[0].business_id).then((ownerDetails => {
        logger.info('get response from  registerBusinessOwner.getBusinessOwnersById and check size of response');
        if (ownerDetails[0] && _.size(ownerDetails) > 0) {
          logger.info(' size of response > 0');
          response.send(ResponseHelper.buildSuccessResponse({ "ownerDetails": ownerDetails }, configVariable.message.businessOwnerContact.success, STATUS.SUCCESS));
        } else {
          logger.warn(' size of response < 1');
          response.send(ResponseHelper.buildSuccessResponse({ "ownerDetails": ownerDetails }, configVariable.message.businessOwnerContact.success1, STATUS.SUCCESS));
        }
      }), (err) => {
        logger.error(' error in  registerBusinessOwner.getBusinessOwnersById');
        response.send(ResponseHelper.buildSuccessResponse({}, configVariable.message.error.ErrorHandler, STATUS.FAILED));
      });
    } else {
      logger.debug(' registerBusinessOwner.getBusinessId(owner.applicantId)');
      response.send(ResponseHelper.buildSuccessResponse({}, configVariable.message.businessOwnerContact.businessId_not_found, STATUS.FAILED));
    }
  }, err => {
    logger.debug(' registerBusinessOwner.getBusinessId(owner.applicantId)');
    response.send(ResponseHelper.buildFailureResponse(new Error(configVariable.message.error.ErrorHandler)));
  });
}

var _validateTotalSharePercentage = function (data, value) {
  return new Promise((resolve, reject) => {
    logger.info('initialize _validateTotalSharePercentage');
    var input = 0, iteration = 0;
    if (_.size(data) > 0) {
      logger.info('if  size of shareholder > 0 in _validateTotalSharePercentage block ');
      _.forEach(data, function (row) {
        iteration++;
        input = input + _.toInteger(row.percentage)
      });
      if (iteration == _.size(data)) {
        logger.info('if iteration ==   _.size(data) then check  the % of shareholder  ');
        if (input + value > 100) {
          logger.info('if shareholder is greater >100 create a response  ');
          resolve({ value: false, message: configVariable.message.businessOwner.errorShareholderRange, totalShareholder: input })
        } else {
          logger.warn('if shareholder is greater < 100 create a response  ');
          resolve({ value: true })
        }
      }
    } else {
      logger.debug('if  size of shareholder < 0 in _validateTotalSharePercentage block ');
      resolve({ value: true })
    }
  });
}


var _isEmailExists = (mail, flag, type, id, value) => {
  return new Promise((resolve, reject) => {
    logger.info('initialize _isEmailExists');
    if (flag) {
      logger.info('if flag is true  call method  registerBusinessOwner.getKybBusinessOwner(id, mail)  ');
      registerBusinessOwner.getKybBusinessOwner(id, mail).then((data) => {
        logger.info('get response of registerBusinessOwner.getKybBusinessOwner(id, mail)  and check condition  ');
        if ((type == OWNERTYPE.BUSINESSOWNER && _.size(_.filter(data, { type: OWNERTYPE.BUSINESSOWNER })) == 0 && _.size(_.filter(data, { type: OWNERTYPE.DIRECTOR })) <= 1) || (type == OWNERTYPE.BUSINESSOWNER && _.size(_.filter(data, { type: OWNERTYPE.BUSINESSOWNER })) == 0 && _.size(_.filter(data, { type: OWNERTYPE.SHAREHOLDER })) <= 1)) {
          logger.info('if condition true send value true ');
          resolve({ value: true });
        } else if (_.size(data) > 0) {
          logger.warn('if_.size(data) > 0 send value false ');
          resolve({ value: false });
        } else {
          logger.debug('send true');
          resolve({ value: true });
        }
      }, (err) => {
        resolve({ value: flase });
      })
    } else {
      logger.info('if flag is false ');
      if (_.includes(type, OWNERTYPE.DIRECTOR)) {
        logger.info('if type director send true ');
        resolve({ value: true });
      } else {
        if (_.isInteger(_.toInteger(value))) {
          logger.info('if iteration is completed  call method  registerBusinessOwner.getKybBusinessOwner(id)');
          registerBusinessOwner.getKybBusinessOwner(id).then((data) => {
            logger.info('get response of  registerBusinessOwner.getKybBusinessOwner(id) and call  _validateTotalSharePercentage()');
            _validateTotalSharePercentage(data, _.toInteger(value)).then((message) => {
              logger.info('get response of   _validateTotalSharePercentage() and resolve ');
              resolve(message);
            })
          })
        } else {
          logger.warn('(_.isInteger(_.toInteger(value)) false');
          resolve({ value: false, message: configVariable.message.businessOwner.inputPercentageError });
        }
      }
    }
  })

}

/**
* @desc this function used for add director , shareholder and business owner  
* @method addBusinessOwner 
* @param {Object} request - It is Request object
* @param {Object} response - It is Response object
* @return return with the message and status code
*/
var addBusinessOwner = function (request, response) {
  let list = request.body.list[0];
  logger.info('initialize addBusinessOwner () ');
  const owner = new Owner(request);
  global.type = list.type;
  logger.info('create request and call rregisterBusinessOwner.getBusinessId(owner.applicantId) ');
  registerBusinessOwner.getBusinessId(owner.applicantId).then(businessId => {
    logger.info('get response from    registerBusinessOwner.getBusinessId  ');
    logger.info('check _isEmailExists()');
    global.business_id = businessId[0].business_id;
    _isEmailExists(list.email, true, type, business_id, list.percentage).then((result) => {
      logger.info('get response of _isEmailExists() and check result.value ');
      if (result.value) {
        logger.info(' result.value  true ');
        registerBusinessOwner.getPercentage(global.business_id).then(percentageCheck => {
          if (percentageCheck) {
            let totalPercentage = percentageCheck[0].percentage;
            let percentageRemained = 100 - totalPercentage;
            if (list.percentage <= percentageRemained) {
              if (_.includes(type, OWNERTYPE.BUSINESSOWNER)) {
                logger.info(' if owner type is business owner  call  registerBusinessOwner.getStakeholdersInfo(business_id) to get list  ');
                registerBusinessOwner.getStakeholdersInfo(business_id).then((ownerList => {
                  logger.info('get response of  registerBusinessOwner.getStakeholdersInfo(business_id) and call _createIndexResponse ()  ');
                  _createIndexResponse(ownerList, OWNERTYPE.BUSINESSOWNER, [], [], []).then(List => {
                    logger.info(' get response of l _createIndexResponse ()  and check size  ');
                    if (_.size(List.businessowner) > 0) {
                      logger.info(' if _.size(List.businessowner) > 0 create a response and send   ');
                      response.send(ResponseHelper.buildFailureResponse(configVariable.message.businessOwner.already_added));
                    } else {
                      logger.info(' if _.size(List.businessowner) == 0 call  registerBusinessOwner.saveKybBusinessOwner ()');
                      registerBusinessOwner.saveKybBusinessOwner(business_id, OWNERTYPE.BUSINESSOWNER, list.email, list.first_name + ',' + list.last_name, list.status, list.dob, list.percentage).then(message => {
                        logger.info('get response of  registerBusinessOwner.saveKybBusinessOwner ()');
                        response.send(ResponseHelper.buildSuccessResponse({}, configVariable.message.businessOwner.businessOwner, STATUS.SUCCESS));
                      }, (err) => {
                        logger.error('error in get response of  registerBusinessOwner.saveKybBusinessOwner ()');
                        response.send(ResponseHelper.buildFailureResponse(new Error(configVariable.message.businessOwner.updateError)));
                      });
                    }
                  }, err => {
                    logger.debug('error in get response of  _createIndexResponse()');
                    response.send(ResponseHelper.buildFailureResponse(new Error(configVariable.message.businessOwner.updateError)));
                  });
                }), (err) => {
                  logger.error('error in get response of  registerBusinessOwner.getStakeholdersInfo(business_id)');
                  response.send(ResponseHelper.buildFailureResponse(new Error(configVariable.message.error.ErrorHandler)));
                });
              } else {
                logger.info(' if owner type is not business owner _isEmailExists()');
                _isEmailExists(list.email, false, type, business_id, list.percentage).then((data) => {
                  if (data.value) {
                    logger.info('get response of _isEmailExists() call  registerBusinessOwner.saveKybBusinessOwner()');
                    registerBusinessOwner.saveKybBusinessOwner(business_id, type, list.email, list.first_name + ',' + list.last_name, list.status, list.dob, list.percentage).then(message => {
                      logger.info('get response of  registerBusinessOwner.saveKybBusinessOwner()');
                      if (_.includes(type, OWNERTYPE.DIRECTOR)) {
                        logger.info('if type is director create a response and send ');
                        response.send(ResponseHelper.buildSuccessResponse({}, configVariable.message.businessOwner.directorAdded, STATUS.SUCCESS));
                      } else {
                        logger.debug('if type is not director create a response and send ');
                        response.send(ResponseHelper.buildSuccessResponse({}, configVariable.message.businessOwner.shareholderAdded, STATUS.SUCCESS));
                      }
                    }, (err) => {
                      logger.error(' registerBusinessOwner.saveKybBusinessOwner () ');
                      response.send(ResponseHelper.buildFailureResponse(new Error(configVariable.message.businessOwner.updateError)));
                    })
                  } else {
                    logger.debug('_isEmailExists()');
                    response.send(ResponseHelper.buildSuccessResponse(data.totalShareholder, data.message, STATUS.SUCCESS));
                  }
                });
              }
            }
            else {
              response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.businessOwner.percentageError + global.type, STATUS.FAILED))
            }
          }
        }).catch(err => {
          response.send(ResponseHelper.buildFailureResponse('Something went wrong fetching details'))
        })
      } else {
        logger.warn('if result.value false  ');
        response.send(ResponseHelper.buildSuccessResponse({}, configVariable.message.businessOwner.emailExists, STATUS.FAILED));
      }
    });
  }, err => {
    logger.error(' registerBusinessOwner.getBusinessId(owner.applicantId)');
    response.send(ResponseHelper.buildFailureResponse(new Error(configVariable.message.error.ErrorHandler)));
  });
}

/**
* @desc this function used for get business Owner by contact id 
* @method getBusinessOwnersByCId 
* @param {Object} request - It is Request object
* @param {Object} response - It is Response object
* @return return with the details of business owner
*/
var getBusinessOwnersByCId = function (request, response) {
  const owner = new Owner(request);
  let applicantId = owner.applicantId;
  logger.info('initialize getBusinessOwnersByCId and call ');
  registerBusinessOwner.getContactId(applicantId).then(contact_id => {
    logger.info('initialize getContactId and call  registerBusinessOwner.getBusinessOwnersByCId()');
    registerBusinessOwner.getBusinessOwnersByCId(contact_id[0].contact_id).then((ownerDetails => {
      logger.info('get response from registerBusinessOwner.getBusinessOwnersByCId() and check size ');
      if (ownerDetails[0] && _.size(ownerDetails) > 0) {
        logger.info('size >0 create a response  ');
        response.send(ResponseHelper.buildSuccessResponse({ "ownerDetails": ownerDetails }, configVariable.message.businessOwnerContact.success, STATUS.SUCCESS));
      } else {
        logger.warn('size  == 0 create a response  ');
        response.send(ResponseHelper.buildSuccessResponse({ "ownerDetails": ownerDetails }, configVariable.message.businessOwnerContact.success1, STATUS.FAILED));
      }
    }), (err) => {
      logger.error('error in  registerBusinessOwner.getBusinessOwnersByCId(owner.contact_id) ');
      response.send(ResponseHelper.buildFailureResponse(new Error(configVariable.message.error.ErrorHandler)));
    });
  }, err => {
    logger.debug(' registerBusinessOwner.getContactId(owner.applicantId)');
    response.send(ResponseHelper.buildFailureResponse(new Error(configVariable.message.error.ErrorHandler)));
  });
}

/**
* @desc this function used for updateBusinessOwnerStatus 
* @method updateBusinessOwnerStatus 
* @param {Object} request - It is Request object
* @param {Object} response - It is Response object
* @return return message along with status code
*/
var updateBusinessOwnerStatus = function (request, response) {
  logger.info('initialize updateBusinessOwnerStatus ()  and call   registerBusinessOwner.updateBusinessOwnerStatus() ');
  const owner = new Owner(request);
  registerBusinessOwner.updateBusinessOwnerStatus(owner.ownerDetails.kyb_bisiness_owner_id, owner.ownerDetails.status ? 1 : 0).then((res => {
    logger.info('get response from   registerBusinessOwner.updateBusinessOwnerStatus() ');
    response.send(ResponseHelper.buildSuccessResponse({}, configVariable.message.businessOwner.updatebusinessOwnerStatusSuccess, STATUS.SUCCESS));
  }), (err) => {
    logger.error(' error in get response from   registerBusinessOwner.updateBusinessOwnerStatus() ');
    response.send(ResponseHelper.buildFailureResponse(new Error(configVariable.message.businessOwner.ErrorHandler)));
  });
}

/**
* @desc this function used for update business owner 
* @method updateBusinessOwner 
* @param {Object} request - It is Request object
* @param {Object} response - It is Response object
* @return return with message along with status code
*/
var updateBusinessOwner = function (request, response) {
  logger.info('initialize updateBusinessOwner ()');
  const owner = new Owner(request);
  let ownerData = {
    status: owner.ownerDetails.status ? 1 : 0,
    type: owner.ownerDetails.type,
    name: owner.ownerDetails.first_name + ',' + owner.ownerDetails.last_name,
    email: owner.ownerDetails.email,
    dob: owner.ownerDetails.dob,
    percentage: owner.ownerDetails.percentage,
    owner_id: owner.ownerDetails.kyb_bisiness_owner_id,
    applicant_id: owner.applicantId,
    business_owner_type: owner.ownerDetails.business_owner_type

  };
  registerBusinessOwner.getBusinessId(ownerData.applicant_id).then(data => {
    if (_.size(data[0]) > 0 && data[0].business_id) {
      registerBusinessOwner.getKybBoId(data[0].business_id).then(kycBoObj => {
        if (_.size(kycBoObj[0]) > 0 && kycBoObj[0].kyb_bo_id) {
          logger.info('create a object and call registerBusinessOwner.updateBusinessOwner(ownerDetails)');
          registerBusinessOwner.updateBusinessOwner(ownerData, kycBoObj[0].kyb_bo_id).then((res => {
            logger.info('response of  registerBusinessOwner.updateBusinessOwner(ownerDetails)');
            response.send(ResponseHelper.buildSuccessResponse({}, `${ownerData.business_owner_type} ${configVariable.message.businessOwner.ownerSuccess}`, STATUS.SUCCESS));
          }), (err) => {
            logger.error('error in registerBusinessOwner.updateBusinessOwner(ownerDetails)');
            response.send(ResponseHelper.buildFailureResponse(new Error(configVariable.message.businessOwner.updateError)));
          });
        }
        else {
          response.send(ResponseHelper.buildFailureResponse({}, configVariable.message.businessOwner.kybidFail, STATUS.FAILED));
        }
      }).catch(r => {
        response.send(ResponseHelper.buildFailureResponse(new Error(configVariable.message.businessOwner.kybidFail)));
      })
    }
    else {
      response.send(ResponseHelper.buildFailureResponse({}, configVariable.message.businessOwner.businessFail, STATUS.FAILED));
    }
  }).catch(r => {
    response.send(ResponseHelper.buildFailureResponse(new Error(configVariable.message.businessOwner.businessFail)));
  })
}

/**
* @desc this function used for delete BusinessOwnerKyb 
* @method deleteBusinessOwnerKyb 
* @param {Object} request - It is Request object
* @param {Object} response - It is Response object
* @return return with message along with status code
*/
let deleteBusinessOwnerKyb = function (request, response) {
  let kyb_bo_id = request.params.bo_id;
  let type = request.params.type;
  registerBusinessOwner.deleteBusinessOwnerKyb(kyb_bo_id).then((res => {
    logger.info('response of registerBusinessOwner.deleteBusinessOwnerKyb(owner.kyb_document_id)');
    response.send(ResponseHelper.buildSuccessResponse({}, type + configVariable.message.businessOwner.deleted, STATUS.SUCCESS));
  }), (err) => {
    logger.error('error in  registerBusinessOwner.deleteBusinessOwnerKyb()');
    response.send(ResponseHelper.buildFailureResponse(new Error(configVariable.message.businessOwner.deleteError)));
  });
}

/**
* @desc this function used for get business owner details
* @method getBusinessOwnerDetails 
* @param {Object} request - It is Request object
* @param {Object} response - It is Response object
* @return  return with owner details
*/
var getBusinessOwnerDetails = function (request, response) {
  mariadb.createConnection(config).then(conn => {
    logger.info('connection created for save business owner');
    conn.beginTransaction().then(() => {
      logger.info('transaction start');
      const owner = new Owner(request);
      let businessInfo = decrypt(owner.token_link);
      let userInfo = businessInfo.split(" ");
      registerBusinessOwner.getContactByUser(userInfo[0]).then((contactInfo) => {
        if (contactInfo[0] && _.size(contactInfo) > 0 && contactInfo[0].contact_id) {
          registerBusinessOwner.getBusinessOwnerId(contactInfo[0].contact_id).then((businessId) => {
            if (businessId[0] && _.size(businessId) > 0 && businessId[0].business_id) {
              owner.ownerDetails.business_id = businessId[0].business_id;
              registerBusinessOwner.saveApplicant('business').then(applicant => {
                logger.info('business application save in db');
                registerBusinessOwner.saveContact(applicant.insertId, owner.ownerDetails).then(contact => {
                  logger.info('business contact save in db');
                  registerBusinessOwner.saveBusinessOwner(contact.insertId, owner.ownerDetails).then(owners => {
                    registerBusinessOwner.insertKycDetails(applicant.insertId, owner.ownerDetails).then(kycEntry => {
                      logger.info('business registerBusinessOwner save in db and commit ');
                      conn.commit(); conn.close();
                      logger.info('create a response for save business owner ');
                      response.send(ResponseHelper.buildSuccessResponse({ "user_id": (contactInfo[0].contact_id) ? contactInfo[0].contact_id : null, "isKyc": userInfo[1] ? true : false, "account_type": "business" }, configVariable.message.businessOwner.success, STATUS.SUCCESS));
                    }, (err) => {
                      logger.error('error in failure entry insert');
                      conn.rollback(err); conn.close();
                      response.send(ResponseHelper.buildFailureResponse(new Error(configVariable.message.businessOwner.fail)));
                    });
                  }, (err) => {
                    logger.error('error in saveBusinessOwner');
                    conn.rollback(err); conn.close();
                    response.send(ResponseHelper.buildFailureResponse(new Error(configVariable.message.businessOwner.fail)));
                  });
                }, (err) => {
                  logger.error('error in saveContact');
                  conn.rollback(err); conn.close();
                  response.send(ResponseHelper.buildFailureResponse(new Error(configVariable.message.businessOwner.fail)));
                });
              }, (err) => {
                logger.error('error in save businessApplicant');
                conn.rollback(err); conn.close();
                response.send(ResponseHelper.buildFailureResponse(new Error(configVariable.message.businessContact.fail)));
              });
            }
            else {
              logger.debug('Bussiness details not found');
              response.send(ResponseHelper.buildSuccessResponse({}, configVariable.message.businessOwner.businessFail, STATUS.FAILED));
            }
          }, (err) => {
            logger.error('error in save businessApplicant');
            conn.rollback(err); conn.close();
            response.send(ResponseHelper.buildFailureResponse(new Error(configVariable.message.businessApplicant.fail)));
          });
        } else {
          response.send(ResponseHelper.buildSuccessResponse({}, configVariable.message.businessOwner.contactEmpty, STATUS.FAILED));
        }
      }, (err) => {
        logger.error('error in getting existing user');
        conn.rollback(err); conn.close();
        response.send(ResponseHelper.buildFailureResponse(new Error(configVariable.message.businessContact.selectFail)));
      });
    }).catch((err) => {
      logger.debug('error in beginTransaction');
      response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)))
    });
  }).catch((err) => {
    logger.error('error in createConnection');
    response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)))
  })
}

export {
  addBusinessOwner,
  saveBusinessOwner,
  getStakeholdersInfo,
  getBusinessOwnersById,
  getBusinessOwnersByCId,
  updateBusinessOwnerStatus,
  deleteBusinessOwnerKyb,
  updateBusinessOwner,
  getBusinessOwnerDetails
}
