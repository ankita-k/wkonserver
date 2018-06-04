'use strict';
var chatService = require('../models/chat');
var user = require('../models/user');
var Server = require('../index');
var helper = require('../utils/helper');


//**/ API FOR CREATING CHAT  and populate userid and projectid*/
exports.startChat = function (body) {
    return new Promise(function (resolve, reject) {
        console.log(body)
        var chatdata = new chatService(body)
        chatdata.userId = body.userId;
        chatdata.projectId = body.projectId;
        chatdata.text = body.text;
        chatdata.target = body.target;
        chatdata.type = body.type;
        console.log(chatdata)
        chatdata.save(function (err, result) {
            console.log(result)
            console.log(err)
            if (err) {
                reject({ error: true, message: err });
                return;
            }

            else if (result) {
                chatService.findOne({_id:result._id}).populate('userId').exec(function (err, item) {
                    console.log('err',err)
                    console.log('item',item)
                    if(err){
                        reject({ error: true, message: err });  
                    }
                    else if(item){
                        Server.io.emit('chatCreated', item);
                        resolve({ error: false, result: item, message: "chat send successfully" });
                       
                    }
                })
            }
        })
    })
}
//*API FOR CREATING CHAT ENDS/

/**API TO GET ALL CHATS HISTORY FOR THAT PROJECT */
exports.getChats = function (id) {
    console.log('id',id)
    return new Promise(function (resolve, reject) {

        chatService.find({ projectId:id })
        .exec(function (err, chats) {
            console.log('err',err)
            console.log('chats',chats)
            if (err) {
                reject({ error: true, message: err });
            }
            else {
                resolve({ error: false, result: chats ,message:'list get successfull'});

            }
        });
    })
}
/**API TO GET ALL CHATS HISTORY FOR THAT PROJECT ENDS*/