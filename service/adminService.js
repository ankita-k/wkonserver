'use strict';
var admin = require('../models/admin');


/**
 * Create admin
 * This can only be done by the logged in admin.
 *
 * body admin Created admin object
 * no response value expected for this operation
 **/
exports.createAdmin = function (body) {
  return new Promise(function (resolve, reject) {
    var data = new admin(body);
    
    data.save(function (err, result) {
      if (err) {
        if (err.errors && err.errors.email)  // error check if email is not present
        {
          reject({ "message": "Email is required to create a admin" })
        }
        else if (err.code == 11000) // error check if email is not unique
        {
          reject({ "message": "This email already exists" })
        }
        else
          reject(err);

        return;
      }
      resolve(result);
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
 * Delete admin
 * This can only be done by the logged in admin.
 * ID String The name that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteAdmin = function (id) {
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
        resolve({message:"No such admin found"})
      })
  });
}


/**
 * Get admin by admin id
 * 
 *
 * admin id String The id that needs to be fetched. Use admin for testing. 
 * returns admin
 **/
exports.getAdminById = function (adminId) {
  return new Promise(function (resolve, reject) {
    admin.findOne({ _id: adminId}, (error, result) => {
        console.log(result);
        console.log(error)
        if (error) { 
          reject(error);
          return;
        }
        if(result)
        resolve(result);
        else
        resolve({message:"No such admin found"})
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
exports.loginAdmin = function (email, password) {
  return new Promise(function (resolve, reject) {
    admin.findOne({ email: email, password: password },{password:0}, (error, result) => {
      console.log(result);
      console.log(error)
      if (error) {
        reject(error);
        return;
      }
      if(result)
      resolve(result);
      else
      resolve({message:"Invalid email or password"})
    })

  });
}


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
 * Updated admin
 * This can only be done by the logged in admin.
 *
 * admin id  that need to be updated
 * body admin Updated admin object
 * no response value expected for this operation
 **/
exports.updateAdmin = function (id, body) {
  return new Promise(function (resolve, reject) {
    admin.findOneAndUpdate({ _id: id},{$set:body},{password:0}, (error, result) => {
        console.log(result);
        console.log(error)
        if (error) { 
          reject(error);
          return;
        }
        if(result)
        resolve(result);
        else
        resolve({message:"No such admin found"})
      })
  });
}
