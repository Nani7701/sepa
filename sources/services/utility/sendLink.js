/**
 * sendlink config
 * This is a config file, where send deep-link from web to mobile app functionality related properties, messgaes and
 * urls are configured. 
 * @package sendLink
 * @subpackage sources\services\utility\sendLink
 * @author SEPA Cyper Technologies, Sujit Kumar.
 */

export let configVariables= {
    link: {
        android: "https://ojasit.in/launch?id=",
        ios: "https://ojasit.in/payvoo/id="
    },
    sendLink: {
        android: "https://ojasit.in/invitation?",
        ios: process.env.WEBADDRESS + "verifyPerDetails?",
        web: process.env.WEBADDRESS + "/#/index/verifyPerDetails?"
    },
    mail: {
        subject: "Welcome to PayVoo Kyc Upload",
        resolve: "'Email sent",
        linkSendMessage: "Link sent to email",
        linkSendError: "Problem While Sending link to email",
        verifySubject: "Verify your identity",
        welcome: "Welcome to PayVoo ",
    }

}
