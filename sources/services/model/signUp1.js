/**
 * signUpModel Model
 * signUpModel is used for the modeling of user registration purpose. An individual user has to give the required 
 * data to register himself in the payvoo app.
 * @package signUpModel
 * @subpackage sources/services/model/signUpModel
 * @author SEPA Cyber Technologies, Sekhara Suman Sahu.
 */

"use strict";

import { DbConnMgr } from '../dbconfig/dbconfig';
const db = DbConnMgr.getInstance();

export class UserModel {
	constructor() {

	}

  checkUniqueId(email, mobile){
    logger.info('checkUniqueId() initiated');
		return new Promise((resolve, reject) => {
    let sql = `select email, mobile from contact where email = '${email}' OR mobile = '${mobile}'`;
		
		db.doRead(sql).then(userData => {
			logger.debug(sql);
			logger.info('checkUniqueId() execution completed');
			resolve(userData);
		}).catch(err => {
			logger.error(err);
			logger.info('checkUniqueId() execution completed');
			reject(new Error(err));
		  });
		})
	}
	
	createApplicant(conn, accountType, custid,  userId, password, passcodePin, mobile,  roleId, status, createdOn){
		return new Promise((resolve, reject)=>{
			logger.info('createApplicant() initiated');
			let sql = `insert into applicant (account_type, customerId, user_id, password, passcode_pin, mobile, role_id, status, created_on) values ('${accountType}','${custid}' ,'${userId}', '${password}', ${passcodePin}, ${mobile},
				${roleId} , ${status}, '${createdOn}')`;

			conn.query(sql).then(res=>{
				logger.info('createApplicant() execution completed');
				resolve(res);
			}).catch(err=>{
				logger.error(err);
				logger.info('createApplicant() execution completed');
				reject(new Error(err));
			});
		})	
	}


	createContact(conn, applicantId, first_name, middle_name, last_name, email, gender, dob, telephone, mobile, phone, createdOn) {
		logger.info('createContact() initiated');
		return new Promise((resolve, reject) => {
			let sql = `insert into contact (applicant_id,first_name,middle_name,last_name,email,gender,dob,telephone,mobile,phone, created_on) values (${applicantId},'${first_name}','${middle_name}','${last_name}','${email}','${gender}','${dob}','${telephone}','${mobile}','${phone}', '${createdOn}')`;
			conn.query(sql).then(contactResult => {
				logger.info('createContact() execution completed');
				resolve(contactResult);
			}).catch(err => {
				logger.info('createContact() execution completed');
				reject(new Error(err));
			})
		})
	}


	createAddress(conn, applicantId, contactId, address_type_id, country_id, postal_code, address_line1, address_line2, city, town, region, createdOn) {
		logger.info('createAddress() initiated');
		return new Promise((resolve, reject) => {
			let sql = `insert into address (country_id,address_type_id,postal_code,address_line1,address_line2,applicant_id,city,town,region,contact_id , created_on) values (${country_id}, ${address_type_id},'${postal_code}','${address_line1}','${address_line2}',${applicantId},'${city}','${town}','${region}',${contactId}, '${createdOn}')`;
			conn.query(sql).then(addressResult => {
				logger.info('createAddress() execution completed');
				resolve(addressResult);
			}).catch(err => {
				logger.error(err);
				logger.info('createAddress() execution completed');
				reject(new Error(err));
			})
		})
	}

	createKyc(conn, applicantId) {
		logger.info('insertKycDetails() initiated');
		return new Promise((resolve, reject) => {
			let sql = `insert into kyc (applicant_id) values (${applicantId})`;
			conn.query(sql).then(kycResult => {
				logger.info('insertKycDetails() execution completed');
				resolve(kycResult);
			}).catch(err => {
				logger.error(err);
				logger.info('insertKycDetails() execution completed');
				reject(new Error(err));
			})
		})
	}

	createCurrencyAccount(conn, applicantId, roleId) {
		logger.info('insertKycDetails() initiated');
		return new Promise((resolve, reject) => {
			let sql = `insert into accounts (applicant_id,role_id,currency,status,balance) values(${applicantId},${roleId},"EUR",1,0)`;
			conn.query(sql).then(accountResult => {
				logger.info('insertKycDetails() execution completed');
				resolve(accountResult);
			}).catch(err => {
				logger.error(err);
				logger.info('insertKycDetails() execution completed');
				reject(new Error(err));
			})
		})
	}

	createCurrencyExchangeAccount(conn,rowItems) {
		return new Promise((resolve, reject) => {
			let sql = `insert check_rates (applicant_id,from_currency,isConvert) values (?,?,?)`;
		conn.batch(sql,rowItems)
				.then(result => {
					logger.info('sendEmailTosandboxUser() execution');
					resolve(result);
				})
				.catch(err => {
					logger.error(err);
					logger.info('sendEmailTosandboxUser() execution');
					reject(new Error(err));
				})
		})
	}

	createSandboxUser(conn, applicantId, memberId, apiKey, url, api_doc_url, redirect_url) {
		logger.info('createSandboxUser() initiated');
		return new Promise((resolve, reject) => {
			let sql = `insert into sandbox (applicant_id,memberId,api_key,url,api_doc_url,redirect_url) values (${applicantId},'${memberId}','${apiKey}','${url}','${api_doc_url}','${redirect_url}')`;
			conn.query(sql).then(userResult => {
				logger.info('createSandboxUser() execution completed');
				resolve(userResult);
			}).catch(err => {
				logger.error(err);
				logger.info('createSandboxUser() execution completed');
				reject(new Error(err));
			})
		})
	}

	isUserExists(value, type) {
		logger.info('isUserExists() initiated');
		return new Promise((resolve, reject) => {
			let sql = `select contact_id from contact where ${type} = '${value}'`;
			db.doRead(sql).then(userData => {
				logger.debug(sql);
				logger.info('isUserExists() execution completed');
				resolve(userData);
			}).catch(err => {
				logger.error(err);
				logger.info('isUserExists() execution completed');
				reject(err);
			});
		})
	}
} 