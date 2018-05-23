'use strict';
var task = require('../models/task');
var moment = require('moment');

/**
 * Create task
 * This can only be done by the logged in client.
 *
 * body client Created client object
 * no response value expected for this operation
 **/
exports.createtask = function (body) {
    return new Promise(function (resolve, reject) {

        let date = moment(new Date(body.date)).utcOffset(0);
        date.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
        date.toISOString();
        date = date.format();
        console.log(date);

        var data = new task(body);
        data.name = body.name;
        data.description = body.description;
        data.submoduleId = body.submoduleId;
        data.createdBy = body.userId;
        data.date = date;
        data.updatedBy = body.userId;
        data.createdDate = Date.now();
        data.updatedDate = Date.now();
        data.save(function (err, task) {
            if (err) {
                reject({ error: true, message: err });
                return;
            }
            else
                resolve({ error: false, result: task, message: "task created successfully" });
        })

    });
}

/* Api to get the task by task id*/
exports.gettask = function (id) {
    return new Promise(function (resolve, reject) {

        task.find({ _id: id })
            .sort({ "createdDate": -1 })
            .populate({ path: 'submoduleId.moduleId.projectId' })
            .exec(function (err, tasks) {
                if (err) {
                    reject({ error: true, message: err });
                }
                else {
                    resolve({ error: false, result: tasks });

                }
            });
    });
}



/* Api to get the task by user id, date and  status completed*/

exports.gettaskByuserId = function (id, createdDate) {
    return new Promise(function (resolve, reject) {
        createdDate = moment(new Date(createdDate)).utcOffset(0);
        createdDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
        createdDate.toISOString();
        createdDate = createdDate.format();
        console.log(createdDate);

        task.find({ 'assignTo.userId': { '$in': id }, date: createdDate ,  status: 'Completed' })
            .populate({ path: 'submoduleId.moduleId.projectId' })
            .exec(function (err, tasks) {
                if (err) {
                    reject({ error: true, message: err });
                }
                else {
                    resolve({ error: false, result: tasks });

                }
            });
    });
}


/*Api to get the task by sub module id */

exports.gettaskBySubmoduleId = function (id) {
    return new Promise(function (resolve, reject) {

        task.find({ submoduleId: id })
            .sort({ "createdDate": -1 })
            .exec(function (err, tasks) {
                if (err) {
                    reject({ error: true, message: err });
                }
                else {
                    resolve({ error: false, result: tasks });

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
exports.deletetask = function (id) {
    return new Promise(function (resolve, reject) {
        task.findOneAndRemove({ _id: id }, (error, task) => {
            if (error) {
                reject(error);
                return;
            }
            if (task)
                resolve({ error: false, result: task });
            else
                resolve({ error: true, message: "No such task found" })
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
exports.updatetask = function (id, body) {
    return new Promise(function (resolve, reject) {
        body.updatedBy = body.id;
        body.updatedDate = Date.now();
        task.findOneAndUpdate({ _id: id }, { $set: body }, { new: true }, (error, task) => {
            console.log(task);
            console.log(error)
            if (error) {
                reject(error);
                return;
            }
            else if (task)
                resolve({ error: false, result: task });
            else
                resolve({ error: true, message: "No such task found" })
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
exports.updatetaskmember = function (id, body) {
    return new Promise(function (resolve, reject) {
        body.updatedBy = body.id;
        body.updatedDate = Date.now();
        task.findOneAndUpdate({ _id: id }, { $push: { assignTo: body } }, { new: true }, (error, task) => {
            console.log(task);
            console.log(error)
            if (error) {
                reject(error);
                return;
            }
            else if (task)
                resolve({ error: false, result: task });
            else
                resolve({ error: true, message: "No such task found" })
        })
    });
}


/* Api to delete the users whom the projects are allocated*/

exports.deletetaskByassigntoId = function (id, body) {
    return new Promise(function (resolve, reject) {

        task.findOneAndUpdate({ _id: id }, { $pull: { assignTo: body.assignTo } }, { new: true }).exec(function (error, result) {
            console.log(result);
            console.log(error)
            if (error) {
                reject(error);
                return;
            }
            if (result)
                resolve({ error: false, result: result });
            else
                resolve({ error: true, message: "No such user for this project project found" })
        })
    });
}



