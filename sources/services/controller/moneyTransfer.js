/**
 * moneyTransfer
 * This controller contains all the method required to perform a successfull money transfer from one
 * currency account to another currency account for both individual user as weel as with in two 
 * different users.
 * @package moneyTransfer
 * @subpackage controller/moneyTransfer
 * @author SEPA Cyber Technologies Sekhara Suman Sahu
 */
import {
  MoneyTransfer
} from '../model/moneyTransfer';
import {
  ScheduleTransfer
} from '../model/scheduleTransfer';
import {
  langEngConfig
} from '../utility/lang_eng';
import {
  Utils
} from '../utility/utils';
import {
  DbConnMgr,
  mariadb
} from '../dbconfig/dbconfig';
import {
  currencyExchange
} from '../controller/commonCode';

let scheduleTrans = new ScheduleTransfer();


let format = require('string-format');

const db = DbConnMgr.getInstance();
let utils = new Utils();

const STATUS = {
  SUCCESS: 0,
  FAILURE: 1
}

const TRANSTYPE = {
  DEBIT: 'DB',
  CREDIT: "CR"
}

const ACCOUNT_TYPE = {
  WALLET: 'WALLET',
  BANK_ACCOUNT: 'BANK_ACCOUNT'
}

/**
 * @desc method is to perform money transfer form one account to another account 
 * @method AccountTransfer
 * @param {object} request -- it is Request object
 * @param {object} response --it is Response object
 * @return returns status message and status code
 **/

export const moneyTransfer = (request, response) => {
  logger.info('walletToWalletTransferInfo() called');
  let senderId = request.params.applicant_id;
  let debitCurrency = request.body.from_currency;
  let creditCurrency = request.body.to_currency;
  let deductAmt = request.body.amount;
  let receipientMobile = request.body.to_mobile;

  __walletToWalletTransfer(senderId, debitCurrency, creditCurrency, deductAmt, receipientMobile, request.body)
    .then(transferRes => {
      logger.info('walletToWalletTransferInfo() execution completed');
      response.send(transferRes);
    })
}

const __walletToWalletTransfer = async (senderId, debitCurrency, creditCurrency, deductAmt, receipientMobile, body) => {
  logger.info('walletToWalletTransfer() initiated');
  let newTransferReq = new MoneyTransfer(body);
  let fromApplicantId = senderId;
  let fromCurrency = debitCurrency;
  let toCurrency = creditCurrency;
  let fromAmount = deductAmt;
  let receiverMobile = receipientMobile;
  let transactionId = utils.generateTransNum();

  try {
    logger.info('isValidMoneyTransferRequest() called');
    //Checking the money tranfer request is valid or not.
    const isValidReq = await utils.isValidMoneyTransferRequest(newTransferReq);
    if (isValidReq.status) {
      //Get the account number from which amount will be deduct.
      logger.info('getFromCurrencyAccountno() called');
      let fromCurrencyRes = await newTransferReq.getFromCurrencyAccountno(fromCurrency, fromApplicantId);

      if (fromCurrencyRes.length > 0) {
        let from_account = fromCurrencyRes[0].account_no;
        logger.info('__getRecipientCurrencyAccount() called');
        //Get the account number to which amount will be credit.
        let accountNoRes = await __getRecipientCurrencyAccount(receiverMobile, toCurrency, newTransferReq);
        //If receipient account found
        if (accountNoRes.account_no) {
          let to_account = accountNoRes.account_no;
          let toApplicantid = accountNoRes.applicant_id;
          logger.info('checkMunimumBalance() called');
          //Checking minimum balance before deducting 
          let minimumBal = await __checkminimumBalance(from_account, fromAmount, newTransferReq);
          //IF sender has the sufficient balance
          if (minimumBal.status == 0) {
            logger.info('__getExchangeAmount() called');
            //Get the respective exchange rate of from ammount
            let exchangeRateRes = await __getExchangeAmount(fromCurrency, toCurrency, fromAmount);
            let toAmount = exchangeRateRes.exchangeAmount;
            //Account balance after deduction of money from senders account
            let deductAmnt = minimumBal.balance - newTransferReq.amount;
            //Get a single connection object from connection pool to perform 
            let conn = await db.getConnObject();
            //If we get a conn object
            if (conn) {
              //Begin the transaction
              await conn.beginTransaction();
              logger.info('__deductAmount() called');
              //Money deduction from senders account
              let deductRes = await __deductAmount(from_account, to_account, fromApplicantId, fromAmount, toAmount, deductAmnt, transactionId, newTransferReq, conn);
              //If money deducted successfully
              if (deductRes.status == 0) {
                logger.info('__addbalance() called');
                let addbalRes = await __addbalance(from_account, to_account, toApplicantid, fromAmount, toAmount, transactionId, newTransferReq, conn);
                //If money added successfully
                if (addbalRes.status == 0) {
                  //commit the transaction and release the conn object
                  conn.commit();
                  conn.release();
                  return ResponseHelper.buildSuccessResponse({}, langEngConfig.message.payment.trans_success, STATUS.SUCCESS);
                } else {
                  //If money did not added into receipient account roolback the transaction
                  conn.rollback();
                  conn.release();
                  return ResponseHelper.buildFailureResponse(langEngConfig.message.payment.trans_failed);
                }
              } else {
                return ResponseHelper.buildSuccessResponse({}, langEngConfig.message.payment.amount_deduction_fail, STATUS.FAILURE);
              }
            } else {
              return ResponseHelper.buildSuccessResponse({}, langEngConfig.message.moneyTransfer.errorConnObj, STATUS.FAILURE);
            }

          } else {
            return ResponseHelper.buildSuccessResponse({}, langEngConfig.message.payment.insufficient_balance, STATUS.FAILURE);
          }
        } else {
          return ResponseHelper.buildSuccessResponse({}, langEngConfig.message.moneyTransfer.no_account_found, STATUS.FAILURE);
        }
      } else {
        return ResponseHelper.buildSuccessResponse({}, langEngConfig.message.moneyTransfer.senderCurrenyAccNotFound, STATUS.FAILURE);
      }

    } else {
      return ResponseHelper.buildSuccessResponse({
        isValidReq
      }, langEngConfig.message.moneyTransfer.req_objerr, STATUS.FAILURE);
    }
  } catch (err) {
    logger.error('Error occured ' + err);
    return ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler));
  }
}

/**
 * @desc Method for checking account balance before performing money transfer 
 * @method checkMunimumBalance
 * @param {number} accountNo -- it is Request object
 * @param {number} amount --it is Response object
 * @param {number} newTransfer --it is newTransfer object
 * @return returns status message and status code
 **/
const __checkminimumBalance = async (accountNo, amount, newTransfer) => {
  try {
    logger.info('checkMinimumBalance() called');
    let result = await newTransfer.checkMinimumBalance(accountNo);
    if (amount > result[0].balance || result[0].status == 0) {
      if (result[0].status == 0) {
        logger.info('account_deactive() executed');
        return ({
          status: STATUS.FAILURE,
          message: `${accountNo}` + langEngConfig.message.payment.account_deactive
        });
      } else {
        logger.info('insufficient_balance() executed');

        return ({
          message: langEngConfig.message.payment.insufficient_balance,
          status: STATUS.FAILURE
        });
      }
    } else {
      logger.info('enough_balance() executed');

      return ({
        message: langEngConfig.message.payment.enough_balance,
        balance: result[0].balance,
        status: STATUS.SUCCESS
      })
    }

  } catch (err) {
    logger.error('Error occured ' + err);
    return (new Error(langEngConfig.message.error.ErrorHandler));

  }

}

/**
 * @desc Method for deducting balance from account
 * @method deductAmount
 * @param {number} fromAccount -- it is from Account 
 * @param {number} deductBalance --it is deduct Balance 
 * @param {number} transactionId --it is transaction id 
 * @param {object} newTransfer --it is newTransfer object
 * @param {object} conn --it is connection object
 * @return returns status message and status code
 **/
const __deductAmount = async (fromAccount, toAccount, applicantId, amount, toAmount, deductBalance, transactionId, newTransfer, conn) => {
  try {
    let result = await newTransfer.deductAmnt(fromAccount, deductBalance, conn)
    if (result != 0) {
      //creating the debit transaction record.
      await __createTransaction(newTransfer, fromAccount, toAccount, applicantId, amount, toAmount, TRANSTYPE.DEBIT, transactionId, false, conn)
      return ({
        message: langEngConfig.message.payment.amount_deduction_success,
        status: STATUS.SUCCESS
      })

    } else {
      conn.rollback();
      conn.release();
      return ({
        message: langEngConfig.message.payment.amount_deduction_fail,
        status: STATUS.FAILURE
      });
    }
  } catch (err) {
    logger.error('Error occured ' + err);
    return (new Error(langEngConfig.message.error.ErrorHandler));

  }
}

/**
 * @desc Method for adding money in receipient account
 * @method addbalance
 * @param {number} toAmnt -- it is to amount 
 * @param {number} toAccount --it is to account 
 * @param {number} transactionId --it is transaction id 
 * @param {object} newTransfer --it is newTransfer object
 * @param {object} conn --it is conn object
 * @return returns status message and status code
 **/
const __addbalance = async (fromAccount, toAccount, applicantId, amount, toAmount, transactionId, newTransfer, conn) => {
  try {
    let addAmntRes = await newTransfer.addAmnt(toAmount, toAccount, conn)
    if (addAmntRes) {
      await __createTransaction(newTransfer, fromAccount, toAccount, applicantId, amount, toAmount, TRANSTYPE.CREDIT, transactionId, true, conn)
      return ({
        message: langEngConfig.message.payment.amount_addition_success,
        status: STATUS.SUCCESS
      });
    }

  } catch (err) {
    conn.rollback();
    conn.release();
    logger.error('Error occured ' + err);
    return (new Error(langEngConfig.message.error.ErrorHandler));

  }

}

/**
 * @desc Method for getting receiver's applicant_id by mobile number
 * @method getRecipientApplicantId
 * @param {mobileNo}  - it mobile number of receipient.
 * @param {newTransferReq} - Money transfer object.
 * @return returns applicant id
 **/
const __getExchangeAmount = async (fromCurrency, toCurrency, amount) => {
  try {
    logger.info('getExchangeAmount() initiated');
    let exchangeRes = await currencyExchange(fromCurrency, toCurrency, null)
    let exchangedAmount = (exchangeRes.rate * amount).toFixed(2);
    return ({
      exchangeAmount: exchangedAmount
    });
  } catch (err) {
    logger.error('Error occured ' + err);
    return (new Error(langEngConfig.message.error.ErrorHandler));
  }
}

/**
 * @desc Method for getting receiver's applicant_id
 * @method getRecipientCurrencyAccount
 * @param {receipientApplicantId} - it is the applicant id of receipient.
 * @param {toCurrency} - it is the to currency account of receipient.
 * @return returns applicant id
 **/

const __getRecipientCurrencyAccount = async (toMobile, toCurrency, newTransferReq) => {
  try {
    logger.info('getRecipientCurrencyAccount() initiated');
    let currencyAccount = await newTransferReq.getRecipientCurrencyAccount(toMobile, toCurrency)
    logger.info('getRecipientCurrencyAccount() execution completed.');
    return ({
      account_no: currencyAccount[0].account_no,
      applicant_id: currencyAccount[0].applicant_id
    });
  } catch (err) {
    logger.error('Error occured ' + err);
    return (new Error(langEngConfig.message.error.ErrorHandler))
  }

}

/**
 * @desc Method for creting an account to account transfer transaction record
 * @method createTransaction
 * @param {object} newTransfer - it is newTransfer object
 * @param {string} transType - it is transaction type 
 * @param {number} transactionNumber - it is transaction Number
 * @param {object} newTransfer - it is newTransfer object
 * @param {number} flag - it is flag
 * @param {object} conn - it is connection object
 * @return returns status message and status code
 **/
const __createTransaction = async (newTransfer, fromAccount, toAccount, applicantId, amount, toAmount, transType, transactionNumber, flag, conn) => {
  //transaction number.
  let transnum = transactionNumber;
  let account = 0;
  let transAmount = 0;
  try {
    transType == 'DB' ? account = fromAccount : account = toAccount;
    //getting the full name
    let fullnameRes = await __getFullName(account, newTransfer)

    let fullname = fullnameRes.full_name;
    let currency = fullnameRes.currency;
    let timestamp = utils.getCurrentTimeStamp();
    let transtype = transType;
    let transApplicantId = applicantId;
    (flag) ? transAmount = toAmount: transAmount = amount;
    //inserting the transaction record
    let transRes = await newTransfer.insertTransaction(transApplicantId, transnum, transtype, fromAccount, toAccount, currency, fullname, ACCOUNT_TYPE.WALLET, transAmount, timestamp, conn)
    if (transRes != 0) {
      return ({
        message: langEngConfig.message.payment.trans_record_succ,
        status: STATUS.SUCCESS
      });
    } else {
      //Rollback the transaction and enable the auto commit in failure case
      conn.rollback();
      conn.release();
      return ({
        message: langEngConfig.message.payment.trans_record_fail,
        status: STATUS.FAILURE
      });
    }
  } catch (err) {
    logger.error('Error occured ' + err);
    conn.rollback();
    conn.release();
    return (new Error({
      message: langEngConfig.message.payment.trans_record_fail,
      status: STATUS.FAILURE
    }))

  }
}

/**
 * @desc Method for getting full name by using account no
 * @method getFullName
 * @param {number} accountNo - it is account number
 * @param {object} newTransfer - it is newTransfer object
 * @return returns full name by using account number
 **/
const __getFullName = async (accountNo, newTransfer) => {
  try {
    let result = await newTransfer.getFullName(accountNo)
    return ({
      message: langEngConfig.message.payment.fullname_success,
      full_name: result[0].first_name + ' ' + result[0].last_name,
      currency: result[0].currency,
      status: STATUS.SUCCESS
    })
  } catch (err) {
    return (new Error({
      err: `Error occured: ${err}`,
      status: STATUS.FAILURE
    }))
  }
}

export const transactionDetails = (request, response) => {
  logger.info('transactionDetailsInfo() called');
  __transactionDetails(request, response).then(transactionResult => {
    logger.info('transactionDetailsInfo() execution completed');
    return transactionResult;
  })
}

const __transactionDetails = async (request, response) => {
  let newTransfer = new MoneyTransfer(request.params);
  let applicant_id = newTransfer.applicant_id;
  let currency = newTransfer.currency_type;
  try {
    if (_.toLower(currency) == "all") {
      let res = await newTransfer.getTransactionDetails(applicant_id)

      if (res != 0) {
        if (_.toLower(newTransfer.device_type) == "web") {
          let list = await __createResponse(res)
          response.send(ResponseHelper.buildSuccessResponse({
            transaction_details: list
          }, langEngConfig.message.payment.transaction_detail_fetch_success, STATUS.SUCCESS));

        } else {
          response.send(ResponseHelper.buildSuccessResponse({
            transaction_details: res
          }, langEngConfig.message.payment.transaction_detail_fetch_success, STATUS.SUCCESS));

        }
      } else {
        response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.payment.transaction_detail_fetch_error, STATUS.FAILURE));
      }

    } else {
      let results = await newTransfer.getFromCurrencyAccountno(currency, applicant_id)
      if (results.length > 0) {
        let accountNo = results[0].account_no;
        let res = await newTransfer.transactionDetailsByAccount(accountNo)
        if (res != 0) {
          if (_.toLower(newTransfer.device_type) == "web") {
            let list = await __createResponse(res)
            response.send(ResponseHelper.buildSuccessResponse({
              transaction_details: list
            }, langEngConfig.message.payment.transaction_detail_fetch_success, STATUS.SUCCESS));


          } else {
            response.send(ResponseHelper.buildSuccessResponse({
              transaction_details: res
            }, langEngConfig.message.payment.transaction_detail_fetch_success, STATUS.SUCCESS));

          }
        } else {
          response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.payment.transaction_detail_fetch_error, STATUS.FAILURE));
        }

      } else {
        response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.payment.transaction_detail_fetch_error, STATUS.FAILURE));
      }
    }
  } catch (err) {
    response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));

  }
}

const __createResponse = async (res) => {
  try {
    var i = 0;
    _.forEach(res, function (row) {
      i++
      //row.created_on = dateFormat(row.created_on, 'dd-mm-yyyy')
      row["created_on_with_time"] = dateFormat(row.created_on, "hh:mm:ss")
      row.created_on = dateFormat(row.created_on, 'dd-mm-yyyy')
    })
    if (_.size(res) == i) {
      var array = []
      var y = 0
      _.forEach(_.uniqBy(res, 'created_on'), function (rowData) {
        y++
        var obj = {}
        obj["created_on"] = rowData.created_on;
        obj.data = _.filter(res, {
          created_on: rowData.created_on
        });
        array.push(obj);
      })
      if (_.size(_.uniqBy(res, 'created_on')) == y) {
        return (array)
      }
    }
  } catch (err) {
    logger.error('Error occured ' + err);
    return (new Error(langEngConfig.message.error.ErrorHandler))
  }
}

//Method for getting webtransaction details
export const getWebTransaction = (request, response) => {
  logger.info('getWebTransaction() initiated');
  __getWebTransDetails(request, response).then(webTrans => {
    logger.info('getWebTransaction() execution completed');
    return webTrans;
  })
}

const __getWebTransDetails = async (request, response) => {
  let transModel = new MoneyTransfer(request.params);
  let applicantID = transModel.applicant_id;
  let currentDate = utils.getCurrentTimeStamp();

  let fromDate = request.body.from_date;
  let curreny = request.body.currency_type;

  let rangeDate = '';

  //If fromdate is not empty initialize with that day
  if (fromDate != 'undefiend' && fromDate != '' && fromDate != null) {
    rangeDate = fromDate + ' 00:00:01';
  } else {
    //If empty initialize with one month back date
    rangeDate = dateFormat(new Date() - 2592000000, 'yyyy-mm-dd hh:MM:ss');
  }



  //If currency is empty get transaction of all accounts.
  if (curreny == 'undefiend' || curreny == '' || curreny == null) {
    try {
      logger.info('getWebTransactionDetails() called');
      let transRes = await transModel.getWebTransactionDetails(applicantID, rangeDate, currentDate);

      if (transRes.length > 0) {
        //Create the transaction records in perticular order
        let tranDetailRes = await __createResponse(transRes);
        response.send(ResponseHelper.buildSuccessResponse({
          transaction_details: tranDetailRes
        }, langEngConfig.message.payment.transaction_detail_fetch_success, STATUS.SUCCESS));
      } else {
        response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.payment.transaction_detail_fetch_error, STATUS.FAILURE));
      }
    } catch (err) {
      logger.error('Error occured : ' + err);
      response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
    }
  } else {
    //Else give a perticular account data
    try {
      //GET the currency account number
      logger.info('getFromCurrencyAccountno() called');
      let accountRes = await transModel.getFromCurrencyAccountno(curreny, applicantID);
      if (accountRes.length > 0) {
        let currency_account = accountRes[0].account_no;

        let webTransByAcc = await transModel.getWebTransByAccount(currency_account, rangeDate, currentDate);

        if (webTransByAcc.length > 0) {
          //Create the transaction records in perticular order
          let webAccRes = await __createResponse(webTransByAcc);
          response.send(ResponseHelper.buildSuccessResponse({
            transaction_details: webAccRes
          }, langEngConfig.message.payment.transaction_detail_fetch_success, STATUS.SUCCESS));
        } else {
          response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.payment.transaction_detail_fetch_error, STATUS.FAILURE));
        }
      } else {
        response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.moneyTransfer.no_account_found, STATUS.FAILURE));
      }
    } catch (err) {
      logger.error('Error occured : ' + err);
      response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
    }
  }

}

//Method to support bulk tranfer request
export const walletPayments = async (request, response) => {
  let applicantId = request.params.applicant_id;
  let fromCurrency = request.body.from_currency;
  //let totalAmt = request.body.total_amount;
  let transferTime = request.body.transfer_time;
  let transactions = request.body.transaction_list;
  let doNotify = request.body.do_notify;
  let description = request.body.description;
  let timeZone = request.body.time_zone;

  __bulkTransfer(applicantId, fromCurrency, transferTime, transactions, doNotify, description, timeZone)
    .then(bulkTransRes => {
      response.send(bulkTransRes);
    })
}

//Method to perform both real time and sceduled bulk transfer.
const __bulkTransfer = async (senderId, senderCurrency, sceduleTime, arrayOfTrans, notify, desc, timeZone) => {
  let applicantId = senderId;
  let fromCurrency = senderCurrency;
  //let totalAmt = sumAmt;
  let transferTime = sceduleTime;
  let transactions = arrayOfTrans;
  let doNotify = notify;
  let description = desc;
  let timezone = timeZone;

  let no_of_succ_trans = 0;
  let no_of_failure_trans = 0;
  let array_of_succ_trans = [];
  let array_of_fail_trans = [];

  let totalTrans = transactions.length;
  let currentTime = utils.getCurrentTimeStamp();


  // console.log(format(transferTime,'UTC:yyyy-mm-ddTHH:MM:ssZ'));

  // console.log(transferTime);
  // console.log(currentTime);
  // try {
  //   let trsnTime = Date.parse('2019-11-28T10:31:01.000Z');
  //   let nowTime = Date.parse(currentTime);
  // } catch (err) {
  //   console.log(err);
  // }

  //If array_of_transaction is invalid return error.
  if (totalTrans == 0 || totalTrans == '' || totalTrans == 'undefined' || totalTrans == null) {
    return ResponseHelper.buildSuccessResponse({}, langEngConfig.message.bulkTransfer.invalidTransArray, STATUS.FAILURE);
  }

  //If transfer time is null or empaty or undefined or past time. Execute the bulk transfer.
  if (transferTime == null || transferTime == '' || transferTime == 'undefined') {
    //Create a unique refference id for bulk transfer
    let bulkTransId = await utils.getBulkTransId();
    //Iterate each transfer object
    for (let i = 0; i < totalTrans; i++) {
      //Check for valid request
      let isValid = await utils.isValidMoneyTransferRequest(transactions[i]);
      //If its a valid transfer request
      if (isValid.status) {

        let debitCurrency = transactions[i].from_currency;
        let creditCurrency = transactions[i].to_currency;
        let deductAmt = transactions[i].amount;
        let receipientMobile = transactions[i].to_mobile;

        //Check wheather the receipient is added as counterparty by the sender or not
        //let isCounterparty = await scheduleTrans.isAddedCounterParty(applicantId, receipientMobile);

        //if (isCounterparty.length == 0) {
        if (false) {
          //return ResponseHelper.buildSuccessResponse({}, langEngConfig.message.bulkTransfer.countryPartyNotAdded, STATUS.FAILURE);
          no_of_failure_trans++;
          let FailTrans = {
            index: i,
            TransReq: transactions[i],
            TransRes: {
              status: STATUS.FAILURE,
              message: langEngConfig.message.bulkTransfer.countryPartyNotAdded
            }
          }
          array_of_fail_trans.push(FailTrans);
        } else {

          let bulkTransRes = await __walletToWalletTransfer(applicantId, debitCurrency, creditCurrency, deductAmt, receipientMobile, transactions[i]);

          if (bulkTransRes.data.status == 0) {
            //Increment the count
            no_of_succ_trans++;
            //Create a success trans object
            let SuccTrans = {
              index: i,
              TransReq: transactions[i],
              TransRes: bulkTransRes.data
            }
            //Push it to array of success transaction
            array_of_succ_trans.push(SuccTrans);
          } else {
            //If transaction fails
            //Increment the count
            no_of_failure_trans++;
            //Create a failure trans object
            let FailTrans = {
              index: i,
              TransReq: transactions[i],
              TransRes: bulkTransRes.data
            }
            //Push it to array of success transaction
            array_of_fail_trans.push(FailTrans);
          }
        }
      } else {
        return ResponseHelper.buildSuccessResponse({
          isValidReq
        }, langEngConfig.message.moneyTransfer.req_objerr, STATUS.FAILURE);
      }
    }

    let transResObj = {
      'no_of_trans' : totalTrans,
      'total_succ_trans': no_of_succ_trans,
      'list_of_succ_trans': array_of_succ_trans,
      'total_fail_trans': no_of_failure_trans,
      'list_of_fail_trans': array_of_fail_trans
    }

    if(totalTrans > 1){
      return ResponseHelper.buildSuccessResponse(transResObj, langEngConfig.message.bulkTransfer.bulkTransferSucc, STATUS.SUCCESS);
    }
    return ResponseHelper.buildSuccessResponse(transResObj, langEngConfig.message.bulkTransfer.singlePayment, STATUS.SUCCESS);
  } else {
    //if not, Schedule the bulk transfer at given time.
    try {
      //Generate a unique di for scheduled tranfer.
      let scheduleTransId = await utils.getScheduleTransId();
      let arrayOfTrans = JSON.stringify(transactions);

      let totalAmt = 0;
      //Calculate the total amount in bulk scedule transaction request
      transactions.forEach((trans)=>{
        totalAmt += trans.amount;
      })
      //Call the method for scheduling the transfer

      let setSceduleTrans = await scheduleTrans.setScheduleTransfer(scheduleTransId, applicantId, transferTime, fromCurrency, arrayOfTrans, totalAmt, doNotify, currentTime);
      if (setSceduleTrans) {
        //If the transfer scheduled successfully the send the success message.
        let succMsg = format(langEngConfig.message.schedulrTrans.scheduleTransSucc, totalTrans, totalAmt, fromCurrency, transferTime);
        return ResponseHelper.buildSuccessResponse({}, succMsg, STATUS.SUCCESS);
      } else {
        //If not send failure message
        return ResponseHelper.buildSuccessResponse({}, langEngConfig.message.schedulrTrans.scheduleTransSucc, STATUS.FAILURE);
      }
    } catch (err) {
      logger.error('Error occured : ' + err);
      return ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler));
    }
  }
}