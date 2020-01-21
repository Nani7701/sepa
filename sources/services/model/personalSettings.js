/**
 * personalSettings Model
 * personalSettings Model is used for fetching kyc status related functions.
 * @package personalSettings
 * @subpackage sources/services/model/personalSettings
 * @author SEPA Cyper Technologies, Sekhara Suman Sahu
 */

let format = require('string-format');
import {
  DbConnMgr
} from '../dbconfig/dbconfig';
import {
  sqlObj
} from '../utility/sql';
let db = DbConnMgr.getInstance();
export class SETTING {
  constructor() {}

  getPersonalSettingsInfo(applicnatId) {
    return new Promise((resolve, reject) => {
      logger.info('getPersonalSettingsInfo() initiated');
      let sql = sqlObj.settings.getPersonalInfo;
      let sqlQuery = format(sql, applicnatId);

      db.doRead(sqlQuery).then(personalInfo => {
          logger.info('getPersonalSettingsInfo() execution completed');
          resolve(personalInfo);
        })
        .catch(err => {
          logger.info('getPersonalSettingsInfo() execution completed');
          reject(new Error());
        })
    })
  }

  //Method for getting businessId based on applicantId
  getBusinessId(applicantId) {
    logger.info('getBusinessId() initiated');
    return new Promise((resolve, reject) => {
      let sql = sqlObj.settings.getBusinessId;
      let sqlquery = format(sql, applicantId);

      db.doRead(sqlquery).then(result => {
          logger.info('getBusinessId() execution completed');
          resolve(result);
        })
        .catch(err => {
          logger.info('getBusinessId() execution completed');
          reject(new Error(err));
        })
    })
  }

  //Method for getting business profile details
  getBusinessProfile(businessId) {
    logger.info('getBusinessProfile() initiated');
    return new Promise((resolve, reject) => {
      let sql = sqlObj.settings.getBusinessProfile;
      let sqlQuery = format(sql, businessId);

      db.doRead(sqlQuery).then(result => {
          logger.info('getBusinessProfile() execution completed');
          resolve(result);
        })
        .catch(err => {
          logger.info('getBusinessProfile() execution completed');
          reject(new Error(err));
        })
    })
  }

  //Method for getting business address
  getBusinessAddress(businessId) {
    logger.info('getBusinessAddress() initiated');
    return new Promise((resolve, reject) => {
      let sql = sqlObj.settings.getBusinessAddress;
      let sqlQuery = format(sql, businessId);

      db.doRead(sqlQuery).then(result => {
          logger.info('getBusinessAddress() execution completed');
          resolve(result);
        })
        .catch(err => {
          logger.info('getBusinessAddress() execution completed');
          reject(new Error(err));
        })
    })
  }

  //Method for getting structure of business owners
  getBusinessStruct(businessId){
    logger.info('getBusinessStruct() initiated');
    return new Promise((resolve, reject)=>{
      let sql = sqlObj.settings.getBusinessStruct;
      let sqlQuery = format(sql, businessId);

      db.doRead(sqlQuery).then(result=>{
        logger.info('getBusinessStruct() execution completed');
        resolve(result);
      })
      .catch(err=>{
        logger.info('getBusinessStruct() execution completed');
        reject(new Error(err));
      })
    })
  }

  //Method for getting password
  getPassWord(applicantId){
    logger.info('getPassWord initiated');
    return new Promise((resolve, reject)=>{
      let sql = sqlObj.settings.getPassWord;
      let sqlQuery = format(sql, applicantId);

      db.doRead(sqlQuery).then(result=>{
        logger.info('getPassWord() execution completed');
        resolve(result);
      })
      .catch(err=>{
        logger.info('getPassWord() execution completed');
        reject(new Error(err));
      })
    })
  }

  //method for updating password
  updatePass(newPass,applicnatId){
    logger.info('updatePass() initiated');
    return new Promise((resolve, reject)=>{
      let sql = sqlObj.settings.update;
      let sqlQuery = format(sql, newPass, applicnatId);

      db.doRead(sqlQuery).then(result=>{
        logger.info('updatePass() execution completed');
        resolve(result);
      })
      .catch(err=>{
        logger.info('updatePass() execution completed');
        reject(new Error(err));
      })
    })
  }
}