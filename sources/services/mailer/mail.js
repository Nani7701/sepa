/**
 * This file contains all the e-mail configuration related data,Such as e-mail and phone number
 * verification through otp tempalate,Wel-come mail once successfull user signup is done and
 * kyc_status once kyc_data is submited.
 * @package mail
 * @subpackage sources\services\mailer\mail
 * @author SEPA Cyper Technologies, Sujit kumar.
 */
"use strict";

var handle = require('handlebars');
var fs = require('fs');
import { configVariables } from '../utility/sendLink';
import { encrypt } from '../utility/validate';

import { mobileOtp } from '../controller/commonCode';

import { langEngConfig } from '../utility/lang_eng';



const STATUS = {
  FAILED: 1,
  SUCCESS: 0,
  VALID: 2
};

var transporter = nodemailer.createTransport({
  // need SMTP host to configure mail.
  host: process.env.SERVICE,
  port: process.env.MAIL_GMAIL_PORT,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  },
  tls: {
    ciphers: 'SSLv3'
  }
});

var readHTMLFile = function (path, callback) {
  fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
    if (err) {
      throw err;
      callback(err);
    }
    else {
      callback(null, html);
    }
  });
};

var forgotStatus = (email, status, messageType) => {
  return new Promise(function (resolve, reject) {
    var mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Reset Your PayVoo Password'
    };
    readHTMLFile(__dirname + '/forgotStatus.html', function (err, html) {
      var template = handle.compile(html);
      var replacements = {
        forgotStatus: status,
        type: messageType
      };
      var htmlToSend = template(replacements);
      mailOptions.html = htmlToSend;
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          resolve(error);
        } else {
          resolve({ status: 1 });
        }
      })
    })
  })
}


var sandBoxInfo = (email, data, docUrl) => {
  return new Promise(function (resolve, reject) {
    var mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: 'PayVoo Sandbox Information'
    };
    readHTMLFile(__dirname + '/sandBoxInfo.html', function (err, html) {
      var template = handle.compile(html);
      var replacements = {
        sandboxObj: data,
        docUrl: docUrl
      };
      var htmlToSend = template(replacements);
      mailOptions.html = htmlToSend;
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          resolve(error);
        } else {
          resolve({ status: 1 });
        }
      })
    })
  })
}

var kycStatus = (email, status) => {
  return new Promise(function (resolve, reject) {
    var mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Kyc Status'
    };
    readHTMLFile(__dirname + '/kycStatus.html', function (err, html) {
      var template = handle.compile(html);
      var replacements = {
        kycStatus: status
      };
      var htmlToSend = template(replacements);
      mailOptions.html = htmlToSend;
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          resolve(error);
        } else {
          resolve({ message: 'Email sent' });
        }
      })
    })
  })
}

var randomNumber = function () {
  var digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  // return OTP;
  return '012345';
};


var timeDiffer = function (dt2, dt1) {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));

}

var validateEmail = function (email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

let isEmpty = function (inputValue) {
  return (inputValue === undefined || inputValue == null || inputValue.length <= 0) ? true : false;;
};
//For otp verification through e-mail
var sendEmail = (sender, otp, cb) => {
  var mailOptions = {
    //need SMTP host to configure.
    from: process.env.MAIL_USER,
    to: sender,
    subject: 'OTP Verification',
  };
  readHTMLFile(__dirname + '/otp.html', function (err, html) {
    var template = handle.compile(html);
    var replacements = {
      otp: otp
    };
    var htmlToSend = template(replacements);
    mailOptions.html = htmlToSend;
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        cb(error, null)
      }
      else {
        cb(null, info)
      }
    })
  })
};
//Wel-come mail after each successful signup.
var signupMail = (email, firstName, LastName, routeType) => {
  return new Promise(function (resolve, reject) {
    var mailOptions = {
      from: process.env.MAIL_USER,
      to: email
    };
    if (routeType === 'sandbox') {
      mailOptions["subject"] = "Welcome to PayVoo Sandbox"
    } else {
      mailOptions["subject"] = "Welcome to PayVoo"
    }
    let loadingPage = (routeType === 'sandbox') ? '/welcome_sandbox.html' : '/welcome.html'
    readHTMLFile(__dirname + loadingPage, function (err, html) {
      var template = handle.compile(html);
      var replacements = {
        username: firstName + LastName,
        loginLink: process.env.WEB_LOGIN_URL,
        docLink: process.env.SANDBOX_API_DOC_URL
      };
      var htmlToSend = template(replacements);
      mailOptions.html = htmlToSend;
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          resolve(error);
        } else {
          resolve({ message: 'Email sent' });
        }
      })
    })
  })
}

//this for sending link to respective mobile devices for continuation of kyc process. 
var sendLink = function (req) {
  return new Promise(function (resolve, reject) {
    var link = '';
    if (req.params.platFormType == 'android') {
      link = `${configVariables.link.android}${req.params.identId}`
    } else {
      link = `${configVariables.link.ios}${req.params.identId}`
    }
    mail(req.params.email, link).then((message) => {
      resolve(message);
    }, (error) => {
      reject(error);
    })
  })
}

//this for sending link to respective mobile devices for continuation of kyc process. 
var sendInvitation = function (req) {
  return new Promise(function (resolve, reject) {
    let token = encrypt(req.body.userEmail + ' ' + req.body.userName);
    var link = {};
    link['android'] = `${configVariables.sendLink.android}token-${token}`
    link['ios'] = `${configVariables.sendLink.web}token:${token}`
    link['web'] = `${configVariables.sendLink.web}token=${token}`
    verify((req.body.userEmail), link).then((message) => {
      resolve(message);
    }, (error) => {
      reject(error);
    })
  })
}

var verify = (email, link) => {
  return new Promise(function (resolve, reject) {
    var mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: configVariables.mail.verifySubject,
    };
    readHTMLFile(__dirname + '/verify.html', function (err, html) {
      var template = handle.compile(html);
      var replacements = {
        android: link.android,
        ios: link.ios,
        web: link.web
      };
      var htmlToSend = template(replacements);
      mailOptions.html = htmlToSend;
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          resolve(error);
        } else {
          resolve({ message: configVariables.mail.resolve });
        }
      })
    })
  })
};

/* Sending email && mobile messages for notifications*/
let sendKycStatus = function (email, mobile, status, flag) {
  logger.info(`Initiated sendKycStatus`);
  return new Promise(function (resolve, reject) {
    kycStatus(email, status).then(function (message) {
      if (flag) {
        mobileOtp(mobile, `${langEngConfig.message.email.messageInitiated} ${status}`).then((result) => {
          logger.info(`Successfully sent mobile otp at sendKycStatus`);
          resolve({ status: STATUS.SUCCESS, message: langEngConfig.message.notification.success });
        }).catch((error) => {
          logger.error(`Sending mobile failure at sendKycStatus`);
          reject({ status: STATUS.FAILED, message: langEngConfig.message.mobile.failure });
        });
      }
      else {
        logger.info(`Successfully sent email otp at sendKycStatus`);
        resolve({ status: STATUS.SUCCESS, message: langEngConfig.message.notification.success });
      }
    }, function (error) {
      logger.error(`Sending email failure at sendKycStatus`);
      reject({ status: STATUS.FAILED, message: langEngConfig.message.email.failure });
    }).catch((error) => {
      logger.error(`Sending email failure at sendKycStatus`);
      reject({ status: STATUS.FAILED, message: langEngConfig.message.email.failure });
    });

  })
};

var mail = (email, link) => {
  return new Promise(function (resolve, reject) {
    var mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: configVariables.mail.subject,
    };
    readHTMLFile(__dirname + '/kycLink.html', function (err, html) {
      var template = handle.compile(html);
      var replacements = {
        link: link
      };
      var htmlToSend = template(replacements);
      mailOptions.html = htmlToSend;
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          resolve(error);
        } else {
          resolve({ message: configVariables.mail.resolve });
        }
      })
    })
  })
};

export {
  kycStatus,
  randomNumber,
  validateEmail,
  isEmpty,
  sendEmail,
  timeDiffer,
  signupMail,
  sendLink,
  forgotStatus,
  sendInvitation,
  sandBoxInfo,
  sendKycStatus
}
