'use strict';
var moduleService = require('../models/module');


/**
 * Create module
 * This can only be done by the logged in client.
 *
 * body client Created client object
 * no response value expected for this operation
 **/
exports.createmodule = function (body) {
    return new Promise(function (resolve, reject) {
        var module = new moduleService(body);
        module.name = body.name;
        module.description = body.description;
        module.createdBy = body.userId;
        module.updatedBy = body.userId;
        module.createdDate = Date.now();
        module.updatedDate = Date.now();
        module.save(function (err, module) {
            if (err) {
                reject({ error: true, message: err });
                return;
            }
            else
            resolve({ error: false, result: module, message:"module created successfully" });
        })

    });
}
/* Api to get the modules by id*/

exports.getmodule = function (id) {
    return new Promise(function (resolve, reject) {
       
        moduleService.find({_id: id })
            .sort({ "createdDate": -1 })
            .exec(function (err, modules) {
                if (err) {
                    reject({ error: true, message: err });
                }
                else {
                    resolve({ error: false, result: modules });

                }
            });
    });
}


/* Api to get the modules by project id*/

exports.getmoduleBYProjectId = function (id) {
    return new Promise(function (resolve, reject) {
       
        moduleService.find({projectId: id })
            .sort({ "createdDate": -1 })
            .exec(function (err, modules) {
                if (err) {
                    reject({ error: true, message: err });
                }
                else {
                    resolve({ error: false, result: modules });

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
exports.deletemodule = function (id) {
    return new Promise(function (resolve, reject) {
        moduleService.findOneAndRemove({ _id: id}  ,(error, module) => {
            if (error) {
                reject(error);
                return;
            }
            if (module)
                resolve({ error: false, result: module });
            else
                resolve({ error: true, message: "No such module found" })
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
exports.updatemodule = function (id,body) {
    return new Promise(function (resolve, reject) {
        body.updatedBy = body.id;
        body.updatedDate = Date.now();
        moduleService.findOneAndUpdate({ _id: id }, { $set: body }, { new: true }, (error, module) => {
            console.log(module);
            console.log(error)
            if (error) {
                reject(error);
                return;
            }
            else if (module)
                resolve({ error: false, result: module });
            else
                resolve({ error: true, message: "No such module found" })
        })
    });
}









