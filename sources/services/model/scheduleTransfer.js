/**
 * scheduleTranfer Model
 * scheduleTranfer is used for performing all scheduled transactions .
 * @package scheduleTranfer
 * @subpackage sources/services/model/scheduleTranfer
 * @author SEPA Cyper Technologies, Sekhara Suman Sahu.
 */
import { sqlObj } from '../utility/sql';
import { DbConnMgr } from '../dbconfig/dbconfig';
let db = DbConnMgr.getInstance();
let format = require('string-format');
//ScheduleMoneyTransfer Class

export class ScheduleTransfer {
  constructor() {}

  //Method for storing bulk transfer in schedule transfer table
  setScheduleTransfer(id, senderId, transTime,  fromCurr, arrayOfTrans, totalAmt, notify, createdOn) {
    return new Promise((resolve, reject) => {
      let sql = sqlObj.scheduleTransfer.saveScheduleTransfer;
      let sqlQuery = format(sql, id, senderId, transTime, fromCurr, arrayOfTrans, totalAmt, notify, createdOn);

      db.doInsert(sqlQuery).then(setTransRes => {
          resolve(setTransRes);
        })
        .catch(err => {
          reject(err);
        })
    })
  }
  //Method to check wheather the receipient is added as counterparty for sender
  isAddedCounterParty(applicantId, mobile){
    return new Promise((resolve, reject)=>{
      let sql = sqlObj.walletTransfer.isAddedCounterparty;
      let sqlQuery = format(sql, applicantId, mobile);

      db.doRead(sqlQuery).then(isAddedRes=>{
        resolve(isAddedRes);
      })
      .catch(err=>{
        reject(err);
      })
    })
  }
}
