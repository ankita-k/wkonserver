'use strict';

var utils = require('../utils/writer.js');
var Client = require('../service/clientService');

module.exports.createClient = function createClient (req, res, next) {
  var body = req.swagger.params['body'].value;
  Client.createClient(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.createUsersWithArrayInput = function createUsersWithArrayInput (req, res, next) {
  var body = req.swagger.params['body'].value;
  Client.createUsersWithArrayInput(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.createUsersWithListInput = function createUsersWithListInput (req, res, next) {
  var body = req.swagger.params['body'].value;
  Client.createUsersWithListInput(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteclient = function deleteclient (req, res, next) {
  var _id = req.swagger.params['id'].value;
  Client.deleteclient(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getclientById = function getclientById (req, res, next) {
  var id = req.swagger.params['id'].value;
  Client.getclientById(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getClientList = function getClientList (req, res, next) {
  var userId = req.swagger.params['userId'].value;
  var page= req.swagger.params['page'].value;
  var limit = req.swagger.params['limit'].value;
  Client.getClientList(userId,page,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.loginclient = function loginclient (req, res, next) {
  var username = req.swagger.params['username'].value;
  var password = req.swagger.params['password'].value;
  Client.loginclient(username,password)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.logoutUser = function logoutUser (req, res, next) {
    Client.logoutUser()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateClient = function updateClient (req, res, next) {
  var id = req.swagger.params['id'].value;
  var body = req.swagger.params['body'].value;
  Client.updateClient(id,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
