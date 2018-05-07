'use strict'
const nodemailer = require('nodemailer');
const fs = require('fs');
// const key= 'mefysitekey';
var handlebars = require('handlebars');



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
        console.log(html);
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

        console.log('directory',__dirname);

        readHTMLFile(__dirname+'/templates/email.html', function (err, html) {

            var template = handlebars.compile(html);
            var replacements;
            var mailOptions;
            var htmlToSend;
   
            replacements = {
                name: name
            };

            htmlToSend = template(replacements);
            mailOptions = {
                from: 'memeinfotechnotifications@gmail.com', // sender address
                to: email, // list of receivers
                subject: subject, // Subject line 
                html: htmlToSend
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);

                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                // response.send("sent mail");

            });

        });
    });
}




























