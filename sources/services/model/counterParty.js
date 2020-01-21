/**
 * counterPartyModel
 * this is used for the create the counterParty and get the counterParties with in wallet and get the users list in payvoo
 * @package counterPartyModel
 * @subpackage model/counterPartyModel
 *  @author SEPA Cyper Technologies,krishnakanth.r
 */
"use strict";
let format = require('string-format');
import { DbConnMgr } from '../dbconfig/dbconfig';
const DbInstance = DbConnMgr.getInstance();
import {
  sqlObj
} from '../utility/sql';
export class Beneficiary {
  constructor(user) {
    this.name = user.name;
    this.mobile = user.mobile;
    this.fullName = user.full_name;   
    this.country = user.country;
    this.counterparty_id = user.counterparty_id; 
    this.limit = user.limit;   
    this.email = user.email; 
  }
  beneficiarysSearch(name,personal,business,active,start,end,id) {
    logger.info(' beneficiarysSearch() intiated');
    return new Promise((resolve,reject) => {      
      // let sql = ` select * from (      
      //   SELECT DISTINCT CONCAT_WS(' ',c.first_name,c.middle_name,c.last_name) as full_name,
      //   c.contact_id,c.mobile ,ad.country_id,ct.country_name,c.email
      //   FROM contact c
      //   INNER JOIN applicant a ON c.applicant_id = a.applicant_id AND a.role_id ='${personal}' AND a.status='${active}' AND a.applicant_id != '${id}' 
      //   INNER JOIN address ad ON c.applicant_id = ad.applicant_id
      //   INNER JOIN country ct ON ad.country_id = ct.country_id
      //   AND (CONCAT_WS(' ',c.first_name,c.middle_name,c.last_name) LIKE "%${name}%" 
      //   OR c.mobile LIKE "%${name}%" OR c.email LIKE "%${name}%")      
      //   UNION
      //   SELECT DISTINCT CONCAT_WS('',b.business_legal_name) as full_name,
      //   c.contact_id,c.mobile,ad.country_id,ct.country_name,c.email
      //   FROM business_details b 
      //   INNER JOIN applicant a ON b.applicant_id = a.applicant_id AND a.role_id = '${business}' AND a.status = '${active}' AND a.applicant_id != '${id}'
      //   INNER JOIN contact c ON b.applicant_id = c.applicant_id
      //   INNER JOIN address ad ON c.applicant_id = ad.applicant_id
      //   INNER JOIN country ct ON ad.country_id = ct.country_id
      //   AND (CONCAT_WS('',b.business_legal_name) LIKE "%${name}%" 
      //   OR c.mobile LIKE "%${name}%"  OR c.email LIKE "%${name}%")
      //  ) a ORDER BY full_name LIMIT ${start},${end}`;
      let sql = sqlObj.counterparty.globalSearch;
      let sqlQuery = format(sql,name,personal,business,active,start,end,id);
      DbInstance.executeQuery(sqlQuery).then(results => {
        logger.info('execution completed');
        //console.log(sql);
        resolve(results);
      }).catch(err => {
        logger.error('error while  execute the query');
        reject(err);
      })
    })
  }
  createBenificary(fullName,mobile,email,country,applicant_id,counterparty_id,date,active) {
    logger.info(' createBenificary() intiated');
    return new Promise((resolve,reject) => {
      //let sql=`insert into user_counterparty (userId,counterparty,full_name,mobile,email,country,status,created_on) values ('${applicant_id}','${counterparty_id}','${fullName}','${mobile}','${email}','${country}','${active}','${date}')`;
      let sql = sqlObj.counterparty. createBeneficiary;
      let sqlQuery = format(sql,fullName,mobile,email,country,applicant_id,counterparty_id,date,active);
      DbInstance.executeQuery(sqlQuery).then(results => {
        logger.info('execution completed');
        resolve(results);
      }).catch(err => {
        logger.error('error while  execute the query');
        reject(err);
      })
    })
  }
  getapplicantId(mobile,email) {
    logger.info(' getCouterpartyId() intiated');
    return new Promise((resolve,reject) => {
      // let sql=`select applicant_id from contact where mobile = '${mobile}' AND email = '${email}'`;
      let sql = sqlObj.counterparty.getApplicantId;
      let sqlQuery = format(sql,mobile,email);
      DbInstance.executeQuery(sqlQuery).then(results => {
        logger.info('execution completed');
        resolve(results);
      }).catch(err => {
        logger.error('error while  execute the query');
        reject(err);
      })
    })
  }
  checkData(mobile,active,id) {
    logger.info('checkData() intiated');
    return new Promise((resolve,reject) => {
      // let sql=`select counterparty_id from user_counterparty where mobile = '${mobile}' AND status = '${active}' AND userId = '${id}'`;
      let sql = sqlObj.counterparty.checkData;
      let sqlQuery = format(sql,mobile,active,id);
      DbInstance.executeQuery(sqlQuery).then(results => {
        logger.info('execution completed');
        resolve(results);
      }).catch(err => {
        logger.error('error while  execute the query');
        reject(err);
      })
    })
  }
  counterPartyInfo(name,active,currency,id,start,end) {
    logger.info('countryPartyInfo() intiated');
    return new Promise((resolve,reject) => {      
      // let sql = `select u.counterparty_id,u.full_name,u.mobile,u.email,c.country_name,a.account_no,a.currency from user_counterparty u
      // INNER JOIN country c ON c.country_id = u.country
      // INNER JOIN accounts a ON u.counterparty = a.applicant_id AND a.currency = '${currency}' AND a.status ='${active}'
      // where u.status = '${active}' AND u.userId ='${id}' AND (u.full_name LIKE '%${name}%' OR u.mobile LIKE '%${name}%' OR u.email LIKE '%${name}%') LIMIT ${start},${end}`;
      let sql = sqlObj.counterparty.counterPartyInfo;
      let sqlQuery = format(sql,name,active,currency,id,start,end);
      DbInstance.executeQuery( sqlQuery).then(results => {
        logger.info('execution completed');
        //console.log(sql);
        resolve(results);
      }).catch(err => {
        logger.error('error while  execute the query');
        reject(err);
      })
    })
  }
  deleteCounterParty(id,user_id,timestamp,deactive) {
    logger.info(' deleteCounterParty() intiated');
    return new Promise((resolve,reject) => {
      // let sql = `UPDATE user_counterparty SET status='${deactive}' AND updated_on='${timestamp}' WHERE counterparty_id='${id}' AND userId = '${user_id}'`;
      let sql = sqlObj.counterparty.deleteCounterParty;
      let sqlQuery = format(sql,id,user_id,timestamp,deactive);
      DbInstance.executeQuery(sqlQuery).then(results => {
        logger.info('execution completed');
        //console.log(sql);
        resolve(results);
      }).catch(err => {
        logger.error('error while  execute the query');
        reject(err);
      })
    })
  }
  getCounterpartyId(id,user_id,active) {
    logger.info(' deleteCounterParty() intiated');
    return new Promise((resolve,reject) => {
      // let sql = `select userId from user_counterparty where counterparty_id='${id}' AND status='${active}' AND userId = '${user_id}'`;
      let sql = sqlObj.counterparty.getCounterparty_id;
      let sqlQuery = format(sql,id,user_id,active);
      DbInstance.executeQuery(sqlQuery).then(results => {
        logger.info('execution completed');
        //console.log(sql);
        resolve(results);
      }).catch(err => {
        logger.error('error while  execute the query');
        reject(err);
      })
    })
  }
  counterPartyList(id,currency,active) {
    logger.info('countryPartyInfo() intiated');
    return new Promise((resolve,reject) => {
      //  let sql = `select u.counterparty_id,u.full_name,u.mobile,u.email,c.country_name,a.account_no,a.currency from user_counterparty u
      // INNER JOIN country c ON c.country_id = u.country
      // INNER JOIN accounts a ON u.counterparty = a.applicant_id AND a.currency = '${currency}' AND a.status ='${active}'
      // where u.status = '${active}' AND u.userId ='${id}'`
      let sql = sqlObj.counterparty.counterpartyList;
      let sqlQuery = format(sql,id,currency,active);
      DbInstance.executeQuery(sqlQuery).then(results => {
        logger.info('execution completed');
        resolve(results);
      }).catch(err => {
        logger.error('error while  execute the query');
        reject(err);
      })
    })
  }
  getCounterPartyid(id,active) {
    logger.info('checkData() intiated');
    return new Promise((resolve,reject) => {
      // let sql=`select counterparty_id from user_counterparty where status = '${active}' AND userId = '${id}'`;
      let sql = sqlObj.counterparty.getCounterPartyId;
      let sqlQuery = format(sql,id,active);
      DbInstance.executeQuery(sqlQuery).then(results => {
        logger.info('execution completed');
        resolve(results);
      }).catch(err => {
        logger.error('error while  execute the query');
        reject(err);
      })
    })
  }
  checkCounterParty(id,mobile,active) {
    logger.info('checkCounterParty() intiated');
    return new Promise((resolve,reject) => {
      // let sql=`select counterparty from user_counterparty where status = '${active}' AND userId = '${id}' AND mobile = '${mobile}'`;
      let sql = sqlObj.counterparty.checkCounterParty;
      let sqlQuery = format(sql,id,mobile,active);
      DbInstance.executeQuery(sqlQuery).then(results => {
        logger.info('execution completed');
        resolve(results);
      }).catch(err => {
        logger.error('error while  execute the query');
        reject(err);
      })
    })
  }
  getAccounts(id,active) {
    logger.info(' getAccounts() intiated');
    return new Promise((resolve,reject) => {
      // let sql=`select currency from accounts where applicant_id = '${id}' and status = '${active}'`;
      let sql = sqlObj.counterparty.getAccounts;
      let sqlQuery = format(sql,id,active);
      DbInstance.executeQuery(sqlQuery).then(results => {
        logger.info('execution completed');
        resolve(results);
      }).catch(err => {
        logger.error('error while  execute the query');
        reject(err);
      })
    })
  }
}
