'use strict';

import { DbConnMgr } from '../dbconfig/dbconfig';
const dbInstance = DbConnMgr.getInstance();

export class PriceAlert {
  constructor(user) {
    this.applicant_id = user.applicant_id;
    this.alert_id = user.price_alert_id;
    this.target_amount = user.target_amount;
    this.from_currency = _.toUpper(user.from_currency);
    this.to_currency = _.toUpper(user.to_currency);
    this.alert_status = user.alert_status;
  }
  checkAlertInfo(applicant_id, from_currency, to_currency, target_amount, status) {
    logger.info(' checkAlertInfo() intiated');
    return new Promise((resolve, reject) => {
      let sql = `select price_alert_id from price_alert where from_currency = '${from_currency}' and to_currency= '${to_currency}' and  alert_status =${status} and target_amount=${target_amount} and applicant_id = ${applicant_id} and status=${status}`;
      dbInstance.executeQuery(sql).then(res => {
        logger.info('execution completed');
        resolve(res);
      }).catch(err => {
        logger.error('error while  execute the query');
        reject(err);
      })
    })
  }
  createPriceAlert(applicant_id, from_currency, to_currency, target_amount, status) {
    logger.info('createPriceAlert() intiated');
    return new Promise((resolve, reject) => {
      let sql = `insert into price_alert (applicant_id,from_currency,to_currency,target_amount,alert_status,status) values (${applicant_id},'${from_currency}','${to_currency}',${target_amount},${status},${status})`;
      dbInstance.executeQuery(sql).then(res => {
        logger.info('execution completed');
        resolve(res);
      }).catch(err => {
        logger.error('error while  execute the query');
        reject(err);
      })
    })
  }
  getAlertDetails(applicant_id,status) {
    logger.info(' getAlertDetails() intiated');
    return new Promise((resolve, reject) => {
      let sql = `select price_alert_id,from_currency,to_currency,target_amount,created_on,updated_on from price_alert where applicant_id = ${applicant_id} and alert_status = ${status} and status=${status}`;
      dbInstance.executeQuery(sql).then(res => {
        logger.info('execution completed');
        resolve(res);
      }).catch(err => {
        logger.error('error while  execute the query');
        reject(err);
      })
    })
  }
  updateAlertDetails(applicant_id,alert_id,from_currency,to_currency,target_amount,status,timeStamp ) {
    logger.info('  updateAlertDetails() intiated');
    return new Promise((resolve, reject) => {
      let sql = `update price_alert set from_currency='${from_currency}',to_currency = '${to_currency}',target_amount=${target_amount},alert_status=${status},status=${status},updated_on='${timeStamp}' where applicant_id=${applicant_id} and price_alert_id =${alert_id}`;
      dbInstance.executeQuery(sql).then(res => {
        logger.info('execution completed');
        resolve(res);
      }).catch(err => {
        logger.error('error while  execute the query');
        reject(err);
      })
    })
  }
  deletePriceAlert(applicant_id,alert_id,status, timeStamp) {
    logger.info('deletePriceAlert() intiated');
    return new Promise((resolve, reject) => {
      let sql = `update price_alert set status=${status},updated_on='${timeStamp}' where applicant_id=${applicant_id} and price_alert_id =${alert_id}`;
      dbInstance.executeQuery(sql).then(res => {
        logger.info('execution completed');
        resolve(res);
      }).catch(err => {
        logger.error('error while  execute the query');
        reject(err);
      })
    })
  }
  checkPriceAlertInfo(id,status) {
    logger.info('checkAlertInfo() intiated');
    return new Promise((resolve, reject) => {
      let sql = `select applicant_id from price_alert where price_alert_id =${id} and status =${status}`;
      dbInstance.executeQuery(sql).then(res => {
        logger.info('execution completed');
        resolve(res);
      }).catch(err => {
        logger.error('error while  execute the query');
        reject(err);
      })
    })

  }
}
