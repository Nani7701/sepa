/**
 * account
 * This model is used to support the account controller methods.
 * @package account
 * @subpackage model/account
 *  @author SEPA Cyber Technologies, krishnakanth.r, Sekhara suman sahu
 */
"use strict";

import { DbConnMgr } from "../dbconfig/dbconfig";
const dbInstance = DbConnMgr.getInstance();


export class Account {
  constructor() { }

  isCurrencyAccountExist(currency,applicantId) {
    return new Promise((resolve, reject) => {
      logger.info('isCurrencyAccountExist() initiated');
      // let { currency, balance, status, role } = userAccount
      let sql = `SELECT currency,status FROM accounts WHERE currency="${currency}" AND applicant_id=${applicantId}`;
      dbInstance.executeQuery(sql).then(result => {
        logger.info('isCurrencyAccountExist() execution completed');
        //resolve(_.filter(result, { status: 1 }))
        resolve(result);
      }, err => {
        logger.info('isCurrencyAccountExist() execution completed');
        logger.error(err);
        reject(err)
      });
    });
  }

  updateCurrencyAccount(status,applicantId,currency) {
    return new Promise((resolve, reject) => {
      logger.info('updateCurrencyAccount() initiated');
      let sql = `UPDATE accounts SET status=${status} WHERE currency="${currency}" AND applicant_id=${applicantId}`;
      dbInstance.executeQuery(sql).then(result => {
        logger.info('updateCurrencyAccount() execution completed');
        resolve(result);
      }, err => {
        logger.error(err);
        logger.info('updateCurrencyAccount() execution completed');
        reject(err)
      });
    });
  }

  createCurrencyAccount(currency,applicantId) {
    return new Promise((resolve, reject) => {
      logger.info('createCurrencyAccount() initiated');
      //let { currency, balance, status, role } = userAccount
      let sql = `INSERT INTO accounts (currency,applicant_id) VALUES("${currency}",${applicantId})`;
      dbInstance.executeQuery(sql).then(result => {
        logger.info('createCurrencyAccount() execution completed');
        //resolve(_.filter(result, { status: 1 }))
        resolve(result);
      }, err => {
        logger.info('createCurrencyAccount() initiated');
        logger.error(err);
        reject(err)
      });
    });
  }

  getAccount(applicantId) {
    return new Promise((resolve, reject) => {
      logger.info('getAccount() initiated');
      let sql = `select account_no,currency,status,balance from accounts where applicant_id= ${applicantId}`;
      dbInstance.executeQuery(sql)
        .then(result => {
          logger.info('getAccount() execution completed');
          resolve(result)
        }, err => {
          logger.error(err);
          logger.info('getAccount() execution completed');
          reject(err)
        });
    });
  }

  getByCurrency(applicantId) {
    return new Promise((resolve, reject) => {
      dbInstance.executeQuery(`select account_no,currency,status,role_id,balance from accounts where applicant_id=${applicantId} `).then((res) => {
        resolve(res)
      }, err => {
        reject({ err });
      });
    });
  }

  //method for activate or deactivate account
  activateAccount(currency, applicantId) {
    return new Promise((resolve, reject) => {
      logger.info('activateAccount() initiated');
      let sql = `UPDATE accounts SET status= 1 WHERE applicant_id=${applicantId} AND currency="${currency}"`;
      dbInstance.executeQuery(sql)
        .then((result) => {
          logger.info('activateAccount() execution completed');
          resolve(result);
        }, err => {
          logger.error(err);
          reject(err);
        });
    });
  }
}
