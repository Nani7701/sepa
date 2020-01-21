var soap = require('strong-soap').soap;
let path = require('path');

"use strict";

//var fs = require('fs');
var soap = require('strong-soap').soap;
exports.pepSanction = (request, response) => {

    // wsdl of the web service this client is going to invoke. For local wsdl you can use, url = './wsdls/stockquote.wsdl'
    var url = 'https://apiv3-uat.w2globaldata.com/Service.svc?wsdl';

    // fs.readFile('C:/Users/me/source/repos/SOAPTEST/SOAPTEST/SOAP Envelopes/VerifyAPIKey.xml', 'utf-8', function(err, contents) {
    //     if (err) {
    //         return console.log(err);
    //     }
    //     var contents = contents.toString();

    var requestArgs = {
        apiKey: '8a2027e5-5cd2-4d56-a4cf-02abe0070ca4'
    };

    var options = {
        method: 'POST',
        url: 'http://localhost:5001/service/pepSanction',
        headers: {
            'Content-Type': 'text/xml'
        },
        body:'xml'
    };
    soap.createClient(url, options, function (err, client) {
       // console.log(client);

        client.addSoapHeader(`<wsa:Action xmlns:wsa="http://www.w3.org/2005/08/addressing">urn:IQTrack/WebServices/v1/RequesterSync/KYCCheck</wsa:Action>`);
        //client.addSoapHeader("<soap:Header xmlns:wsa=\"http://www.w3.org/2005/08/addressing\"><wsa:To>https://webservices.iqtrack.com/RequesterSync.svc</wsa:To></soap:Header>");
        console.log('headers1');
        var method = client['KYCCheck'];
        console.log('!!!!!!!!!!!');
        console.log(method);
        //return console.log(client.getSoapHeaders());

        method(requestArgs, function (err, result, envelope, soapHeader) {
            //console.log(err);
            console.log(result);
            console.log('----------');
           //return console.log(err,'xgfgdskg');
         
            //response envelope
            console.log('Response Envelope: \n' + envelope);
            //'result' is the response body
            console.log('Result: \n' + JSON.stringify(result));
        });
    });

}