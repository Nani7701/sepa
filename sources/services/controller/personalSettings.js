/**
 * personalSettings
 * This controller contains the service required in personall settings page.
 * @package personalSettings
 * @subpackage controller/personalSettings
 * @author SEPA Cyber Technologies Sekhara Suman Sahu
 */
import {
  langEngConfig
} from '../utility/lang_eng';
import {
  SETTING
} from '../model/personalSettings';
let setting = new SETTING();

const STATUS = {
  SUCCESS: 0,
  FAILURE: 1
}
//Method to support service/settings/personalInfo
export const getPersonaProfile = (request, response) => {
  logger.info('getPersonalInfo() called');
  __getPersonalData(request, response).then(personalRes => {
    logger.info('getPersonalInfo() execution completed');
    return personalRes;
  })
}

//Method for fetching personal data to show in personal setting page.
const __getPersonalData = async (request, response) => {
  let applicantId = request.params.applicant_id;

  try {
    logger.info('getPersonalSettingsInfo() called');
    let personalInfo = await setting.getPersonalSettingsInfo(applicantId);
    if (personalInfo.length > 0) {
      //creting address key to combine postal code, address_lane, city, country
      personalInfo[0]['address'] = personalInfo[0].postal_code + ',' + personalInfo[0].address_line1 + ',' + personalInfo[0].city + ',' + personalInfo[0].country_name;
      response.send(ResponseHelper.buildSuccessResponse(personalInfo[0], langEngConfig.message.setting.data_found, STATUS.SUCCESS));
    } else {
      response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.setting.no_personal_data, STATUS.FAILURE));
    }
  } catch (err) {
    logger.error('Error occured : ' + err);
    response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
  }
}

//Method to handle getBuinessProfile service
export const getBusinessProfile = (request, response) => {
    logger.info('getBusinessProfile() called');
  __getBusinessData(request, response).then(businessData => {
    logger.info('getBusinessProfile() execution completed');
    return businessData;
  })
}

//Method for getting business profile data
const __getBusinessData = async (request, response) => {
  let applicantId = request.params.applicant_id;

  try {
    logger.info('getBusinessId() called');
    let businessIdRes = await setting.getBusinessId(applicantId);
    if (businessIdRes.length > 0) {
      let businessId = businessIdRes[0].business_id;
      logger.info('getBusinessProfile() called');
      let businessProfileRes = await setting.getBusinessProfile(businessId);
      logger.info('getBusinessAddress() called');
      let businessAddRes = await setting.getBusinessAddress(applicantId);
      logger.info('getBusinessStruct() called');
      let structOfBusi = await setting.getBusinessStruct(businessId);
      logger.info('__setBusinessProfile() called');
      let busiProfile = await __setBusinessProfile(businessProfileRes[0], businessAddRes, structOfBusi); 
      
      response.send(ResponseHelper.buildSuccessResponse(busiProfile, langEngConfig.message.setting.businessProfileSucc, STATUS.SUCCESS))
      

    } else {
      logger.info('No registered business found');
      return response.send(ResponseHelper.buildSuccessResponse({
        businessIdRes
      }, langEngConfig.message.setting.businessNotFound, STATUS.FAILURE));
    }


  } catch (err) {
    logger.error('Error occured ' + err);
    response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
  }
}

//Method for creating business profile object
const __setBusinessProfile = async (profile, address, busiStruct) => {
  logger.info('__setBusinessProfile() called');
  //Business Address
  let businessAdrs = '';
  let operatingAdrs = '';
  let adrs = [];
  //Itterating objects
  for (let i = 0; i < address.length; i++) {
    if (address[i].address_type_id == 2 || address[i].address_type_id == 3) {
      adrs.push(address[i]);
    }
  }

  //Initializing the business and operating address
  for (let i = 0; i < adrs.length; i++) {
    if (adrs[i].address_type_id == 2) {
      businessAdrs = adrs[i].postal_code + ',' + adrs[i].address_line1 + ',' + adrs[i].city + ',' + adrs[i].country_name;
    } else {
      operatingAdrs = adrs[i].postal_code + ',' + adrs[i].address_line1 + ',' + adrs[i].city + ',' + adrs[i].country_name;
    }
  }

  //Structure of business
  let numOfDir = 0;
  let numOfOwn = 0;

  //Initializing number of directors ad business owners
  for (let i = 0; i < busiStruct.length; i++) {
    if (busiStruct[i].type == 'director') {
      numOfDir ++;
    } else {
      numOfOwn ++;
    }
  }

  //Creating response object
  let businessProfile = {
    incorporation: {
      country_of_incorporation: profile.country_name,
      legal_name: profile.business_legal_name,
      registration_number: profile.registration_number,
      date_of_incorporation: profile.incorporation_date,
      business_type: profile.business_type_name
    },
    business_profile: {
      trading_name: profile.trading_name,
      registered_address: businessAdrs,
      operating_address: operatingAdrs
    },
    nature_of_business: {
      business_sector: profile.business_sector_name,
      nature_of_business: profile.range_of_service,
      website: profile.website
    },
    structure_of_business: {
      num_of_directors : numOfDir,
      num_of_businessowners : numOfOwn,
      info : 'call /service/businessOwners/all with x-auth-token in headers to get the detail info.'
    }
  }

  logger.info('__setBusinessProfile() execution compelted');
  return businessProfile;

}


//Method for change password in setting profile
export const settingChangePass = (request, response) => {
  logger.info('settingChangePass() initiated');
  __changePassword(request, response).then(changePassRes => {
    logger.info('settingChangePass() execution completed');
    return changePassRes;
  })
}

const __changePassword = async (request, response) => {
  logger.info('__changePassword() initiated');
  let applicantId = request.params.applicant_id;
  let oldPass = request.body.old_password;
  let newPass =  hashPassword.generate(request.body.new_password);
  try {
    logger.info('getPassWord called');
    let pass = await setting.getPassWord(applicantId);
    if (pass.length > 0) {
      let isValid = hashPassword.verify(oldPass, pass[0].password);
      if (isValid) {
        logger.info('getPassWord called');
        await setting.updatePass(newPass, applicantId);
        response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.setting.passSucc, STATUS.SUCCESS));
      } else {
        response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.setting.passMismatch, STATUS.FAILURE));
      }
    } else {
      response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.setting.data_found, STATUS.FAILURE));
    }
  } catch (error) {
    logger.error('Error occured ' + err);
    response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
  }
}