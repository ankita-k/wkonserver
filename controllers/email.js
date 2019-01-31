'use strict';

var utils = require('../utils/writer.js');
var emailService = require('../service/emailService');

module.exports.sendmail = function sendmail(req, res, next) {
    var body = req.swagger.params['body'].value;
    emailService.sendmail(body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};


