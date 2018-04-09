'use strict';

var utils = require('../utils/writer.js');
var Project = require('../service/projectService');

module.exports.CreateProject = function CreateProject (req, res, next) {
  var body = req.swagger.params['body'].value;
  Project.CreateProject(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// module.exports.createUsersWithArrayInput = function createUsersWithArrayInput (req, res, next) {
//   var body = req.swagger.params['body'].value;
//   Client.createUsersWithArrayInput(body)
//     .then(function (response) {
//       utils.writeJson(res, response);
//     })
//     .catch(function (response) {
//       utils.writeJson(res, response);
//     });
// };

// module.exports.createUsersWithListInput = function createUsersWithListInput (req, res, next) {
//   var body = req.swagger.params['body'].value;
//   Client.createUsersWithListInput(body)
//     .then(function (response) {
//       utils.writeJson(res, response);
//     })
//     .catch(function (response) {
//       utils.writeJson(res, response);
//     });
// };

module.exports.deleteProject = function deleteProject (req, res, next) {
  var _id = req.swagger.params['id'].value;
  Project.deleteProject(_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getProjectById = function getProjectById (req, res, next) {
  var id = req.swagger.params['id'].value;
  Project.getProjectById(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// module.exports.loginclient = function loginclient (req, res, next) {
//   var username = req.swagger.params['username'].value;
//   var password = req.swagger.params['password'].value;
//   Client.loginclient(username,password)
//     .then(function (response) {
//       utils.writeJson(res, response);
//     })
//     .catch(function (response) {
//       utils.writeJson(res, response);
//     });
// };

// module.exports.logoutUser = function logoutUser (req, res, next) {
//     Client.logoutUser()
//     .then(function (response) {
//       utils.writeJson(res, response);
//     })
//     .catch(function (response) {
//       utils.writeJson(res, response);
//     });
// };

module.exports.updateProject = function updateProject (req, res, next) {
  var id = req.swagger.params['id'].value;
  var body = req.swagger.params['body'].value;
  Project.updateProject(id,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
