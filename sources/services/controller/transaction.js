/**
 * transaction Controller
 * This api is used for to send or receive payments from bussiness app .
 * @package transaction
 * @subpackage controller/transactions/transaction
 *  @author SEPA Cyper Technologies, Satyanarayana G,Krishnakanth R
 */

"use strict"
import { Transaction } from '../model/transactionModel';
import { langEngConfig } from '../utility/lang_eng';

const STATUS = {
    SUCCESS: 0,
    FAIL: 1
}

/**
 * @desc This function is used to insert country transactions
 * @method transaction
 * @param {Object}  request  - It is request Object
 * @param {Object}  response - It is response Object
 * @return return status message and status code 
 */
const transaction = (request, response) => {
    logger.info('transaction() initiated');
    const transaction = new Transaction();
    let applicant_id = request.params.applicant_id;
    transaction.getBusinessId(applicant_id).then(res => {
        if (_.size(res) > 0) {
            let countries_Details = request.body.countries_Details;
            let results = _.size(countries_Details) > 0 ? countries_Details : [];
            if (results && results.length > 0) {
                let rowItems = [];
                (results).forEach(function (obj) {
                    let reSetObj = {};
                    reSetObj.business_id = res[0].business_id
                    reSetObj.country_id = obj.country_id
                    reSetObj.business_description = obj.business_description
                    reSetObj.transaction_type = obj.transaction_type
                    rowItems.push(Object.values(reSetObj));
                });
                try {
                    transaction.transactionPayment(rowItems).then((data, error) => {
                        if (!error) {
                            logger.info('transaction() exited');
                            response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.transaction.operationSuccess, STATUS.SUCCESS));
                        }
                        else {
                            logger.error('transaction() Error', error);
                            response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.transaction.operationError, STATUS.FAIL));
                        }
                    }).catch((error1) => {
                        logger.error('transaction() Error', error1);
                        response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
                    });
                }
                catch (error2) {
                    logger.error('transaction() Error', error2);
                    response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
                }
            }
            else {
                logger.error('transaction() Error');
                response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.transaction.dataEmpty, STATUS.FAIL));
            }
        }
        else {
            logger.error('transaction() Error');
            response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.transaction.businessId_error, STATUS.FAIL));
        }
    }).catch((err) => {
        logger.error('transaction() Error', err);
        response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
    });
}

/**
 * @desc This function is used to get country transactions
 * @method getTransaction
 * @param {Object}  request  - It is request Object
 * @param {Object}  response - It is response Object 
 * @return return country transactions 
 */
const getTransaction = (request, response) => {
    logger.info('getTransaction() initiated');
    const getTransaction = new Transaction();
    let applicant_id = request.params.applicant_id;
    getTransaction.getBusinessId(applicant_id).then(result => {
        if (_.size(result) > 0) {
            getTransaction.getTransaction(result[0].business_id).then((res, err) => {
                let data = [];
                _.forEach(res, function (results, key) {
                    delete res[key].business_id;
                    data.push(results);
                });
                if (err) {
                    logger.error('getTransaction() Error', err);
                    response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
                }
                else {
                    if (res[0]) {
                        logger.info('getTransaction() exited');
                        response.send(ResponseHelper.buildSuccessResponse({ "transaction_country": data }, langEngConfig.message.transactionVolume.country_transaction_success, STATUS.SUCCESS));
                    }
                    else {
                        if (_.size(result) > 0) {
                            logger.error('getTransaction() failed');
                            response.send(ResponseHelper.buildSuccessResponse({ "transaction_country": res }, langEngConfig.message.transactionVolume.country_transaction_failed, STATUS.FAIL));
                        }
                        else {
                            logger.error('getTransaction() Error');
                            response.send(ResponseHelper.buildSuccessResponse({ "transaction_country": res }, langEngConfig.message.transactionVolume.country_transaction_failed, STATUS.FAIL));
                        }
                    }
                }
            }).catch(err => {
                logger.error('getTransaction() Error', err);
                response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
            })
        }
        else {
            logger.error('getTransaction() Error');
            response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.transaction.businessId_error, STATUS.FAIL));
        }
    }).catch(err => {
        logger.error('getTransaction() Error', err);
        response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
    })
}

/**
 * This function is used to insert transactions
 * @method transactionVolume
 * @param {Object}  request  - It is request Object
 * @param {Object}  response - It is response Object 
 * @return return status message and status code 
 */
const transactionVolume = (request, response) => {
    logger.info('transactionVolume() initiated');
    const transactionVolume = new Transaction();
    let applicantId = request.params.applicant_id;
    transactionVolume.getBusinessId(applicantId).then(result => {
        if (_.size(result) > 0) {
            logger.info('business id found');
            let transaction = {
                business_id: result[0].business_id,
                monthy_transfer_amount: request.body.monthy_transfer_amount,
                no_payments_per_month: request.body.no_payments_per_month,
                max_value_of_payment: request.body.max_value_of_payment
            }
            if (transaction.business_id && transaction.business_id != 'undefined') {
                transactionVolume.transactionVolume(transaction).then((results, err) => {
                    if (_.size(results) > 0) {
                        logger.info('transactionVolume() exited');
                        response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.transactionVolume.success, STATUS.SUCCESS));
                    } else {
                        logger.error('transactionVolume() Error');
                        response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.transactionVolume.fail, STATUS.FAIL));
                    }
                }).catch(err => {
                    logger.error('transactionVolume() Error', err);
                    response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
                })
            }
        }
        else {
            logger.error('error in fetching business Id');
            response.send(ResponseHelper.buildSuccessResponse({}, langEngConfig.message.transactionVolume.businessId_error, STATUS.FAIL));
        }
    }).catch(err => {
        logger.error('transactionVolume() Error', err);
        response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
    })

}
/**
 * This function is used to get Transactions
 * @method getTransactionVolume
 * @param {Object}  request  - It is request Object
 * @param {Object}  response - It is response Object 
 * @return return transaction volume list 
 */
const getTransactionVolume = (request, response) => {
    logger.info('getTransactionVolume() initiated');
    const getTransactionVolume = new Transaction();
    let applicantId = request.params.applicant_id;
    getTransactionVolume.getBusinessId(applicantId).then(result => {
        if (_.size(result) > 0) {
            getTransactionVolume.getTransactionVolume(result[0].business_id).then(res => {
                if (_.size(res) > 0) {
                    let data = {
                        monthy_transfer_amount: res[0].monthly_transfer_amount,
                        no_payments_per_month: res[0].no_payments_per_month,
                        max_value_of_payment: res[0].max_value_of_payments,
                    }
                    logger.info('getTransactionVolume() exited');
                    response.send(ResponseHelper.buildSuccessResponse({ "TransactionVolume": data }, langEngConfig.message.transactionVolume.fetchsuccess, STATUS.SUCCESS));

                }
                else {
                    let data = {};
                    logger.error('getTransactionVolume() Error');
                    response.send(ResponseHelper.buildSuccessResponse({ "TransactionVolume": data}, langEngConfig.message.transactionVolume.fetcheerror, STATUS.FAIL));
                }
            }).catch(err => {
                logger.error('getTransactionVolume() Error', err);
                response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
            })
        }
        else {
            logger.error('error in fetching business Id');
            response.send(ResponseHelper.buildSuccessResponse({},langEngConfig.message.transactionVolume.businesssId_error,STATUS.FAIL));
        }
    }).catch(err => {
        logger.error('getTransactionVolume() Error', err);
        response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)));
    })
}

export {
    transaction,
    getTransaction,
    transactionVolume,
    getTransactionVolume
};




