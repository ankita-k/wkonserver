'use strict';

var utils = require('../utils/writer.js');
var submoduleService = require('../service/submoduleService');


module.exports.createsubmodule = function createsubmodule (req, res, next) {
  var body = req.swagger.params['body'].value;
  submoduleService.createsubmodule(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};


module.exports.getsubmodule = function getsubmodule (req, res, next) {
  var id = req.swagger.params['id'].value;
  submoduleService.getsubmodule(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};



module.exports.getsubmoduleByModule = function getsubmoduleByModule (req, res, next) {
    var id = req.swagger.params['id'].value;
    submoduleService.getsubmoduleByModule(id)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };


module.exports.deletesubmodule = function deletesubmodule (req, res, next) {
    var id = req.swagger.params['id'].value;
    submoduleService.deletesubmodule(id)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };



module.exports.updatesubmodule = function updatesubmodule (req, res, next) {
    var id = req.swagger.params['id'].value;
    var body = req.swagger.params['body'].value;
    submoduleService.updatesubmodule(id,body)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };







