/**
 * commonCode
 * commonCode for currencyExcahnge and MobileOtp
 * @package kycEntry
 * @subpackage controller/kycEmtry/kycEntry
 *  @author SEPA Cyper Technologies,krishnakanth.r
 */


"use strict";

let currencyExchange = function (from, to, checkRates_id) {
  return new Promise(function (resolve, reject) {
    fixer.latest({ base: from, symbols: [to] }).then((rate) => {
      resolve({ rate: rate.rates[to], status: 1, from: from, to: to, checkRates_id: checkRates_id })
    }, (err) => {
      resolve({ rate: 0, status: 0 })
    });
  })
}


let mobileOtp = function (phone, message) {
  return new Promise((resolve, reject) => {
    request({
      method: "get",
      url: `https://gate.mobica.bg/send.php?user=${process.env.MOBICAUSER}&pass=${process.env.MOBICAPASS}&phone=${phone}&message=${message}&from=test&route=false`,
      json: true
    }, function (error, response) {
      if (error) {
        reject(error)
      } else if (response.body.status == 1004) {
        resolve(response)
      } else {
        reject(response.body)
      }
    })
  });
}


/**
* @desc this method is used to call kyd API to get company details 
* @method statusUpdate 
* @param {Object} companyId - It contains companyId
* @param {Object} dataSet - It contains dataSet
* @param {Object} request - It is Request object
* @return return company details
*/
let getCompanyDetails = function (companyId, dataSet, req) {
  logger.info("getCompanyDetails() initiated");
  return new Promise((resolve, reject) => {
    request({
      method: 'post',
      headers: { "accept": "application/json", "authorization": req.headers["authorization"], "member_id": req.headers["member_id"], "api_access_key": req.headers["api_access_key"], "client_auth": req.headers["client_auth"] },
      url: `http://${process.env.GATEWAY_URL}:${process.env.GATEWAY_PORT}/kyb_kompany/companyDetail`,
      body: {
        "kyb": {
          "companyId": companyId, "dataSet": dataSet
        }
      },
      json: true,
    }, function (err, res) {
      if (res) {
        if (_.get(res.body, "data.success") == false) {
          logger.debug("no data found");
          logger.debug(data.message);
          reject({ message: _.get(res.body, "data.message"), status: 0 })
        } else {
          logger.info("successfully get the data");
          resolve(res.body.data)
        }
      } else {
        logger.debug("error while getting results");
        reject(err);
      }
    })
  });
}

/**
* @desc this method is used for call KYB api to get company ID  
* @method getCompanyId 
* @param {string} countryCode - It contains companyId
* @param {string} companyName - It contains dataSet
* @param {Object} request - It is Request object
* @return return company id
*/
let getCompanyId = function (countryCode, companyName, req) {
  logger.info("getCompanyId() initiated");
  return new Promise((resolve, reject) => {
    request({
      method: 'post',
      headers: { "accept": "application/json", "authorization": req.headers["authorization"], "member_id": req.headers["member_id"], "api_access_key": req.headers["api_access_key"], "client_auth": req.headers["client_auth"] },
      url: `http://${process.env.GATEWAY_URL}:${process.env.GATEWAY_PORT}/kyb_kompany/companyId`,
      body: {
        "kyb": {
          "countryCode": countryCode, "companyName": companyName
        }
      },
      json: true,
    }, function (err, res) {
      if (res) {
        logger.info("successfully get the results");
        resolve(res.body)
      } else {
        logger.info("error while getting results");
        reject(err)
      }

    })

  });
}


export {
  currencyExchange,
  mobileOtp,
  getCompanyDetails,
  getCompanyId
}

