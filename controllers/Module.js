'use strict';

var utils = require('../utils/writer.js');
var moduleService = require('../service/moduleService');


module.exports.createmodule = function createmodule (req, res, next) {
  var body = req.swagger.params['body'].value;
  console.log(body)
  moduleService.createmodule(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};


module.exports.getmodule = function getmodule (req, res, next) {
  var id = req.swagger.params['id'].value;
  moduleService.getmodule(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};



module.exports.getmoduleBYProjectId = function getmoduleBYProjectId (req, res, next) {
    var id = req.swagger.params['id'].value;
    moduleService.getmoduleBYProjectId(id)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };


module.exports.deletemodule = function deletemodule (req, res, next) {
    var id = req.swagger.params['id'].value;
    moduleService.deletemodule(id)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };



module.exports.updatemodule = function updatemodule (req, res, next) {
    var id = req.swagger.params['id'].value;
    var id = req.swagger.params['body'].value;
    moduleService.updatemodule(id,body)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };







