/**
 * counterParty route
 *  counterParty route is used for the user will able to create countetParty and it will give the counterparty names based upon search
 * @package counterparty
 * @subpackage router/counterparty 
 *  @author SEPA Cyper Technologies,krishnakanth r
 */
import { beneficiarysList,createBenificary,getCounterParties,deleteCounterParty,getCounterPartiesList,getCounterPartyCurrencies} from '../controller/counterParty';
import {isTokenValid} from './interceptor';

router.get('/service/v1/globalsearch/:limit/:name',isTokenValid,beneficiarysList);
router.post('/service/v1/counterparty',isTokenValid,createBenificary);
router.get('/service/v1/counterparty/:limit/:name',isTokenValid,getCounterParties);
router.delete('/service/v1/counterparty/:counterparty_id',isTokenValid,deleteCounterParty);
router.get('/service/v1/counterparty',isTokenValid,getCounterPartiesList);
router.get('/service/v1/counterPartyCurrency/:mobile',isTokenValid,getCounterPartyCurrencies);


module.exports = router;

