'use strict';

const User = require('./../models/user');
var ObjectId = require('mongodb').ObjectID;

class Helper {


	/* 
	* To get User information with the id
	*/
    getUserInfo(userId, callback) {
        User.findOne({ _id: userId }, (err, result) => {
            callback(err, result);
        });
    }
}
