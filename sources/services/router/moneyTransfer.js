
/**
 * moneyTransfer
 * This router contains all the services related to account to account money transfer.
 * @package moneyTransfer
 * @subpackage router/moneyTransfer
 * @author SEPA Cyber Technologies Sekhara Suman Sahu
 */
import { isTokenValid } from './interceptor';
import { getWebTransaction, moneyTransfer, transactionDetails, walletPayments } from '../controller/moneyTransfer';
//import { bulkTransfer } from '../controller/bulkTransfer';
// import {walletToWalletTransfer, transactionDetails, getWebTransaction} from '../controller/moneyTransfer'; 
/* Transaction route*/
router.post('/service/v1/transfer/walletToWallet', isTokenValid, moneyTransfer);

/* Get transaction details*/
router.get('/service/v1/transfer/:currency_type/:device_type', isTokenValid, transactionDetails);

/*GET we transaction details for WEB*/
router.post('/service/webTransactionDetails', isTokenValid, getWebTransaction);

/*Router to perform Bulk transfer*/
router.post('/service/transfer/walletPayments', isTokenValid, walletPayments);

module.exports = router;
