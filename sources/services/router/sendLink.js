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

import {sendLink,sendInvitation} from '../controller/sendLink';


router.post('/service/sendInvitation',sendInvitation);
router.get('/service/downloadKycLink/:mobileNumber/:email/:platFormType/:identId',sendLink);


module.exports = router;



// router.post('/service/sendInvitation', (req, res) => {
//    mailer.sendInvitation(req).then(function (message) {
//      res.send(message);
//   }, function (err) {
//      res.send(err)
//   })
// })



// router.get('/service/downloadKycLink/:mobileNumber/:email/:platFormType/:identId', (req, res) => {
//     mailer.sendLink(req).then(function (message) {
//       res.send(message);
//    }, function (err) {
//       res.send(err)
//    })
// })


// module.exports = router;
