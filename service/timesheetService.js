'use strict';
var timesheet = require('../models/timesheet');
var moment = require('moment');



/**
 * Create timesheet
 * This can only be done by the logged in client.
 *
 * body client Created client object
 * no response value expected for this operation
 **/
exports.createtimesheet = function (body) {
    return new Promise(function (resolve, reject) {


        let date = moment(new Date(body.date)).utcOffset(0);
        date.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
        date.toISOString();
        date = date.format();
        console.log(date);

        var data = new timesheet(body);
        data.name = body.userId;
        data.descritpion = body.purpose;
        data.submoduleId = body.startTime;
        data.endTime = body.endTime;
        data.date = date;
        data.createdBy = body.userId;
        data.updatedBy = body.userId;
        data.createdDate = Date.now();
        data.updatedDate = Date.now();
        data.save(function (err, result) {
            if (err) {
                reject({ error: true, message: err });
                return;
            }
            else
                resolve({ error: false, result: result, message: "Timesheet created successfully" });
        })

    });
}


/* Api to get the timesheet by task id*/


exports.gettimesheet = function (userId, createdDate) {
    return new Promise(function (resolve, reject) {

        createdDate = moment(new Date(createdDate)).utcOffset(0);
        createdDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
        createdDate.toISOString();
        createdDate = createdDate.format();
        console.log(createdDate);

        timesheet.find({
            userId: userId,
            date: createdDate 
        })
            .exec(function (err, result) {
                if (err) {
                    reject({ error: true, message: err });
                }
                else {
                    resolve({ error: false, result: result, message: "User timesheet get successfully " });

                }
            });
    });
}

/* Api to get the timesheet by task id*/

exports.getById = function (id) {
    return new Promise(function (resolve, reject) {

        timesheet.findOne({ _id: id })
            .exec(function (err, result) {
                console.log(err);
                console.log(result);
                if (err) {
                    reject({ error: true, message: err });
                }
                else {
                    resolve({ error: false, result: result, message: "User timesheet get successfully " });

                }
            });
    });
}






/**update timesheet*/
exports.updatetimesheet = function (id, body) {
    return new Promise(function (resolve, reject) {
        body.updatedBy = body.id;
        body.updatedDate = Date.now();
        timesheet.findOneAndUpdate({ _id: id }, { $set: body }, { new: true }, (error, task) => {
            console.log(task);
            console.log(error)
            if (error) {
                reject(error);
                return;
            }
            else if (task)
                resolve({ error: false, result: task });
            else
                resolve({ error: true, message: "No such timesheet found" })
        })
    });
}





