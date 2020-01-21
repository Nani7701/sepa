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
const DbInstance = DbConnMgr.getInstance();

export class UserModel {
	constructor() {

	}


	// let query = 'select a.applicant_id, bu.applicant_id' + `${(this.type == 'email') ? "" : ",c.applicant_id" }`

	// + 'from applicant a' + `${(_.toLower(account_type) == "personal") ?  " , user_login bu"  : " , business_users bu"}` + `${(this.type == 'email') ? "" : ",cantact c" }` 

	// + 'where where  a.account_type =' +`${_.toLower(account_type)}`+' and a.applicant_id =	bu.applicant_id  and' + 

	// `${(this.type == 'email') ? "bu.user_id = '"+`${value}`+'" : "a.applicant_id = c.applicant_id and c.mobile = '"+`${value}`+'" }`;


	//Method for check duplicate user data
	getContactId(email, mobile, accountType) {
		logger.info('getContactId() initiated');
		return new Promise((resolve, reject) => {
			let sql = `SELECT c.contact_id, c.email, c.mobile FROM applicant a,contact c WHERE a.account_type='${accountType}'
		AND c.applicant_id = a.applicant_id AND (c.email='${email}'
		OR c.mobile ='${mobile}')`;
			DbInstance.executeQuery(sql).then(userData => {
				logger.debug(sql);
				logger.info('getContactId() execution completed');
				resolve(userData);
			}).catch(err => {
				logger.error(err);
				logger.info('getContactId() execution completed');
				reject(err);
			});
		})
	}
	isUserExists(value, type, accountType) {
		logger.info('isUserExists() initiated');
		return new Promise((resolve, reject) => {
			let sql = `SELECT contact.applicant_id from contact
			join applicant on contact.applicant_id = applicant.applicant_id
			where ${type} = '${value}' AND applicant.account_type = '${accountType}'`;
			DbInstance.executeQuery(sql).then(userData => {
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
	createApplicant(conn, account_type) {
		logger.info('createApplicant() initiated');
		return new Promise((resolve, reject) => {
			let sql = `insert into applicant (account_type) values ('${account_type}')`;
			conn.query(sql).then(applicantRes => {
				logger.info('createApplicant() execution completed');
				resolve(applicantRes)
			}).catch(err => {
				logger.error(err);
				logger.info('createApplicant() execution completed');
				reject(err);
			})
		})
	}
	createContact(conn, applicantId, first_name, middle_name, last_name, email, gender, dob, telephone, mobile, phone) {
		logger.info('createContact() initiated');
		return new Promise((resolve, reject) => {
			let sql = `insert into contact (applicant_id,first_name,middle_name,last_name,email,gender,dob,telephone,mobile,phone) values (${applicantId},'${first_name}','${middle_name}','${last_name}','${email}','${gender}','${dob}','${telephone}','${mobile}','${phone}')`;
			conn.query(sql).then(contactResult => {
				logger.info('createContact() execution completed');
				resolve(contactResult);
			}).catch(err => {
				logger.info('createContact() execution completed');
				reject(err);
			})
		})
	}

	createAddress(conn, applicantId, contactId, address_type_id, country_id, postal_code, address_line1, address_line2, city, town, region) {
		logger.info('createAddress() initiated');
		return new Promise((resolve, reject) => {
			let sql = `insert into address (country_id,address_type_id,postal_code,address_line1,address_line2,applicant_id,city,town,region,contact_id) values (${country_id}, ${address_type_id},'${postal_code}','${address_line1}','${address_line2}',${applicantId},'${city}','${town}','${region}',${contactId})`;
			conn.query(sql).then(addressResult => {
				logger.info('createAddress() execution completed');
				resolve(addressResult);
			}).catch(err => {
				logger.error(err);
				logger.info('createAddress() execution completed');
				reject(err);
			})
		})
	}
	createUser(userLoginTable, conn, email, applicantId, password, passcode_pin, roleId) {
		logger.info('createUser() initiated');
		return new Promise((resolve, reject) => {
			//let sql=`"insert into user_login (user_id,applicant_id,password,passcode_pin,role_id,email_verified,mobile_verified) values ('${email}','${applicantId}','${password}','${passcode_pin}','${roleId}',1,1)"`;
			conn.query(userLoginTable, [email, applicantId, password, passcode_pin, roleId, 1, 1,1]).then(userResult => {
				logger.info('createUser() execution completed');
				resolve(userResult);
			}).catch(err => {
				logger.error(err);
				logger.info('createUser() execution completed');
				reject(err);
			})
		})

	}
	insertKycDetails(conn, applicantId) {
		logger.info('insertKycDetails() initiated');
		return new Promise((resolve, reject) => {
			let sql = `insert into kyc (applicant_id) values (${applicantId})`;
			conn.query(sql).then(kycResult => {
				logger.info('insertKycDetails() execution completed');
				resolve(kycResult);
			}).catch(err => {
				logger.error(err);
				logger.info('insertKycDetails() execution completed');
				reject(err);
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
				reject(err);
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
				reject(err);
			})
		})

	}

	//select the password for the login 
	loginUser(email, table, role) {
		logger.info('loginUser() initiated');
		return new Promise(function (resolve, reject) {
			let sql = `select password from ${table} where user_id = '${email}' and role_id = ${role}`;
			DbInstance.executeQuery(sql).then(res => {
				logger.info('loginUser() execution completed');
				resolve(res);
			}).catch(err => {
				logger.error(err);
				logger.info('loginUser() execution completed');
				reject(`${err}`);
			})
		})
	}


	//this is for the check the intialpayment status
	checkInitialPayment(applicant_id) {
		logger.info('checkInitialPayment() initiated');
		return new Promise(function (resolve, reject) {
			let sql = `SELECT applicant_id FROM accounts  where applicant_id = ${applicant_id}`;
			DbInstance.executeQuery(sql).then(result => {
				logger.info('checkInitialPayment() execution completed');
				resolve(result);
			}).catch(err => {
				logger.error(err);
				logger.info('checkInitialPayment() execution completed');
				reject(`${err}`);
			})
		})
	}

	// // this function is used for create response and send back 
	responseCreation(email, roleName) {
		logger.info('responseCreation() initiated');
		return new Promise(function (resolve, reject) {
			let sql = `select a.applicant_id, a.account_type, a.next_step, c.email, c.first_name, c.gender, c.last_name, c.mobile,c.phone,
			ad.address_line1, ad.address_line2, ad.city, ad.country_id, ad.postal_code, ad.region, ad.town, k.kyc_status
			from applicant a, contact c, address ad, kyc k
			where a.applicant_id=c.applicant_id and a.applicant_id= ad.applicant_id and  a.account_type ='${roleName}' and a.applicant_id= k.applicant_id and c.email = '${email}'`;
			DbInstance.executeQuery(sql).then(result => {
				logger.info('responseCreation() execution completed');
				resolve(result);
			}).catch((err) => {
				logger.error(err);
				logger.info('responseCreation() execution completed');
				reject(`${err}`);
			})

		})
	}

	// used for get business id and append in the response of signup/ login
	getBusinessId(applicant_id) {
		logger.info('getBusinessId() initiated');
		return new Promise(function (resolve, reject) {
			let sql = `select business_id,country_of_incorporation,business_legal_name from business_details where applicant_id = ${applicant_id}`;
			DbInstance.executeQuery(sql).then((result) => {
				logger.info('getBusinessId() execution completed');
				resolve(result);
			}).catch((err) => {
				logger.error(err);
				logger.info('getBusinessId() execution completed');
				reject(`${err}`);
			})

		});
	}
	//this is for the get the pin
	getPin(table, email) {
		logger.info('getPin() initiated');
		return new Promise(function (resolve, reject) {
			let sql = `select passcode_pin from ${table} where user_id = '${email}'`;
			DbInstance.executeQuery(sql).then(res => {
				logger.info('getPin() execution completed');
				resolve(res);
			})
				.catch((err) => {
					logger.error(err);
					logger.info('getPin() execution completed');
					reject(err);
				})
		})
	}
	getSandboxDetails(applicant_id) {
		logger.info('getSandboxDetails() initiated');
		return new Promise(function (resolve, reject) {
			let sql = `select sandbox_id,applicant_id,memberId,api_key,url,api_doc_url,redirect_url from sandbox where applicant_id = '${applicant_id}'`
			DbInstance.executeQuery(sql).then((res) => {
				logger.info('getSandboxDetails() execution completed');
				resolve(res);
			}).catch(err => {
				logger.error(err);
				logger.info('getSandboxDetails() execution completed');
				reject(`${err}`);
			})
		})
	}

	kycEntry(id) {
		logger.info('kycEntry() intiated');
		return new Promise(function (resolve, reject) {
			let sql = `insert into kyc(applicant_id) values(${id})`;
			DbInstance.executeQuery(sql).then((res) => {
				logger.info('kycEntry() executed');
				resolve(res);
			}).catch(err => {
				logger.error
				logger.info('error in kycEntry()');
				reject(`${err}`);
			})
		})
	}

		//Method for cheking existing email id or mobile number
	getApplicantContact(contactId) {
		return new Promise((resolve, reject) => {
			let sql = `select applicant_id , CONCAT(c.first_name," ",c.last_name) as fullName , c.dob as dateOfBirth from contact where contact_id = ${contactId}`;
			DbInstance.executeQuery(sql).then(contact => {
				resolve(contact);
			}).catch(err => {
				reject(err);
			});
		})
	}

	//Method for sending email to to the sand box user
	sendEmailTosandboxUser(applicantId) {
		logger.info('sendEmailTosandboxUser() initiated');
		return new Promise((resolve, reject) => {
			let sql = `SELECT ps.memberId, ps.api_key, ps.url,bu.user_id
								 FROM sandbox ps
								 INNER JOIN business_users bu
								 ON ps.applicant_id = bu.applicant_id AND bu.applicant_id = ${applicantId}`;

			DbInstance.executeQuery(sql)
				.then(result => {
					logger.info('sendEmailTosandboxUser() execution');
					resolve(result);
				})
				.catch(err => {
					logger.error(err);
					logger.info('sendEmailTosandboxUser() execution');
					reject(err);
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
					reject(err);
				})
		})
	}
}

