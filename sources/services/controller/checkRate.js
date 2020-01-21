/**
 * checkRate Controller
 * checkRate controller is used for price convertion and price alert related services.
 * @package checkRate
 * @subpackage services/controller/checkRate
 * @author SEPA Cyber Technologies, Sekhara Suman Sahu , Kerishna kanth R. Shashank Singu.
 */
import { CheckRateModel } from '../model/checkRate';
import { langEngConfig } from '../utility/lang_eng';
let checkRateModel = new CheckRateModel();

const STATUS = {
  SUCCESS: 0,
  FAILURE: 1
}
export class CheckRate {
  constructor(checkRateData) {
    this.applicant_id = checkRateData.applicant_id,
      this.from_currency = checkRateData.from_currency,
      this.to_currency = checkRateData.to_currency,
      this.isConvert = checkRateData.isConvert,
      this.created_on = checkRateData.created_on
  }
}

/**
* @desc method for checking the checkrate 
* @method checkRate 
* @param {Object} request - It is Request object
* @param {Object} response - It is Response object
* @return return message and status code.
*/
export const checkRate = (request, response) => {
  var today = new Date();
  date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  let cardrateDetail = new CheckRate(request.body);
  let createdOn = date + ' ' + time;

  checkRateModel.checkRate(cardrateDetail.applicant_id, cardrateDetail.from_currency, cardrateDetail.to_currency, cardrateDetail.isConvert, createdOn)
    .then(result => {
      if (result) {
        response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.payment.check_rate_succ, STATUS.SUCCESS));
      } else {
        response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.payment.check_rates_fail, STATUS.FAILURE));
      }
      response.send(result);
    })
    .catch(err => {
      response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
    })
}

/**
* @desc method for deleting the checkrate 
* @method checkRate 
* @param {Object} request - It is Request object
* @param {Object} response - It is Response object
* @return return message and status code.
*/
export const deleteCheckRate = (request, response) => {
  let check_rate_id = request.params.check_rate_id;
  checkRateModel.deleteCheckRate(check_rate_id)
    .then(result => {
      if (result == 0) {
        response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.payment.check_rate_del_succ, STATUS.SUCCESS));
      } else {
        response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.payment.check_rate_del_fail, STATUS.SUCCESS));
      }
    })
    .catch(err => {
      response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
    })
}