'use strict';

var utils = require('../utils/writer.js');
var Bill = require('../service/billService');


module.exports.createBill = function createBill (req, res, next) {
  var body = req.swagger.params['body'].value;
  Bill.createBill(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};


module.exports.deleteBill = function deleteBill (req, res, next) {
  var id = req.swagger.params['id'].value;
  Bill.deleteBill(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getBill = function getBill (req, res, next) {
    var _id = req.swagger.params['userId'].value;

    Bill.getBill(_id)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };



module.exports.updateBill = function updateBill (req, res, next) {
  var body = req.swagger.params['body'].value;
  var id = req.swagger.params['id'].value;
  Bill.updateBill(id,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};