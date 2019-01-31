'use strict';

var utils = require('../utils/writer.js');
var timesheet = require('../service/timesheetService');

module.exports.createtimesheet = function createtimesheet(req, res, next) {
    var body = req.swagger.params['body'].value;
    timesheet.createtimesheet(body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};


module.exports.gettimesheet = function gettimesheet(req, res, next) {
    var userId = req.swagger.params['userId'].value;
    var createdDate = req.swagger.params['createdDate'].value;
    timesheet.gettimesheet(userId,createdDate)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};


module.exports.updatetimesheet = function updatetimesheet(req, res, next) {
    var id = req.swagger.params['id'].value;
    var body = req.swagger.params['body'].value;
    timesheet.updatetimesheet(id, body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};


module.exports.getById = function getById(req, res, next) {
    var id = req.swagger.params['id'].value;
    console.log(id);
    timesheet.getById(id)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.updatetimesheetTaskById = function updatetimesheetTaskById(req, res, next) {
    var id = req.swagger.params['id'].value;
    var body = req.swagger.params['body'].value;
    timesheet.updatetimesheetTaskById(id, body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};







