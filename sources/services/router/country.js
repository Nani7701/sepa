/**
 * otp route
 * This is a route fil. 
 * @package otp
 * @subpackage sources\services\router
 * @author SEPA Cyper Technologies.
 */

"use strict";

import {getCountriesList, getCountryByName , getStatusCurrency , getCurrencyList} from '../controller/country';
//var countryController = require('../controller/country');
import { isTokenValid } from './interceptor'

// router for country
router.get('/service/country', getCountriesList);
router.get('/service/country/:country_name', getCountryByName);
router.get('/service/v1/statusCurrency', getStatusCurrency);
router.get('/service/v1/currency', getCurrencyList);




module.exports = router;