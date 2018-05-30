'use strict';

var utils = require('../utils/writer.js');
var Chat = require('../service/chatService');

// FOR CREATING CHAT
module.exports.startChat = function startChat (req, res, next) {
    var body = req.swagger.params['body'].value;
    Chat.startChat(body)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
}

//FOR GRETTING CHAT LIST
module.exports.getChats = function getChats (req, res, next) {
  var id = req.swagger.params['id'].value;

  Chat.getChats(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};