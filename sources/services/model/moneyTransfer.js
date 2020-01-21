/**
 * moneyTransfer
 * This model contains all the methods to support a successful money transfer from one currency account
 * to another.
 * @package moneyTransfer
 * @subpackage model/moneyTransfer
 * @author SEPA Cyber Technologies Sekhara Suman Sahu
 */

import {
	DbConnMgr
} from '../dbconfig/dbconfig';

import {
	sqlObj
} from '../utility/sql';
let format = require('string-format');

const dbInstance = DbConnMgr.getInstance();
const db = DbConnMgr.getInstance();

const STATUS = {
	SUCCESS: 0,
	FAILURE: 1
}

export class MoneyTransfer {
	constructor(transDetail) {
		this.applicant_id = transDetail.applicant_id,
			this.from_currency = transDetail.from_currency,
			this.to_currency = transDetail.to_currency,
			this.to_mobile = transDetail.to_mobile,
			this.amount = transDetail.amount,
			this.currency_type = transDetail.currency_type,
			this.device_type = transDetail.device_type
	}
	//Method for checking minimum balance of an account before transfering money
	checkMinimumBalance(accountNo) {
		return new Promise((resolve, reject) => {
			let sql = `select balance,status from accounts where account_no = ${accountNo}`;
			dbInstance.executeQuery(sql).then(results => {
				resolve(results);
			}).catch(err => {
				reject(err);
			});
		});
	}
	deductAmnt(fromAccount, deductBalance, conn) {
		return new Promise((resolve, reject) => {
			let sql = `update accounts set balance = ${deductBalance} where account_no = ${fromAccount}`;
			conn.query(sql).then(results => {
				resolve(results);
			}).catch(err => {
				reject(err);
			});
		})
	}

	addAmnt(toAmnt, toAccount, conn) {
		return new Promise((resolve, reject) => {
			let sql = `update accounts set balance = balance + ${toAmnt}  where account_no = ${toAccount}`;

			conn.query(sql).then(result => {
				resolve(result);
			}).catch(err => {
				reject(err);
			})
		})
	}
	getFullName(accountNo) {
		return new Promise((resolve, reject) => {
			let sql = `select  contact.first_name,contact.last_name, accounts.currency from contact
								 JOIN  accounts on contact.applicant_id = accounts.applicant_id
								 where accounts.account_no = ${accountNo}`;
			dbInstance.executeQuery(sql).then(results => {
				resolve(results);
			}).catch(err => {
				reject(err);
			});
		})
	}

	insertTransaction(applicantId, transnum, transtype, from_account, to_account, currency, fullname, account_type,
		amount, timestamp, conn) {
		return new Promise((resolve, reject) => {
			let sql = `insert into transactions (applicant_id,transaction_number,transaction_type,from_account,to_account,currency_type,counterparty,account_type,amount, created_on)
               values (${applicantId},'${transnum}','${transtype}',${from_account},${to_account},'${currency}','${fullname}','${account_type}',${amount}, '${timestamp}')`;
			conn.query(sql).then(results => {
				resolve(results);
			}).catch(err => {
				reject(err);
			});
		});
	}

	getTransactionDetails(applicantId) {
		return new Promise((resolve, reject) => {
			let sql = `SELECT transaction_id,transaction_number, transaction_type, from_account ,to_account, counterparty , account_type, amount, created_on FROM transactions 
        WHERE applicant_id = ${applicantId} ORDER BY created_on DESC`;
			dbInstance.executeQuery(sql).then(results => {
				resolve(results);
			}).catch(err => {
				reject(err);
			});
		});
	}

	transactionDetailsByAccount(account) {
		return new Promise((resolve, reject) => {
			let sql = `select * from transactions where from_account =${account} and transaction_type='DB'
      UNION
      select * from transactions where to_account =${account} and transaction_type='CR' ORDER BY created_on DESC`;
			dbInstance.executeQuery(sql).then(results => {
				resolve(results);
			}).catch(err => {
				reject(err);
			});
		});
	}

	//Method for getting currency account number.
	getFromCurrencyAccountno(currencytype, applicantid) {
		return new Promise((resolve, reject) => {
			logger.info('getFromCurrencyAccountno() initiated');
			let sql = `select account_no from accounts where applicant_id = ${applicantid} AND currency = '${currencytype}'`;
			dbInstance.executeQuery(sql).then(result => {
				logger.info('getFromCurrencyAccountno() execution completed');
				resolve(result);
			}).catch(err => {
				logger.error(err);
				logger.info('getFromCurrencyAccountno() execution completed');
				reject(err);
			})
		})
	}

	getRecipientCurrencyAccount(toMobile, toCurrency) {
		return new Promise((resolve, reject) => {
			logger.info('getRecipientCurrencyAccount() initiated');
			let sql = `select accounts.account_no, accounts.applicant_id from accounts JOIN 
								 contact On contact.applicant_id = accounts.applicant_id
								 WHERE contact.mobile = '${toMobile}' AND accounts.currency = '${toCurrency}'`;
			dbInstance.executeQuery(sql).then(result => {
					logger.info('getRecipientCurrencyAccount() execution completed');
					resolve(result);
				})
				.catch(err => {
					logger.error(err);
					logger.info('getRecipientCurrencyAccount() execution completed');
					reject(err);
				})
		})
	}

	getWebTransactionDetails(applicantid, rangeDate, currentDate) {
		return new Promise((resolve, reject) => {
			let sql = sqlObj.webTransaction.getWebTrans;
			let sqlQuery = format(sql, applicantid, `\'${rangeDate}\'`, `\'${currentDate}\'`);

			db.doRead(sqlQuery).then(result => {
					resolve(result);
				})
				.catch(err => {
					reject(err);
				})
		})
	}

	getWebTransByAccount(accountNo, rangeDate, currentDate) {
		return new Promise((resolve, reject) => {
			let sql = sqlObj.webTransaction.getWebTransByAcc;
			let sqlQuery = format(sql, accountNo, `\'${rangeDate}\'`, `\'${currentDate}\'`, accountNo, `\'${rangeDate}\'`, `\'${currentDate}\'`);

			db.doRead(sqlQuery).then(transRes => {
					resolve(transRes);
				})
				.catch(err => {
					reject(err);
				})
		})
	}
}