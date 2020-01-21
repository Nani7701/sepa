/**
 * counterParty Controller
 * counterParty Controller is used for create the counterParty and get the counterParties with in wallet and get the users list in payvoo
 * @subpackage controller\counterParty
 *  @author SEPA Cyber Technologies, Tarangini Dola,krishnakanth r
 */
'use strict';
import { Beneficiary } from '../model/counterParty';
import {
  langEngConfig
} from '../utility/lang_eng';

const STATUS = {
  SUCCESS: 0,
  FAILURE: 1,
  ACTIVE: 1,
  DEACTIVE: 0
}
const ACCOUNT_TYPE = {
  PERSONAL:"personal",
  BUSINESS: "business"
}
const COUNT = 50;

const today = new Date();
const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
const timeStamp = date + ' ' + time;

/**
 * This function for getting the users in payvoo while seraching
 * @method  beneficiarysList 
 * @param {Object} request - It is Request object
 * @param {Object} response - It is Response object
 */

export const beneficiarysList = async (request, response) => {
  logger.info("beneficiarysList() initiated")
  try {
    const applicant_id = request.params.applicant_id;
    const beneficiary = new Beneficiary(request.params);
    const name = beneficiary.name;
    const value = beneficiary.limit;
    const start = (value * COUNT);
    const end = start + COUNT;
    let filterResults = await beneficiary.beneficiarysSearch(name,ACCOUNT_TYPE.PERSONAL,ACCOUNT_TYPE.BUSINESS, STATUS.ACTIVE, start, end,applicant_id);
    if (filterResults.length > 0) {
      logger.info("successfully get the results");
      return response.send(ResponseHelper.buildSuccessResponse({ results: filterResults }, langEngConfig.message.countrparty.getSuccess, STATUS.SUCCESS));
    } else {
      logger.debug("failed while getting the results");
      return response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.countrparty.getFail, STATUS.FAILURE));
    }
  }
  catch (err) {
    logger.error('Error occured : ' + err);
    return response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
  }
}

/**
 * This function for create the counterParty
 * @method createBenificary
 * @param {Object} request - It is Request object
 * @param {Object} response - It is Response object
 */
export const createBenificary = async (request, response) => {
  try {
    const applicant_id = request.params.applicant_id;
    const beneficiary = new Beneficiary(request.body);
    if (beneficiary.mobile == '' || beneficiary.mobile == 'undefined') {
      logger.info("mobile is empty or undefined");
      return response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.countrparty.fail1, STATUS.FAILURE));
    }
    if (beneficiary.fullName == '' || beneficiary.fullName == 'undefined') {
      logger.info("fullName is empty or undefined");
      return response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.countrparty.fail1, STATUS.FAILURE));
    }
    if (beneficiary.email == '' || beneficiary.email == 'undefined') {
      logger.info("fullName is empty or undefined");
      return response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.countrparty.fail1, STATUS.FAILURE));
    }
    if (beneficiary.country == '' || beneficiary.country == 'undefined') {
      logger.info("country is empty or undefined");
      return response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.countrparty.fail1, STATUS.FAILURE));
    }
    let getCounterPartyId = await beneficiary.checkData(beneficiary.mobile, STATUS.ACTIVE, applicant_id)
    if (getCounterPartyId.length > 0) {
      logger.info("counterParty is already existed");
      return response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.countrparty.fail2, STATUS.FAILURE));
    } else {
      let counterPartyId = await beneficiary.getapplicantId(beneficiary.mobile, beneficiary.email);
      if (counterPartyId.length > 0) {
        logger.info("successfully get the results");
        let beneficiaryId = counterPartyId[0].applicant_id;
        let createCounterParty = await beneficiary.createBenificary(beneficiary.fullName, beneficiary.mobile, beneficiary.email, beneficiary.country, applicant_id, beneficiaryId, timeStamp, STATUS.ACTIVE);
        if (createCounterParty.affectedRows > 0) {
          logger.info("successfully get the results");
          return response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.countrparty.success, STATUS.SUCCESS))
        } else {
          logger.debug("failed while create counterParty");
          return response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.countrparty.fail, STATUS.FAILURE));
        }
      } else {
        logger.debug("failed while create counterParty");
        return response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.countrparty.fail, STATUS.FAILURE));
      }
    }
  }
  catch (err) {
    logger.error('Error occured : ' + err);
    return response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
  }
}

/**
 * This function for getting the counterParties within wallet
 * @method  getCounterParties 
 * @param {Object} request - It is Request object
 * @param {Object} response - It is Response object
 */
export const getCounterParties = async (request, response) => {
  try {
    let applicant_id = request.params.applicant_id;
    const beneficiary = new Beneficiary(request.params);
    const name = beneficiary.name;
    const currency = 'EUR';
    const value = beneficiary.limit;
    const start = (value * COUNT);
    const end = start + COUNT;
    let counterPartyId = await beneficiary.getCounterPartyid(applicant_id, STATUS.ACTIVE);
    if (counterPartyId.length > 0) {
      let getCounterPartyName = await beneficiary.counterPartyInfo(name, STATUS.ACTIVE, currency, applicant_id, start, end);
      if (getCounterPartyName.length > 0) {
        logger.info("successfully get the results");
        return response.send(ResponseHelper.buildSuccessResponse({ results: getCounterPartyName }, langEngConfig.message.countrparty.getSuccess, STATUS.SUCCESS));
      } else {
        logger.debug("failed while getting the results");
        return response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.countrparty.getFail, STATUS.FAILURE));
      }
    } else {
      logger.info('no counterParties found');
      return response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.countrparty.getFail, STATUS.FAILURE));
    }

  }
  catch (err) {
    logger.error('Error occured : ' + err);
    return response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
  }
}
/**
 * This function for delete the counterParty within wallet
 * @method  getCounterParties 
 * @param {Object} request - It is Request object
 * @param {Object} response - It is Response object
 */
export const deleteCounterParty = async (request, response) => {
  try {
    let applicant_id = request.params.applicant_id;
    const beneficiary = new Beneficiary(request.params);
    const id = beneficiary.counterparty_id;
    let counterPartyId = await beneficiary.getCounterpartyId(id, applicant_id, STATUS.ACTIVE);
    if (counterPartyId.length > 0) {
      let deletecounterParty = await beneficiary.deleteCounterParty(id, applicant_id, timeStamp, STATUS.DEACTIVE);
      if (deletecounterParty.affectedRows > 0) {
        return response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.countrparty.success1, STATUS.SUCCESS));
      } else {
        return response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.countrparty.fail3, STATUS.FAILURE));
      }
    } else {
      return response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.countrparty.info, STATUS.FAILURE));
    }
  }
  catch (err) {
    logger.error('Error occured : ' + err);
    return response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
  }
}
/**
 * This function for get the all counterParties of respective person
 * @method  getCounterParties 
 * @param {Object} request - It is Request object
 * @param {Object} response - It is Response object
 */
export const getCounterPartiesList = async (request, response) => {
  try {
    let applicant_id = request.params.applicant_id;
    const beneficiary = new Beneficiary(request.params);
    const currency = 'EUR';
    let counterPartiesId = await beneficiary.getCounterPartyid(applicant_id, STATUS.ACTIVE);
    if (counterPartiesId.length > 0) {     
        let getCounterPartyList = await beneficiary.counterPartyList(applicant_id, currency, STATUS.ACTIVE);
        if (getCounterPartyList.length > 0) {
          logger.info("successfully get the results");
          return response.send(ResponseHelper.buildSuccessResponse({ results: getCounterPartyList }, langEngConfig.message.countrparty.getSuccess, STATUS.SUCCESS));
        } else {
          logger.debug("failed while getting the results");
          return response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.countrparty.getFail, STATUS.FAILURE));
        }
      
    } else {
      logger.info('no counterParties found');
      return response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.countrparty.getFail, STATUS.FAILURE));
    }

  } catch (err) {
    logger.error('Error occured : ' + err);
    return response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
  }

}
/**
 * This function for get the all active currency of counterParty
 * @method  getCounterParties 
 * @param {Object} request - It is Request object
 * @param {Object} response - It is Response object
 */
export const getCounterPartyCurrencies = async (request,response) => {
  logger.info('getCounterPartyCurrencies() initiated');
  try {
    const userId = request.params.applicant_id;  
  const beneficiary = new Beneficiary(request.params);
  const getCounterParty_id = await beneficiary.checkCounterParty(userId,beneficiary.mobile,STATUS.ACTIVE);
  if(getCounterParty_id .length > 0) {
    logger.info("successfully get the resulys");
    const counterParty_id = getCounterParty_id[0].counterparty;
    const getCounterParty_currencies = await beneficiary.getAccounts(counterParty_id,STATUS.ACTIVE);
    if(getCounterParty_currencies.length > 0) {
      logger.info("successfully get the resulys");
      return response.send(ResponseHelper.buildSuccessResponse({currencyList: getCounterParty_currencies }, langEngConfig.message.countrparty.getSuccess, STATUS.SUCCESS));
    } else {
      logger.debug("no accounts found");
      return response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.countrparty.getaccountsFailInfo, STATUS.FAILURE));
    }
  } else {
    logger.info("no counterParty added");
    return response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.countrparty.counterPartyFailInfo, STATUS.FAILURE));
  }

  } catch(err) {
    logger.error('Error occured : ' + err);
    return response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
  }  
}