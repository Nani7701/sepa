/**
 * businessModel
 * this is used for the insert  the business details of person in database and get the data from database
 * @package businessModel
 * @subpackage model/businessModel
 *  @author SEPA Cyper Technologies,krishnakanth.r
 */
"use strict";

import { DbConnMgr } from '../dbconfig/dbconfig';
import { langEngConfig } from '../utility/lang_eng';

const dbInstance = DbConnMgr.getInstance();

const STATUS = {
  SUCCESS: 0,
  FAILURE: 1
}

export class BusinessSectorModel {
  constructor() { }

  //for updating business sector details table data
  patchSectorAndIndustries(newBusinessSectorDetails,business_id) {
    return new Promise((resolve, reject) => {
      let { column, value } = newBusinessSectorDetails;
      let sqlQuery = `UPDATE business_sector_details SET ${column} = '${value}' where business_id = ${business_id}`;
      dbInstance.executeQuery(sqlQuery)
        .then(result => {
          resolve(result)
        }).catch(err => {
          
          reject({ err, status: STATUS.FAILURE })
        })
    })
  }


  getBusinessId(applicant_id){
    return new Promise((resolve,reject)=>{
      let sql=`select business_id from business_details where applicant_id=${applicant_id}`;
      dbInstance.executeQuery(sql).then(business_id=>{
        resolve(business_id);
      }).catch(err=>{
        reject(err);
      })
    })
  }


  //for storing sector,website,industries and services related data.
  postSectorAndIndustries(newBusinessSectorDetails,business_id) {
   let {  business_sector, range_of_service, website, restricted_business, selected_industries } = newBusinessSectorDetails;
   let values = selected_industries.split(',')
   return new Promise((reslove, reject) => {
      let sqlQuery1 = `insert into business_sector_details (business_id,business_sector,range_of_service,website,restricted_business,selected_industries) values (${business_id},'${business_sector}',"${range_of_service}","${website}",${restricted_business},"${selected_industries}")`;
      let sqlQuery2 = `SELECT business_industry_id FROM business_industry_lov  WHERE  business_industry_id ${values.length > 0 ? 'IN ('+ values +')' : '= 0'}  AND  restricted = 1`;
      let sqlQuery3 = `update  kyb_business set isRestricted = 1 where business_id = ${business_id}`    
      dbInstance.executeQuery(sqlQuery1).then(() => {
        if (selected_industries && selected_industries != '') {
          dbInstance.executeQuery(sqlQuery2, [])
            .then(result => {
              if (result.length > 0) {
                let filtered = result.filter(value => {
                  return value.hasOwnProperty("business_industry_id")
                }).map(value => {
                  return value["business_industry_id"];
                });
                let restricted_business = filtered.join(",");
                let sqlQuery4 = `UPDATE business_sector_details SET restricted_industries = '${restricted_business}' WHERE business_id = ${business_id}`
                dbInstance.executeQuery(sqlQuery4)
                  .then(result => {
                    dbInstance.executeQuery(sqlQuery3)
                      .then(result => {
                        reslove({ status: 1, message: `${langEngConfig.message.industries.restrictedBusinessSuccess}`, restricted: 1 })
                      }).catch(err => {
                        reslove({ status: 1, message: `${langEngConfig.message.industries.restrictedBusinessSuccess}, but Error : ${err}`, restricted: 1 })
                      })
                  }).catch(error => {
                    reject({ message: `update_restricted_business : ${error}`, status: 0, restricted: 0 })
                  })
              } else {
                reslove({ status: 1, message: `${langEngConfig.message.industries.checklistSectorSuccess}`, restricted: 0 })
              }
            }).catch(err=>{
              reject({ message: langEngConfig.message.error.ErrorHandler, status: 0, restricted: 0 })
            })
        }
      })
    })
  }
}