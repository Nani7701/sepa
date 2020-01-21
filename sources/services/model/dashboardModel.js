"use strict";
import { DbConnMgr } from "../dbconfig/dbconfig";
const dbInstance = DbConnMgr.getInstance();

const STATUS = {
  SUCCESS: 0,
  FAILURE: 1
}

const DASHBOARD_STATUS = {
  PENDING: 0,
  SUBMITTED: 1,
  VERIFIED: 2
}

export class DashboardModel {
  constructor() {

  }

  getDashboardStatus(businessId) {
    return new Promise((resolve, reject) => {
      logger.info('getDashboardStatus() Initiated')
      let sql = `select isRestricted,type_of_business,personal_profile,business_owner_details,business_address from kyb_business where business_id = ${businessId}`

      dbInstance.executeQuery(sql)
        .then(result => {
          logger.info('getDashboardStatus() Exited Successfully')
          resolve(result);
        })
        .catch(err => {
          logger.error('getDashboardStatus() Error')
          reject(err);
        });
    })
  }
  getApplicationStatus(businessId) {
    return new Promise((resolve, reject) => {
      logger.info('getApplicationStatus() Initiated')
      let sql = `select count(*) as count from kyb_business_docs  where business_id = ${businessId}`
      dbInstance.executeQuery(sql)
        .then(result => {
          logger.info('getApplicationStatus() Exited Successfully')
          resolve(result);
        })
        .catch(err => {
          logger.error('getApplicationStatus() Error')
          reject(err);
        });
    })
  }

  //for inserting business_id,type_of_business,personal_profile,business_owner_details,business_address status
  postDashboardStatus(businessId) {
    return new Promise((resolve, reject) => {
      logger.info('postDashboardStatus() Initiated')
      let sql = `insert into kyb_business (business_id,type_of_business,personal_profile,business_owner_details,business_address)
             values (${businessId},'${DASHBOARD_STATUS.PENDING}','${DASHBOARD_STATUS.PENDING}','${DASHBOARD_STATUS.PENDING}','${DASHBOARD_STATUS.PENDING}')`;
      dbInstance.executeQuery(sql)
        .then(result => {
          logger.info('postDashboardStatus() Exited Successfully')
          resolve(result);
        })
        .catch(err => {
          logger.error('postDashboardStatus() Error')
          reject(err);
        });
    })
  }

  // this method is used to get country list
  indexCountry() {
    return new Promise(function (resolve, reject) {
      logger.info('indexCountry() Initiated')
      let sql = `select country_id, country_name, calling_code, country_code, currency, currency_symbol, status from country ORDER BY country_name ASC`;
      dbInstance.executeQuery(sql)
        .then(result => {
          logger.info('indexCountry() Exited Successfully')
          resolve(result);
        })
        .catch(err => {
          logger.error('indexCountry() Error')
          reject(err);
        })
    })
  }


  getBusinessId(applicant_id) {
    return new Promise((resolve, reject) => {
      logger.info('getBusinessId() Initiated')
      let sql = `select business_id from business_details where applicant_id=${applicant_id}`;
      dbInstance.executeQuery(sql)
        .then(result => {
          logger.info('getBusinessId() Exited Successfully')
          resolve(result);
        })
        .catch(err => {
          logger.error('getBusinessId() Error')
          reject(err);
        })
    })
  }

  getContactAndAddressDetails(businessId) {
    return new Promise((resolve, reject) => {
      logger.info('getContactAndAddressDetails() Initiated')
      let sql = `SELECT b.applicant_id,a.address_id, a.country_id,a.address_line1,a.address_line2,a.city,a.town,a.postal_code,a.region
                 FROM business_details b, address a 
                 WHERE business_id = ${businessId} AND b.applicant_id=a.applicant_id  AND a.address_type_id =2`;

      dbInstance.executeQuery(sql)
        .then(result => {
          logger.info('getContactAndAddressDetails() Exited Successfully')
          resolve(result);
        })
        .catch(err => {
          logger.error('getContactAndAddressDetails() Error')
          reject(err);
        })
    })
  }

  getCompanyDetails(businessId) {
    return new Promise((resolve, reject) => {
      logger.info('getCompanyDetails() Initiated')
      let sql = `select company_details from kyb_company_details where kyb_business_id  = ${businessId}`;

      dbInstance.executeQuery(sql)
        .then(result => {
          logger.info('getCompanyDetails() Successfully Exited')
          resolve(result);
        })
        .catch(err => {
          logger.info('getCompanyDetails() Exited')
          reject(err);
        })
    })
  }

  patchDashboardStatus(column, status, businessId) {
    return new Promise((resolve, reject) => {
      logger.info('patchDashboardStatus() Initiated')
      let sql = `update kyb_business set ${column.toLowerCase()}='${status}' where business_id = ${businessId}`;

      dbInstance.executeQuery(sql)
        .then(result => {
          logger.info('patchDashboardStatus() Exited Successfully')
          resolve(result);
        })
        .catch(err => {
          logger.error('patchDashboardStatus() Exited Successfully')
          reject(err);
        })
    })
  }
}