/**
 * sendLink route
 * This is a route file, where the Kyc link related service is defined. This route will call its
 * respective controller method which will send a deep link from web to user mobile using which a user
 * can complete their KYC.
 * @package sendLink
 * @subpackage sources\services\router\sendLink
 * @author SEPA Cyper Technologies, Sujit Kumar.
 */
"use strict";
// import mailer from '../mailer/mail'
 var mailer = require('../mailer/mail');
 import { langEngConfig } from '../utility/lang_eng';
 import { configVariables } from '../utility/sendLink';

const STATUS={
   SUCCESS:0,
   FAIL:1
}

export const sendLink = (request,response)=>{
   mailer.sendLink(request).then(function (message) {
      response.send(ResponseHelper.buildSuccessResponse(message,configVariables.mail.linkSendMessage,STATUS.SUCCESS));
   }, function (err) {
      response.send(ResponseHelper.buildFailureResponse(new Error(langEngConfig.message.error.ErrorHandler)))
   })

}

export const sendInvitation = (request,response)=>{
   mailer.sendInvitation(request).then(function (message) {
      response.send(ResponseHelper.buildSuccessResponse({}, configVariables.mail.linkSendMessage, STATUS.SUCCESS));
   }, function (err) {
      response.send(ResponseHelper.buildSuccessResponse({}, configVariables.mail.linkSendError, STATUS.FAILED))
   })
}



// router.get('/service/downloadKycLink/:mobileNumber/:email/:platFormType/:identId', (req, res) => {
//     mailer.sendLink(req).then(function (message) {
//       res.send(message);
//    }, function (err) {
//       res.send(err)
//    })
// })




// router.post('/service/sendInvitation', (req, res) => {
//    mailer.sendInvitation(req).then(function (message) {
//      res.send(message);
//   }, function (err) {
//      res.send(err)
//   })
// })


module.exports = router;
