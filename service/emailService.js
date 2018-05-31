'use strict'
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
// const key= 'mefysitekey';
var handlebars = require('handlebars');
var Client = require('../models/client');



// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'memeinfotechnotifications@gmail.com',
        pass: '18April2018'
    }
});

let readHTMLFile = function (path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
        if (err) {
            throw err;
        }
        else {
            callback(null, html);
        }
    });
};


exports.sendmail = function (body) {
    return new Promise(function (resolve, reject) {
        // console.log('directory',body);

        var email = body.email;
        var name = body.name;
        var subject = body.subject;
        var userId = body.userId;
        var clientId = body.clientId;
        console.log(body.userId)
        console.log('directory', __dirname);

        readHTMLFile(__dirname + '/templates/welcome.html', function (err, html) {

            var template = handlebars.compile(html);
            var replacements;
            var mailOptions;
            var htmlToSend;
            var ccto;

            replacements = {
                name: name
            };

            Client.findOne({ _id: clientId }, (error, result) => {
                console.log(error, clientId);
                console.log(result);
                if (error) {
                    reject(error)
                }
                else if (result) {
                    if (result.mailstatus) {
                        resolve({ error: true, message: "Mail already send " });
                    }
                    else if (!result.mailstatus) {
                        ccto = result.email;

                        htmlToSend = template(replacements);
                        mailOptions = {
                            from: 'memeinfotechnotifications@gmail.com', // sender address
                            to: email, // list of receivers
                            subject: subject, // Subject line 
                            html: htmlToSend,
                            cc: ['abhijit.roy@memeinfotech.com', ccto]
                        };

                        // send mail with defined transport object
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                return console.log(error);
                            }
                            console.log('Message sent: %s', info.messageId);

                            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                            // response.send("sent mail");

                            resolve({ error: false, message: "Mail sent successfully" });

                        });
                        result.mailstatus = true;
                        Client.findOneAndUpdate({ _id: result._id }, { $set: result }, { new: true }, (error, result) => {
                            console.log(error);
                            console.log(result);
                            if (error) {
                                reject({ error: true, message: error })
                            }
                            else {
                                resolve({ error: false, result: result, message: "Mail sent and status saved successfully" });
                            }
                        })
                    }

                }
            })

        });
    });
}





