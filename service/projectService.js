'use strict';
var project = require('../models/project');
var Server = require('../index');
var helper = require('../utils/helper');


/**
 * Create project
 *
 * body project Created project object
 * no response value expected for this operation
 **/
exports.createProject = function (body) {
  return new Promise(function (resolve, reject) {
    console.log(body);
    var data = new project({
      name: body.name,
      requirement: body.requirement,
      status: body.status,
      technology: body.technology,
      expectedStartDate: body.expectedStartDate,
      actualStartDate: body.actualStartDate,
      expectedEndDate: body.expectedEndDate,
      // actualendDate:new Date(body.actualendDate),
      createdBy: body.userId,
      updatedBy: body.userId,
      client: body.client,
      members: [
        {
          userId: body.userId,
          role: 'Owner'
        }]
    });
    // console.log(data);
    data.save(function (err, result) {
      if (err) {
        reject({ error: true, message: err });
        return;
      }
      else if (result) {
        console.log(result)
        data.populate('client', function (err, res) {
          Server.io.emit('projectCreated', res);
          resolve({ error: false, result: res });
        });
      }
    })
  });
}

exports.getProjectList = function (id) {
  return new Promise(function (resolve, reject) {
    // let perPage = parseInt(limit) ? parseInt(limit) : 10;
    // let pageCount = parseInt(page) ? parseInt(page) : 0;
    project.find({ "members.userId": id })
      .populate({ path: 'client' })
      .sort({ "createdDate": -1 })
      // .limit(perPage)
      // .skip(perPage * pageCount)
      .then(projectList => {
        resolve({ error: false, result: projectList });
      }).catch(err => {
        reject({ error: true, message: err });
      })
  });
}

/**
 * Creates list of admin with given input array
 * 
 *
 * body List List of admin object
 * no response value expected for this operation
 **/
// exports.createclientsWithArrayInput = function (body) {
//   return new Promise(function (resolve, reject) {
//     resolve();
//   });
// }


/**
 * Creates list of admin with given input array
 * 
 *
 * body List List of admin object
 * no response value expected for this operation
 **/
// exports.createclientsWithListInput = function (body) {
//   return new Promise(function (resolve, reject) {
//     resolve();
//   });
// }


/**
 * Delete project
 * This can only be done by the logged in Client.
 * ID the project that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteProject = function (id) {
  return new Promise(function (resolve, reject) {
    project.findOneAndRemove({ _id: id }, (error, result) => {
      console.log(result);
      console.log(error)
      if (error) {
        reject(error);
        return;
      }
      if (result)
        resolve({ error: false, result: result });
      else
        resolve({ error: true, message: "No such Project found" })
    })
  });
}


/**
 * Get project by project id
 * 
 *
 * project id String The id that needs to be fetched. Use admin for testing. 
 * returns project
 **/
exports.getProjectById = function (id) {
  return new Promise(function (resolve, reject) {

    project.findOne({ _id: id }).populate({ path: 'client' }).exec(function (error, result) {
      console.log(result);
      console.log(error)
      if (error) {
        reject(error);
        return;
      }
      if (result)
        resolve({ error: false, result: result });
      else
        resolve({ error: true, message: "No such Project found" })
    })
  });
}


/**
 * Logs admin into the system
 * 
 *
 * admin email String The admin email for login
 * password String The password for login in clear text
 * returns String
 **/
// exports.loginAdmin = function (email, password) {
//   return new Promise(function (resolve, reject) {
//     admin.findOne({ email: email, password: password },{password:0}, (error, result) => {
//       console.log(result);
//       console.log(error)
//       if (error) {
//         reject(error);
//         return;
//       }
//       if(result)
//       resolve(result);
//       else
//       resolve({message:"Invalid email or password"})
//     })

//   });
// }


/**
 * Logs out current logged in admin session
 * 
 *
 * no response value expected for this operation
 **/
// exports.logoutAdmin = function () {
//   return new Promise(function (resolve, reject) {
//     resolve();
//   });
// }


/**
 * Updated project
 * This can only be done by the logged in project.
 *
 * admin id  that need to be updated
 * body project Updated admin object
 * no response value expected for this operation
 **/
exports.updateProject = function (id, body) {
  return new Promise(function (resolve, reject) {
    project.findOneAndUpdate({ _id: id }, { $set: body }, { new: true }).populate({ path: 'client' }).exec(function (error, result) {
      console.log(result);
      console.log(error)
      if (error) {
        reject(error);
        return;
      }
      if (result)
        resolve({ error: false, result: result });
      else
        resolve({ error: true, message: "No such project found" })
    })
  });
}

/* Api to update members for the project
*/
// exports.updateProjectByMembers = function (id, body) {
//   console.log(body);
//   return new Promise(function (resolve, reject) {
//     project.findOneAndUpdate({ _id: id }, { 'members': { $in: [{ $ne: body }] } }, { $pushAll: { members: body } }, { upsert: true, new: true }).populate({ path: 'client' }).exec(function (error, result) {
//       console.log(result);
//       console.log(error)
//       if (error) {
//         reject(error);
//         return;
//       }
//       if (result)
//         resolve({ error: false, result: result });
//       else
//         resolve({ error: true, message: "No such project found" })
//     })
//   });
// }

/* Api to update members whow are not allocated to the project */

exports.updateProjectByMembers = function (id, body) {
  let arrayofId = body.map(element => element.userId);
  let newArray = [];
  return new Promise(function (resolve, reject) {
    project.findOne({ _id: id, 'members.userId': { '$in': arrayofId } }, { 'members': 1 }).populate({ path: 'client' }).exec(function (error, result) {
      if (result && result.members.length > 1) {
        console.log(result.members);

        arrayofId = result.members.map(element => {
          if (element.userId)
            return (element.userId._id).toString()
        });
        console.log(arrayofId);
        newArray = body.filter((obj) => {
          return arrayofId.indexOf(obj.userId) == -1;
        })
      }
      else {
        arrayofId = [];
        newArray = body;
      }

      console.log(newArray)
      if (error) {
        reject(error);
        return;
      }
      else {
        project.findOneAndUpdate({ _id: id }, { $pushAll: { members: newArray } }, { upsert: true, new: true }).populate({ path: 'client' }).exec(function (error, result) {
          console.log(result);
          console.log(error)
          if (error) {
            reject(error);
            return;
          }
          if (result)
            resolve({ error: false, result: result });
          else
            resolve({ error: true, message: "No such project found" })
        })
      }
    })

  });
}

exports.getProjectByMembers = function (id) {
  return new Promise(function (resolve, reject) {

    project.findOne({ 'members.userId': { '$in': id } }).populate({ path: 'client' }).exec(function (error, result) {
      console.log(result);
      console.log(error)
      if (error) {
        reject(error);
        return;
      }
      if (result)
        resolve({ error: false, result: result });
      else
        resolve({ error: true, message: "No such user for this project found" })
    })
  });
}

exports.deleteProjectByMemberId = function (id, userId) {
  return new Promise(function (resolve, reject) {

    project.findOneAndUpdate({ _id: id }, { $pull: { members: userId } }, { new: true }).populate({ path: 'client' }).exec(function (error, result) {
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







