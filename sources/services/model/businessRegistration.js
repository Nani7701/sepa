/**
 * businessRegistration Model
 * businessRegistration is used for the get and verify otp with email and mobile id .
 * @package businessRegistration
 * @subpackage sources/services/model/businessRegistration
 * @author SEPA Cyper Technologies, Sekhara Suman Sahu.
 */

"use strict";
import { DbConnMgr } from '../dbconfig/dbconfig';
const DbInstance = DbConnMgr.getInstance();

export class BusinessRegistration {

  constructor() {
  }

  //this function is used for check company is exist in database or not
  checkUniqueCompany(application_id) {
    logger.info("checkUniqueCompany() initiated");
    return new Promise(function (resolve, reject) {
      var sql = `select business_id from business_details where applicant_id = ${application_id}`;
      DbInstance.executeQuery(sql).then(res => {
        logger.info('successfully executed');
        resolve(res);
      }).catch(err => {
        logger.error("execution failed");
        reject(err);
      })
    });
  }

  // this fnuction is used for get country code so we can check with KYB API
  getCountryCode(countryId) {
    logger.info("getCountryCode() initiated");
    return new Promise((resolve, reject) => {
      var sql = `select country_code from country where country_id= ${countryId}`;
      DbInstance.executeQuery(sql).then(res => {
        logger.info('successfully executed ');
        resolve(res);
      }).catch(err => {
        logger.error(" execution failed");
        reject(err);
      });
    });
  }

  insertBusinessDetails(businessInfo) {
    logger.info("insertBusinessDeatils() initiated");
    return new Promise((resolve, reject) => {
      let sql = `insert into business_details (applicant_id,country_of_incorporation,business_legal_name,trading_name,registration_number,incorporation_date,business_type) values(${businessInfo.applicant_id},${businessInfo.country_of_incorporation},'${businessInfo.business_legal_name}','${businessInfo.trading_name}','${businessInfo.registration_number}','${businessInfo.incorporation_date}',${businessInfo.business_type})`;
      DbInstance.executeQuery(sql).then(res => {
        logger.info('successfully executed');
        resolve(res);
      }).catch(err => {
        logger.error(" execution failed");
        reject(err);
      });
    });
  }

  getCompanyDetails(kyb_business_id, company_details) {
    logger.info(" getCompanyDetails() initiated");
    return new Promise((resolve, reject) => {
      let sql = `insert into kyb_company_details (kyb_business_id,company_details) values(${kyb_business_id},'${company_details}')`;
      DbInstance.executeQuery(sql).then(res => {
        logger.info('successfully executed');
        resolve(res);
      }).catch(err => {
        logger.error(" execution failed");
        reject(err);
      });
    })
  }

  //for getting business type
  typeOfBusiness() {
    return new Promise((resolve, reject) => {
      logger.info('initiated');
      let sql = "select business_type_id,business_type_name from business_type";
      DbInstance.executeQuery(sql)
        .then(result => {
          logger.info('execution completed');
          resolve(result);
        })
        .catch(err => {
          logger.info('execution completed');
          reject(err);
        });
    })
  }

  //for geting business sectors.
  typeOfSector() {
    return new Promise((resolve, reject) => {
    logger.info('typeOfSector() initiated');  
    let sql= "select business_sector_id,business_sector_name from business_sector_lov";
    DbInstance.executeQuery(sql)
    .then(result => {
    logger.info('execution completed');
       resolve(result);
    })
    .catch(err => {
    logger.info('execution completed');
        reject(err);
    });
    })
  }

  //for fetching the data related to business sector of an alresy registerd business.
  typeOfSectorAndIndustries(business_id) {
    let sql = `select business_id,business_sector,range_of_service,website,restricted_business,selected_industries from business_sector_details where business_id=${business_id}`;
    return new Promise((resolve, reject) => {
      DbInstance.executeQuery(sql)
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    })
  }

  //for geting business industries.
  typeOfIndustries() {
    return new Promise((resolve, reject) => {
      let sql = "select business_industry_id,business_industry_name,restricted from business_industry_lov";
      DbInstance.executeQuery(sql)
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        })
    });
  }


  getBusinessId(applicant_Id) {
    return new Promise((resolve, reject) => {
      logger.info('initialize  getBusinessId() ');
      let sql = `SELECT business_id FROM business_details WHERE applicant_id = '${applicant_Id}'`;
      DbInstance.executeQuery(sql).then(businessInfo => {
        logger.info('success in  getBusinessId() ');
        resolve(businessInfo);
      }).catch(err => {
        logger.error('error in  getBusinessId() ');
        reject(err);
      });
    });
  }
}
