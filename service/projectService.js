'use strict';
var project = require('../models/project');


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
      members:[
        {
          userId:body.userId,
          role:'Owner'
        }]
    });
    // console.log(data);
    data.save(function (err, result) {
      if (err) {
          reject({error:true,message:err});
        return;
      }
      resolve({error:false,result:result});
    })
  });
}

exports.getProjectList = function (id, page, limit) {
  return new Promise(function (resolve, reject) {
    let perPage = parseInt(limit) ? parseInt(limit) : 10;
    let pageCount = parseInt(page) ? parseInt(page) : 0;
    project.find({ "members.userId": id })
      .sort({ createdDate: -1 })
      .limit(perPage)
      .skip(perPage * pageCount)
      .then(projectList => {
        resolve({error:false, result:projectList});
      }).catch(err => {
        reject({error:true,message:err});
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
    admin.findOneAndRemove({ _id: id}, (error, result) => {
        console.log(result);
        console.log(error)
        if (error) { 
          reject(error);
          return;
        }
        if(result)
        resolve(result);
        else
        resolve({message:"No such Project found"})
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
exports.getProjectById = function (adminId) {
  return new Promise(function (resolve, reject) {
   
    admin.findOne({ _id: id}, (error, result) => {
        console.log(result);
        console.log(error)
        if (error) { 
          reject(error);
          return;
        }
        if(result)
        resolve(result);
        else
        resolve({message:"No such Project found"})
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
    admin.findOneAndUpdate({ _id: id},{$set:body},{new:true,password:0}, (error, result) => {
        console.log(result);
        console.log(error)
        if (error) { 
          reject(error);
          return;
        }
        if(result)
        resolve(result);
        else
        resolve({message:"No such project found"})
      })
  });
}
