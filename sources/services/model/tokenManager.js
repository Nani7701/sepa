/**
 * tokenmanager Model
 * tokenmanager is used for the modeling of token 
 * @package tokenmanager
 * @subpackage sources/services/model/tokenmanager
 * @author SEPA Cyber Technologies, Sekhara Suman Sahu.
 */

"use strict";

import { DbConnMgr } from '../dbconfig/dbconfig';
const DbInstance = DbConnMgr.getInstance();

export class TokenModel {
	constructor() {

	}
	//Method for save Token 
	saveToken(conn, id, token) {
		return new Promise(function (resolve, reject) {
			let sql = `insert into token(applicant_id, token) VALUES(${id},'${token}')`;
			conn.query(sql)
				.then((res) => {
					resolve(res);
				},err=>{
					reject(err);
				});
		});
	}

	saveLoginToken( id, token) {
		return new Promise(function (resolve, reject) {
			let sql = `insert into token(applicant_id, token) VALUES(${id},'${token}')`;
			DbInstance.executeQuery(sql)
				.then((res) => {
					resolve(res);
				},err=>{
					reject(err);
				});
		});
	}

	// method for get token details
	getTokenDetails(token) {
		return new Promise(function (resolve, reject) {
			let sql = `select created_on, token, applicant_id from token where token = '${token}' ORDER BY created_on desc`;
			DbInstance.executeQuery(sql)
				.then((res) => {
					resolve(res);
				}, err=>{
					reject(err);
				});
		});
	}

	//Method for save logs 
	saveLog(token, request) {
		return new Promise(function (resolve, reject) {
			let sql = `insert into audit_log (token, request ) VALUES('${token}','${request}')`;
			DbInstance.executeQuery(sql)
				.then((res) => {
					resolve(res);
				},err=>{
					reject(err);
				});
		});
	}

}

