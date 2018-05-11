'use strict';
var Bill = require('../models/bill');
var Server = require('../index');
var helper = require('../utils/helper');

/**
 * Create client
 * This can only be done by the logged in client.
 *
 * body client Created client object
 * no response value expected for this operation
 **/
exports.createBill = function (body) {
    return new Promise(function (resolve, reject) {
        var bill = new Bill(body);
        bill.createdBy = body.userId;
        bill.updatedBy = body.userId;
        bill.createdDate = Date.now();
        bill.updatedDate = Date.now();
        bill.save(function (err, bill) {
            if (err) {
                // if (err.errors && err.errors.email)  // error check if email is not present
                // {
                //   reject({ error: true, "message": "Email is required to create a client" })
                // }
                // else if (err.code == 11000) // error check if email is not unique
                // {
                //   reject({ error: true, "message": "This email already exists" })
                // }
                // else
                reject({ error: true, message: err });

                return;
            }
            else{
                Server.io.emit('billCreated',result);
                resolve({ error: false, result: bill });
            }
            
        })

    });
}

exports.getBill = function (userId) {
    return new Promise(function (resolve, reject) {
        // let perPage = parseInt(limit) ? parseInt(limit) : 10;
        // let pageCount = parseInt(page) ? parseInt(page) : 0;
        Bill.find({ createdBy: userId })
            .sort({ "createdDate": -1 })
            .populate('projectName')
            .populate('client')
            .exec(function (err, bills) {
                if (err) {
                    reject({ error: true, message: err });
                }
                else {
                    resolve({ error: false, result: bills });

                }
            });
    });
}


/**
 * Delete client
 * This can only be done by the logged in client.
 * clientname String The name that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteBill = function (id) {
    return new Promise(function (resolve, reject) {
        Bill.findOneAndRemove({ _id: id }, (error, bill) => {
            if (error) {
                reject(error);
                return;
            }
            if (bill)
                resolve({ error: false, result: bill });
            else
                resolve({ error: true, message: "No such bill found" })
        })
    });
}

/**
 * Updated client
 * This can only be done by the logged in client.
 *
 * clientname String name that need to be updated
 * body client Updated client object
 * no response value expected for this operation
 **/
exports.updateBill = function (id,body) {
    return new Promise(function (resolve, reject) {
        body.updatedBy = body.userId;
        body.updatedDate = Date.now();
        Bill.findOneAndUpdate({ _id: id }, { $set: body }, { new: true, password: 0 }, (error, bill) => {
            console.log(bill);
            console.log(error)
            if (error) {
                reject(error);
                return;
            }
            else if (bill)
                resolve({ error: false, result: bill });
            else
                resolve({ error: true, message: "No such bill found" })
        })
    });
}

