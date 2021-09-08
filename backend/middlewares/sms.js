const Sms = require('../models/smsModel')
const http = require('http');
async function  sendSms  (telT,messageT) {
    
    telT=telT.replace(')','')
    telT=telT.replace('(','')
    telT=telT.replace(/ /g,'')
    console.log(telT)
    myMobile="216"+telT
    mySender=process.env.mySender;
    apiKey=process.env.apiKey
     Url_str = `http://www.tunisiesms.tn/client/Api/Api.aspx?fct=sms&key=${apiKey}&mobile=${myMobile}&sms=${messageT}&sender=${mySender}`;

     http.get(Url_str, (resp) => {

        let data = '';
                // A chunk of data has been recieved.
                resp.on('data', (chunk) => {
                    data += chunk;
                });

                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    console.log(data);
                });

     } )

     objT={
        message:messageT,
        tel:telT
     }
     const smsModel = new Sms(objT)


       const newSmS = await smsModel.save()

       return newSmS
}


module.exports = { sendSms }