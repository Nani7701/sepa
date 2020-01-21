/**
 * mock route 
 * This is a route defines merchent/mock related routes implementation. 
 * @package mock route
 * @subpackage sources\services\router\mock route
 * @author SEPA Cyper Technologies, Sujith ,Satya.
 */

"use strict";
import {checkValidUser,getCard,fetchPaymentsMock,addMoney,userLogin,saveUser,saveCard} from '../controller/mock';
import {isTokenValid} from './interceptor';

router.get("/getAllPayments",checkValidUser,fetchPaymentsMock);
router.get("/card/:applicant_id", getCard);
router.post("/payments", checkValidUser, addMoney);
router.post("/login", userLogin);
router.post("/userRegistration",saveUser);
router.post("/card", saveCard);


// var mockapiControler = require('../controller/mockApis/mockController');
// var checkValidUser = require('../model/tokenModel')

// router.get("/getAllPayments", mockapiControler.checkValidUser, mockapiControler.fetchPaymentsMock)
// router.post("/payments", mockapiControler.checkValidUser, mockapiControler.addMoney)
// router.post("/login", mockapiControler.userLogin)
// router.post("/userRegistration", mockapiControler.saveUser);
// router.post("/card", mockapiControler.saveCard)
// router.get("/card/:applicant_id", mockapiControler.getCard)


module.exports = router;
