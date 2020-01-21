/**
 * currencyExchange Controller
 * currencyExchange Controller is used for create the currency exchange record
 * @subpackage controller\currencyExchange
 *  @author SEPA Cyber Technologies, Tarangini Dola,krishnakanth r
 */
'use strict';

import { CurrencyNotify } from '../model/currencyExchangeModel';
import { currencyExchange } from '../controller/commonCode';
import { langEngConfig } from '../utility/lang_eng';

const STATUS = {
	SUCCESS: 0,
	FAILURE: 1,
	ACTIVE:1,
	DEACTIVE:0
}
const today = new Date();
const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
const timeStamp = date + ' ' + time;

/**
 * This function for inserting the currency exchange details actions
 * @method insertCurrencyExchange 
 * @param {Object} request - It is Request object
 * @param {Object} response - It is Response object
 */
export const insertCurrencyExchange = (request, response) => {
	let applicant_id = request.params.applicant_id;
	let currencyNotify = new CurrencyNotify(request.body);
	logger.info('getCurrencyExchange() intiated');
	var status = STATUS.ACTIVE;
	var accountNo;
	if (currencyNotify.amount == '' || currencyNotify.target_amount == '' || currencyNotify.amount == 'undefined' || currencyNotify.target_amount == 'undefined') {
		logger.info("invalid request data");
		return response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.currency.fail2, STATUS.FAILURE))
	}
	if (currencyNotify.from_currency == currencyNotify.to_currency) {
		logger.info("from currency and to currency both are same")
		return response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.currency.fail6, STATUS.FAILURE));
	}	
	if (currencyNotify.from_currency && currencyNotify.to_currency) {
		logger.info(" status checked");
			currencyNotify.getAccountNumber(applicant_id, currencyNotify.from_currency).then(results => {
				logger.info("getAccountNumber() initiated");
				if (results.length > 0) {
					logger.info("get the accountNo successfully");
					accountNo = results[0].account_no;
					return insertCurrencyExchangeData(applicant_id, accountNo, status, currencyNotify, response);
				} else {
					logger.info("get the empty results");
					logger.debug("no accountNo found");
					return response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.payment.noAccount, STATUS.FAILURE))
				}
			}).catch(err => {
				return response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)))
			})
	} else {
		logger.info("invalid request data");
		return response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.currency.fail2, STATUS.FAILURE));
	}
}

/**
 * This function for inserting the currency exchange details actions
 * @method insertCurrencyExchangeData 
 * @param {int}  applicant_id- It is applicant_id of person
 * @param {int} accountNo - It is respective currency account No;
 * @param {int} status --it will differentiate price alert and currency exchange function
 * @param {object} currencyNotify -- it is request object
 * @param {object} response -- it is response object
 */
let insertCurrencyExchangeData = (applicant_id, accountNo, status, currencyNotify, response) => {
	logger.info("insertCurrencyExchangeData() initiated");
	currencyNotify.CurrencyExchangeInfo(accountNo, currencyNotify.from_currency, currencyNotify.to_currency, currencyNotify.amount, currencyNotify.target_amount, status).then(res => {
		logger.info('currencyNotify.currencyExchangeInfo() intiated');
		if (_.size(res) > 0) {
			logger.info("currencyExchange record already existed with this request data");
			return response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.currency.fail7, STATUS.FAILURE));
		} else {
			currencyNotify.insertCurrencyExchangeInfo(applicant_id, accountNo, currencyNotify.from_currency, currencyNotify.to_currency, currencyNotify.amount, currencyNotify.target_amount, status).then(res => {
				if (res.affectedRows > 0) {
					logger.info("currencyexchange record inserted successfully")
					return response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.payment.exchange_success, STATUS.SUCCESS));
				} else {
					logger.debug("something went wrong while creating data");
					return response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.payment.exchange_error, STATUS.FAILURE));
				}
			}).catch(err => {
				logger.debug("error while insert the data")
				return response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)))
			})
		}
	}).catch(err => {
		logger.error("error while getting the data")
		return response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)))
	})

}
/**
 * Method for getting the currency exchange details actions
 * @method getCurrencyExchange 
 * @param {Object} request - It is Request object
 * @param {Object} response - It is Response object
 */
export const getCurrencyExchange = (request, response) => {
	let currencyNotify = new CurrencyNotify(request.params);
	let applicantId = currencyNotify.applicant_id;
	let status = STATUS.ACTIVE;
	logger.info('getCurrencyExchange() intiated');
	currencyNotify.getCurrencyExchange(applicantId, status).then(data => {
		if (data.length > 0) {
			logger.warn('data.length must be graterthan zero ');
			var i = 0
			logger.info("currencyExchange() called");
			_.forEach(data, function (row) {
				currencyExchange(row.from_currency, row.to_currency, null).then(function (value) {
					i++; row["currency_rate"] = value.rate;
					if (_.size(data) == i) {
						logger.info('execution completed');
						response.send(ResponseHelper.buildSuccessResponse({ currencyExchangeDetails: data }, langEngConfig.message.payment.get_success, STATUS.SUCCESS));
					}
				})
			})
		}
		else {
			logger.warn('data.length < 1 in  currencyNotify.getCurrencyExchange()');
			response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.payment.get_fail, STATUS.FAILURE));
		}
	}).catch(err => {
		logger.debug("error while delete the data")
		response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)))
	})

}

/**
 * Method for delete the currency exchange details
 * @method deleteCurrencyExchange 
 * @param {Object} request - It is Request object
 * @param {Object} response - It is Response object
 */
export const deleteCurrencyExchange = (request, response) => {
	let currencyNotify = new CurrencyNotify(request.params);
	let status = STATUS.ACTIVE;
	logger.info('deleteCurrencyExchange() intiated');
	currencyNotify.checkExchangeInfo(currencyNotify.auto_exchange_id,status).then(results => {
		if(results.length > 0) {
			currencyNotify.deleteCurrencyExchange(currencyNotify.auto_exchange_id,!status,timeStamp).then(result => {
				if (result.affectedRows > 0) {
					logger.info('data deleted successfully');
					response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.payment.delete_success, STATUS.SUCCESS));
				} else {
					logger.debug(' no records found with auto_exchange_id ')
					response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.payment.delete_fail, STATUS.FAILURE));
				}
			}).catch(err => {
				logger.error("error while delete the data")
				response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)))
			})
		} else {
			logger.info("invalid request data");
			return response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.currency.fail2, STATUS.FAILURE));			
		}
	})
	
}

/**
 * Method for update the currency exchange details
 * @method updateCurrencyExchange 
 * @param {Object} request - It is Request object
 * @param {Object} response - It is Response object
 */
export const updateCurrencyExchange = (request, response) => {
	logger.info('updateCurrencyExchange() called');
	let currencyNotify = new CurrencyNotify(request.body);
	let auto_exchange_id = request.body.auto_exchange_id;
	let status = STATUS.ACTIVE;
	if(currencyNotify.amount =="" || currencyNotify.amount =='undefined' || currencyNotify.target_amount == '' || currencyNotify.target_amount == 'undefined') {
		return response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.currency.fail2, STATUS.FAILURE));
	}
	if(auto_exchange_id) {
		currencyNotify.checkExchangeInfo(auto_exchange_id,status).then(results => {
			if(results.length > 0) {
				currencyNotify.updateCurrencyExchange(currencyNotify.amount, currencyNotify.target_amount,currencyNotify.from_currency,currencyNotify.to_currency, status, auto_exchange_id,timeStamp).then(data => {
					if (data.affectedRows > 0) {
						logger.info(' data updated  successfully');
						response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.payment.update_success, STATUS.SUCCESS));
					}
					else {
						logger.debug(' no records found with auto_exchange_id ')
						response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.payment.update_fail, STATUS.FAILURE));
					}
				}).catch(err => {
					logger.error("error while update the data")
					response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)))
				})
			} else {
				logger.info("invalid request data");
				return response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.currency.fail2, STATUS.FAILURE));	
			}
		})

	} else {
		return response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.currency.fail2, STATUS.FAILURE));
	}

	
}

/**
 * Method for it will given total currency exchange amount based upon currencies 
 * @method  getExchangeAmount
 * @param {Object} request - It is Request object
 * @param {Object} response - It is Response object
 */
export const getExchangeAmount = (request, response) => {
	logger.info("getExchangeAmount() initiated");
	let to_currency = _.toUpper(request.params.to); let from_currency = _.toUpper(request.params.from);
	let amount = request.params.amount;
	currencyExchange(from_currency, to_currency, null).then(function (value) {
		logger.info("currencyExchange() called");
		if (value.status > 0) {
			logger.info("get the results successfully");
			let totalAmount = value.rate * amount;
			logger.info("response send");
			response.send(ResponseHelper.buildSuccessResponse({ amount: totalAmount }, langEngConfig.message.payment.exchangeSuccessMsg, STATUS.SUCCESS));
		} else {
			logger.debug("unable to get the results");
			logger.info("response send");
			response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.payment.exchangeFailMsg, STATUS.FAILURE));
		}
	}).catch(err => {
		logger.error("error while getting currency rates value" + err)
		response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
	});
}

