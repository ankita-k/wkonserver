'use strict';
var submodule = require('../models/submodule');


/**
 * Create submodule
 * This can only be done by the logged in client.
 *
 * body client Created client object
 * no response value expected for this operation
 **/
exports.createsubmodule = function (body) {
    return new Promise(function (resolve, reject) {
        var Submodule = new submodule(body);
        Submodule.name = body.name;
        Submodule.description = body.description;
        Submodule.moduleId = body.moduleId;
        Submodule.createdBy = body.userId;
        Submodule.updatedBy = body.userId;
        Submodule.createdDate = Date.now();
        Submodule.updatedDate = Date.now();


        submodule.find({ moduleId: body.moduleId, name: body.name }).exec(function (err, submodules) {
            if (err) {
                reject({ error: true, message: err });
            }
            else if (submodules.length > 0) {
                reject({ error: true, message: "Submodule already exist" });
            }
            else {
                Submodule.save(function (err, submodule) {
                    if (err) {
                        reject({ error: true, message: err });
                        return;
                    }
                    else
                        resolve({ error: false, result: submodule, message: "submodule created successfully" });
                })
            }

        });

    });
}

/* Api to get the sub modules by id */

exports.getsubmodule = function (id) {
    return new Promise(function (resolve, reject) {
        submodule.findOne({ _id: id })
            .sort({ "createdDate": -1 })
            .exec(function (err, submodules) {
                if (err) {
                    reject({ error: true, message: err });
                }
                else {
                    resolve({ error: false, result: submodules });

                }
            });
    });
}

/* Api to get the module by module id */
exports.getsubmoduleByModule = function (id) {
    return new Promise(function (resolve, reject) {

        submodule.find({ moduleId: id })
            .sort({ "createdDate": -1 })
            .exec(function (err, submodules) {
                if (err) {
                    reject({ error: true, message: err });
                }
                else {
                    resolve({ error: false, result: submodules });

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
exports.deletesubmodule = function (id) {
    return new Promise(function (resolve, reject) {
        submodule.findOneAndRemove({ _id: id }, (error, submodule) => {
            if (error) {
                reject(error);
                return;
            }
            if (submodule)
                resolve({ error: false, result: submodule });
            else
                resolve({ error: true, message: "No such submodule found" })
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
exports.updatesubmodule = function (id, body) {
    return new Promise(function (resolve, reject) {
        body.updatedBy = body.id;
        body.updatedDate = Date.now();

        submodule.find({ moduleId: body.moduleId, name: body.name }).exec(function (err, submodules) {
            if (err) {
                reject({ error: true, message: err });
            }
            else if (submodules.length > 0) {
                reject({ error: true, message: "Submodule already exist" });
            }
            else {
                submodule.findOneAndUpdate({ _id: id }, { $set: body }, { new: true }, (error, submodule) => {
                    console.log(submodule);
                    console.log(error)
                    if (error) {
                        reject(error);
                        return;
                    }
                    else if (submodule)
                        resolve({ error: false, result: submodule });
                    else
                        resolve({ error: true, message: "No such submodule found" })
                })
            }
        });
    });

}
