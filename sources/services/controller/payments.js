
import { Payment } from '../model/payment';
import { langEngConfig } from '../utility/lang_eng';

const payment = new Payment();

const STATUS = {
  FAILED: 1,
  SUCCESS: 0,
  VALID: 2,
  UN_AUTHORIZED: 403,
  SUCCESS_PAYMENT: '0001',
  DEFAULT_CVV: '123',
  PAYMENT_SUCCESS: '00001'
};


class ValidatePaymentData {
  constructor(paymentRequest) {
    this.amount = paymentRequest.body.amount;
    this.account_number = paymentRequest.body.account_number;
    this.orderDescriptor = paymentRequest.body.orderDescriptor;
    this.applicant_id = paymentRequest.params.applicant_id;
    this.payment_cards_id = paymentRequest.body.payment_cards_id;
    this.card_cvv = paymentRequest.body.card_cvv;
    this.currency = paymentRequest.body.currency;
  }
	/**
	 * @function isValidPaymentRequest
	 * @desc this function is to validate payment information
	 * @param None
	 * @return True if request is valid paymentObject. False if request is invalid
	 */
  isValidPaymentRequest() {
    if (this.amount && this.account_number && this.orderDescriptor && this.applicant_id && this.payment_cards_id && this.card_cvv) {
      return true;
    }
    return false;
  }
}

/**
 * @desc This function is used to make payment to add money in users currency accounts
 * @method addMoney 
 * @param {Object}  request - It is Request object
 * @param {Object}  response - It is Response object
 */

export const addMoney = function (request, response) {
  logger.info('initialize addMoney()');
  const validatePaymentData = new ValidatePaymentData(request);
  if (!validatePaymentData.isValidPaymentRequest()) {
    logger.error('Payment details not valid ');
    return response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.payment.invalidInput, STATUS.FAILED));
  }
  logger.info('Proceed for _fetchUserKycDetails()');
  return _makeTransfer(validatePaymentData, request, response);
}


/**
 * @desc This function is used to fetching kyc related information based on the applicantId
 * @method _makeTransfer 
 * @param {Object}  paymentReqObj - It is holds payment related information to make valid payment
 * @param {Object}  req - It is Request object
 * @param {Object}  res - It is Response object
 */

const _makeTransfer = (paymentReqObj, req, res) => {
  logger.info('Initiated add walet _makeTransfer()');
  payment.getUserCardDetails(paymentReqObj.applicant_id, paymentReqObj.payment_cards_id, paymentReqObj.account_number).then(results => {
    if (results.length > 0 && paymentReqObj.card_cvv == STATUS.DEFAULT_CVV) {
      logger.info('Successfully fetched getUserCardDetails()');
      let userInfo = prepareUserData(results[0], paymentReqObj.card_cvv);
      userInfo.payments.ip = ip.address();
      let inputCurrency = (paymentReqObj.currency) ? paymentReqObj.currency : 'EUR';
      accountToCardValue(inputCurrency, req.body.amount).then(results => {
        logger.info('Converting account currency to card default currency');
        if (results.status == 1) {
          logger.info('Convertion done successfully');
          let cardAmount = results.amount;
          let paymentAmount = paymentReqObj.amount;
          let account_number = paymentReqObj.account_number;
          let transactionHolderName = `${userInfo.payments.givenName ? userInfo.payments.givenName : ""} ${userInfo.payments.surname ? userInfo.payments.surname : ""}`;
          userInfo.payments.amount = parseFloat(cardAmount).toFixed(2);  //card 
          userInfo.payments.orderDescriptor = paymentReqObj.orderDescriptor;
          userInfo.payments.tmpl_amount = parseFloat(cardAmount).toFixed(2); // card amount
          requestForPayments(userInfo, req).then(function (res1) {
            logger.info('Initiate request for make payment to museService');
            if (res1 && res1.body.status && res1.body.data.status == 1) {
              let responseObj = preparePaymentsResponse(paymentReqObj.applicant_id, res1.body.data.data);
              if (!isNaN(responseObj.paymentId)) {
                payment.insertPayment(responseObj).then(results => {
                  logger.info('insertPayment() details done successfully');
                  if (results.status == 1) {
                    results.transactionInfo = JSON.parse(responseObj.result)
                    results.payStatus = 'fail';
                    if (results.transactionInfo.code == STATUS.PAYMENT_SUCCESS) {
                      logger.info('Transaction done successfully');
                      let paymentReference = JSON.parse(responseObj.transaction_details)
                      payment.updateAccountDetails(paymentReqObj.applicant_id, account_number, 'USD', 2, paymentReference, paymentAmount).then(responseData => {
                        logger.info('Updated account details successfully');
                        payment.insertTransactionDetails(responseData.paymentObject.paymentsid, responseData.paymentObject.applicant_id, transactionHolderName, account_number, paymentAmount, inputCurrency, JSON.parse(responseObj.transaction_details)).then(transactions => {
                          logger.info('Transaction details captured successfully');

                          if (responseData.status == 1 && transactions.status == 1) {
                            results.status = STATUS.SUCCESS;
                            results.message = transactions.message;
                            results.payStatus = 'success';
                            res.send(ResponseHelper.buildSuccessResponse(results,/* langEngConfig.message.payment.successPayment */results.message, STATUS.SUCCESS))
                          }
                          else {
                            logger.debug('Transaction details captured failure');
                            results.status = STATUS.FAILED;
                            results.payStatus = 'fail';
                            results.message = 'Fail to capture walet amount / transation status';
                          }
                        }).catch(r => {
                          logger.error('Some thing went wrong , While inserting transation details');
                          res.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.payment.transactionFailInsert)))
                        });
                      }).catch(r => {
                        logger.error('Some thing went wrong , While updating account details');
                        res.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.payment.updateAccountFail)))
                      })
                    } else {
                      logger.debug('Not a successfull transation');
                      res.send(ResponseHelper.buildSuccessResponse(results, langEngConfig.message.payment.failurePayment, STATUS.FAILED))
                    }
                  }
                  else {
                    logger.error(`Some thing went wrong , ${results.message}`);
                    res.send(ResponseHelper.buildSuccessResponse({}, `${results.message}`, STATUS.FAILED))
                  }
                }).catch(err => {
                  logger.error(`Some thing went wrong , While inserting payments details`);
                  res.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.payment.paymentInsertFail)))
                });
              }
              else {
                let data = {}
                data.status = STATUS.FAILED;
                data.payStatus = 'fail';
                data.message = 'Payment failure'
                data.transactionInfo = JSON.parse(responseObj.result);
                data.payStatus = 'fail';
                logger.error(`Some thing went wrong ,Payment Failure`);
                res.send(ResponseHelper.buildSuccessResponse(data, langEngConfig.message.payment.errorPayment, STATUS.FAILED))
              }
            } else {
              if (res1 && res1.body.status == STATUS.UN_AUTHORIZED) {
                logger.error(`un-authorized access failure`);
                res.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.payment.authError, STATUS.FAILED))
              }
              else {
                if (res1.body && res1.body.message.message && res1.body.message.status == STATUS.SUCCESS) {
                  //res.send(ResponseHelper.buildFailureResponse(response.body.message.message));
                  // res.send(ResponseHelper.buildFailureResponse(res1.body.message));
                  res.send(ResponseHelper.buildSuccessResponse(
                    res1.body
                    , langEngConfig.message.token.tokenExpired, STATUS.VALID));
                } else {
                  if (res1.body.status == 0) {
                    logger.error(`${res1.body.message}`);
                    res.send(ResponseHelper.buildSuccessResponse({}, res1.body.message, STATUS.FAILED))
                  }
                  else {
                    logger.error(`please provide header is mandatory`);
                    res.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.payment.headerError, STATUS.FAILED))
                  }
                }
              }
            }
          }).catch(err => {
            logger.error('Some thing went wrong , service side ');
            res.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.payment.internalError)))
          })

        }
      }).catch(err => {
        logger.error('Some thing went wrong , Fail while currency convert');
        res.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.payment.currencyConverterError)))
      })
    }
    else {
      if (paymentReqObj.card_cvv != STATUS.DEFAULT_CVV) {
        logger.error('Invalid cvv');
        res.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.payment.cvv_fail, STATUS.FAILED))
      } else {
        logger.error('No data found with details');
        res.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.payment.noDataError, STATUS.FAILED))
      }
    }
  }).catch(err => {
    logger.error('Some thing went wrong , fetching user card details');
    res.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.payment.card_fail)))
  })
}



/* Prepare for payment response to addMoney functionality */
function preparePaymentsResponse(applicant_id, paymentsResponse) {
  let paymentsInfo = {};
  paymentsInfo.applicant_id = parseInt(applicant_id)
  paymentsInfo.paymentId = (typeof paymentsResponse.paymentId === "undefined") ? "" : parseInt(paymentsResponse.paymentId)
  paymentsInfo.status = (typeof paymentsResponse.status === "undefined") ? "" : paymentsResponse.status
  paymentsInfo.paymentBrand = (typeof paymentsResponse.paymentBrand === "undefined") ? "" : paymentsResponse.paymentBrand
  paymentsInfo.paymentMode = (typeof paymentsResponse.paymentMode === "undefined") ? "" : paymentsResponse.paymentMode
  paymentsInfo.firstName = (typeof paymentsResponse.firstName === "undefined") ? "" : paymentsResponse.firstName
  paymentsInfo.lastName = (typeof paymentsResponse.lastName === "undefined") ? "" : paymentsResponse.lastName
  paymentsInfo.amount = (typeof paymentsResponse.amount === "undefined") ? "" : parseFloat(paymentsResponse.amount)
  paymentsInfo.currency = (typeof paymentsResponse.currency === "undefined") ? "" : paymentsResponse.currency
  paymentsInfo.descriptor = (typeof paymentsResponse.descriptor === "undefined") ? "" : paymentsResponse.descriptor
  paymentsInfo.result = (typeof paymentsResponse.result === "undefined") ? "" : JSON.stringify(paymentsResponse.result)
  paymentsInfo.card = (typeof paymentsResponse.card === "undefined") ? "" : JSON.stringify(paymentsResponse.card)
  paymentsInfo.customer = (typeof paymentsResponse.customer === "undefined") ? "" : JSON.stringify(paymentsResponse.customer)
  paymentsInfo.transaction_details = (typeof paymentsResponse === "undefined") ? "" : JSON.stringify(paymentsResponse)
  paymentsInfo.timestamp = (typeof paymentsResponse.timestamp === "undefined") ? "" : paymentsResponse.timestamp
  paymentsInfo.merchantTransactionId = (typeof paymentsResponse.merchantTransactionId === "undefined") ? "" : paymentsResponse.merchantTransactionId
  paymentsInfo.remark = (typeof paymentsResponse.remark === "undefined") ? "" : paymentsResponse.remark
  paymentsInfo.transactionStatus = (typeof paymentsResponse.transactionStatus === "undefined") ? "" : paymentsResponse.transactionStatus
  paymentsInfo.tmpl_amount = (typeof paymentsResponse.tmpl_amount === "undefined") ? "" : paymentsResponse.tmpl_amount
  paymentsInfo.tmpl_currency = (typeof paymentsResponse.tmpl_currency === "undefined") ? "" : paymentsResponse.tmpl_currency
  paymentsInfo.eci = (typeof paymentsResponse.eci === "undefined") ? "" : paymentsResponse.eci
  paymentsInfo.checksum = (typeof paymentsResponse.checksum === "undefined") ? "" : paymentsResponse.checksum
  paymentsInfo.orderDescription = (typeof paymentsResponse.orderDescription === "undefined") ? "" : paymentsResponse.orderDescription
  paymentsInfo.companyName = (typeof paymentsResponse.companyName === "undefined") ? "" : paymentsResponse.companyName
  paymentsInfo.merchantContact = (typeof paymentsResponse.merchantContact === "undefined") ? "" : paymentsResponse.merchantContact
  return paymentsInfo;
}


/**
 * @desc This function is used to make request for make payments with user details
 * @method requestForPayments 
 * @param {Object} userInfo - userInfo is object used to make payment in museServer 
 * @param {Object} req - It is request object 
 * 
 */

var requestForPayments = function (userInfo, req) {
  return new Promise((resolve, reject) => {
    request({
      method: 'post',
      headers: { "accept": "application/json", "authorization": req.headers["authorization"], "member_id": req.headers["member_id"], "api_access_key": req.headers["api_access_key"], "client_auth": req.headers["client_auth"] },
      url: `http://${process.env.GATEWAY_URL}:${process.env.GATEWAY_PORT}/payment_paymentz/paymentz`,
      body: userInfo,
      json: true,
    }, function (err, res1) {
      if (res1) {
        resolve(res1)
      } else {
        reject(err)
      }
    })
  });
}


/**
 * @desc This function will work for convert user account money value to card default currency
 * @method accountToCardValue 
 * @param {String} target - It is referce to account holders currency  
 * @param {String} amount - It is reference for amount
 * 
 */

var accountToCardValue = function (target, amount) {
  return new Promise((resolve, reject) => {
    fixer.convert('USD', target, amount).then(function (list) {
      if (list.success)
        resolve({ amount: list.result, status: 1 })
      else
        reject({ amount: 0, status: 1 })
    }, (err) => {
      reject({ message: err, status: 0 })
    })
  })
}

function prepareUserData(paymentObj, card_cvv) {

  let birthDate = (paymentObj.dob)//.toISOString().slice(0, 10);
  return {
    "payments": {

      "currency": paymentObj.currency,
      "country": paymentObj.country_name,
      "city": paymentObj.city,
      "state": paymentObj.region,
      "street1": paymentObj.address_line1,
      "phone": paymentObj.mobile,
      "email": paymentObj.email,
      "givenName": paymentObj.first_name,
      "surname": paymentObj.last_name,
      "telnocc": paymentObj.telnocc,
      "postcode": paymentObj.postal_code,
      "birthDate": birthDate.split('-').join(''),
      "number": paymentObj.card_number,
      "expiryMonth": paymentObj.card_month,
      "expiryYear": paymentObj.card_year,
      "cvv": card_cvv,//paymentObj.card_cvv,
      "paymentBrand": paymentObj.name_on_card,
      "paymentMode": "CC",
      "paymentType": "DB",//paymentObj.card_type,
      "tmpl_currency": paymentObj.currency,
      "recurringType": "",
      "createRegistration": "true",
      //"customerId": paymentObj.applicant_id
    }
  }
}
