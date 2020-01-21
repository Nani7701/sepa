/**
 * currencyExchange
 * This model is used to support the currencyExchange methods.
 * @subpackage model/currencyExchangeModel
 *  @author SEPA Cyber Technologies, Tarangini Dola
 */
'use strict';
import { DbConnMgr } from '../dbconfig/dbconfig';
const dbInstance = DbConnMgr.getInstance();

export class CurrencyNotify {
  constructor(user) {
      this.applicant_id = user.applicant_id;
      this.auto_exchange_id = user.auto_exchange_id;
      this.amount = user.amount;
      this.target_amount = user.target_amount;
      this.from_currency = _.toUpper(user.from_currency);
      this.to_currency = _.toUpper(user.to_currency);
      this.exchange_status = user.exchange_status;

  }
  //This method is used in insertCurrencyExchangeInfo method
  CurrencyExchangeInfo(account_no, from_currency, to_currency,amount,target_amount, status) {
    logger.info('currencyExchangeInfo() intiated');
    return new Promise((resolve, reject) => {
      let sql = `select applicant_id from currency_exchange where account_no = ${account_no} and from_currency = '${from_currency}' and to_currency= '${to_currency}' and  exchange_status =${status} and status = ${status} and amount=${amount} and target_amount=${target_amount}`;
      dbInstance.executeQuery(sql).then(res => {
        logger.info('execution completed');
        resolve(res)
      }).catch(err => {
        logger.error('error while  execute the query');
        reject(err);
      })
    })
  }
 
  // This method is used for insert the CurrencyExchange details in currencyExchange table
  insertCurrencyExchangeInfo(applicant_id, account_no, from_currency, to_currency, amount, target_amount, status) {
    logger.info('insertCurrencyExchangeInfo() intiated');
    return new Promise((resolve, reject) => {
      let sql = `INSERT INTO currency_exchange (applicant_id,account_no,from_currency,to_currency,amount,target_amount,exchange_status,status) 
            VALUES (${applicant_id},${account_no},'${from_currency}','${to_currency}',${amount},${target_amount},${status},${status})`;
      dbInstance.executeQuery(sql).then(res => {
        logger.info('execution completed');
        resolve(res);
      }).catch(err => {
        logger.error('error while  execute the query');
        reject(err);
      })
    })
  }

  // This method is used for get all the data from currency exchange
  getCurrencyExchange(applicant_id,status) {
    logger.info('getCurrencyExchange() intiated');
    return new Promise((resolve, reject) => {
      let sql = `select auto_exchange_id,from_currency,to_currency,amount,target_amount from currency_exchange where applicant_id = ${applicant_id} and exchange_status = ${status} and status = ${status}`;
      dbInstance.executeQuery(sql).then((data) => {
        logger.info('query executed');
        resolve(data);
      }).catch(err => {
        logger.error('error while  execute the query');
        reject(err);
      })
    })
  }

  // This method is used for delete the data from currency exchange
  deleteCurrencyExchange(auto_exchange_id,status,timestamp) {
    logger.info('deleteCurrencyExchange() intiated');
    return new Promise((resolve, reject) => {
      let sql = `UPDATE currency_exchange SET status = ${status},updated_on = '${timestamp}' where auto_exchange_id= ${auto_exchange_id}`;
      dbInstance.executeQuery(sql).then(data => {
        logger.info('execution completed');
        resolve(data);
      }).catch(err => {
        logger.error('error while execute the query');
        reject(err);
      })
    });
  }

  // This method is used for update the data from currency exchange
  updateCurrencyExchange(amount, target_amount,from_currency,to_currency,status, auto_exchange_id,timestamp) {
    logger.info('updateCurrencyExchange() intiated');
    return new Promise((resolve, reject) => {
      let sql = `UPDATE currency_exchange SET amount=${amount},target_amount=${target_amount},from_currency='${from_currency}',to_currency='${to_currency}',updated_on='${timestamp}' WHERE auto_exchange_id=${auto_exchange_id} and exchange_status=${status} and status=${status}`;     
      dbInstance.executeQuery(sql).then((data) => {
        logger.info('execution completed');
        resolve(data);
      }).catch(err => {
        logger.error('error while execute the query')
        reject(err);

      })
    })
  }
  getAccountNumber(applicantId, currency) {
    logger.info("getAccountNumber() initiated")
    return new Promise((resolve, reject) => {
      let sql = `SELECT account_no FROM accounts WHERE applicant_id=${applicantId} AND currency='${currency}'`;
      dbInstance.executeQuery(sql).then((data) => {
        logger.info('execution completed');
        resolve(data);
      }).catch(err => {
        logger.error('error while execute the query')
        reject(err);
      })
    })
  }
  checkExchangeInfo(id,status) {
    logger.info("checkExchangeInfo() initiated")
    return new Promise((resolve, reject) => {
      let sql = `SELECT applicant_id FROM currency_exchange WHERE auto_exchange_id=${id} AND status='${status}'`;
      dbInstance.executeQuery(sql).then((data) => {
        logger.info('execution completed');
        resolve(data);
      }).catch(err => {
        logger.error('error while execute the query')
        reject(err);
      })
    })

  }
}
