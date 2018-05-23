
'use strict';

var utils = require('../utils/writer.js');
var task = require('../service/taskService');


module.exports.createtask = function createtask(req, res, next) {
    var body = req.swagger.params['body'].value;
    task.createtask(body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};


module.exports.gettask = function gettask(req, res, next) {
    var id = req.swagger.params['id'].value;
    task.gettask(id)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};



module.exports.gettaskByuserId = function gettaskByuserId(req, res, next) {
    var userId = req.swagger.params['userId'].value;
    var createdDate = req.swagger.params['createdDate'].value;
    task.gettaskByuserId(userId,createdDate)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};



module.exports.gettaskBySubmoduleId = function gettaskBySubmoduleId(req, res, next) {
    var id = req.swagger.params['id'].value;
    task.gettaskBySubmoduleId(id)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};


module.exports.deletetask = function deletetask(req, res, next) {
    var id = req.swagger.params['id'].value;
    task.deletetask(id)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};



module.exports.updatetask = function updatetask(req, res, next) {
    var id = req.swagger.params['id'].value;
    var body = req.swagger.params['body'].value;
    task.updatetask(id, body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};



module.exports.updatetaskmember = function updatetaskmember(req, res, next) {
    var id = req.swagger.params['id'].value;
    var body = req.swagger.params['body'].value;
    task.updatetaskmember(id, body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};



module.exports.deletetaskByassigntoId = function deletetaskByassigntoId(req, res, next) {
    var id = req.swagger.params['id'].value;
    var body = req.swagger.params['body'].value;
    task.deletetaskByassigntoId(id,body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

