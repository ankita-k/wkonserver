'use strict';
var User = require('../models/user');
var project = require('../models/project');

/**
 * Create user
 * This can only be done by the logged in user.
 *
 * body User Created user object
 * no response value expected for this operation
 **/
exports.createUser = function (body) {
  return new Promise(function (resolve, reject) {
    var user = new User(body);
    // user.createdBy;
    user.save(function (err, user) {
      if (err) {
        if (err.errors && err.errors.email)  // error check if email is not present
        {
          reject({ "message": "Email is required to create a user" })
        }
        else if (err.code == 11000) // error check if email is not unique
        {
          reject({ "message": "This email already exists" })
        }
        else
          reject({error:true,err});

        return;
      }
      resolve({error:false,result:user});
    })

  });
}


/**
 * Creates list of users with given input array
 * 
 *
 * body List List of user object
 * no response value expected for this operation
 **/
exports.createUsersWithArrayInput = function (body) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
}


/**
 * Creates list of users with given input array
 * 
 *
 * body List List of user object
 * no response value expected for this operation
 **/
// exports.createUsersWithListInput = function (body) {
//   return new Promise(function (resolve, reject) {
//     resolve();
//   });
// }


/**
 * Delete user
 * This can only be done by the logged in user.
 *
 * username String The name that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteUser = function (username) {
  return new Promise(function (resolve, reject) {
    User.findOneAndRemove({ _id: id }, (error, user) => {
      console.log(user);
      console.log(error)
      if (error) {
        reject(error);
        return;
      }
      if (user)
        resolve({error:false,result:user});
      else
        resolve({ error:true,message: "User does not exist" })
    })

  });
}


/**
 * Get user by user name
 * 
 *
 * username String The name that needs to be fetched. Use user1 for testing. 
 * returns User
 **/
exports.getUserById = function (id) {
  return new Promise(function (resolve, reject) {
    User.findOne({ _id: id }, (error, user) => {
      console.log(user);
      console.log(error)
      if (error) {
        reject(error);
        return;
      }
      if (user)
      resolve({error:false,result:user});
      else
        resolve({error:true, message: "User does not exist" })
    })

  });
}


/**
 * Logs user into the system
 * 
 *
 * username String The user name for login
 * password String The password for login in clear text
 * returns String
 **/
exports.loginUser = function (email, password) {
  return new Promise(function (resolve, reject) {
    User.findOne({ email: email, password: password }, { password: 0 }, (error, user) => {
      console.log(user);
      console.log(error)
      if (error) {
        reject(error);
        return;
      }
      if (user) {
        resolve({ error: false, message: "User logged in successfully", result: user });
        user.lastLogin = Date.now();
        user.save().then(result => {
          console.log('lastLogin of ' + result.name + ' : ' + result.lastLogin)
        })

      }
      else
        resolve({ error: true, message: "Invalid email or password" })
    })

  });
}


/**
 * Logs out current logged in user session
 * 
 *
 * no response value expected for this operation
 **/
// exports.logoutUser = function () {
//   return new Promise(function (resolve, reject) {
//     resolve();
//   });
// }


/**
 * Updated user
 * This can only be done by the logged in user.
 *
 * username String name that need to be updated
 * body User Updated user object
 * no response value expected for this operation
 **/
exports.updateUser = function (id, body) {
  return new Promise(function (resolve, reject) {
    User.findOneAndUpdate({ _id: id }, { $set: body }, { new: true, password: 0 }, (error, result) => {
      console.log(result);
      console.log(error)
      if (error) {
        reject(error);
        return;
      }
      if (result)
       resolve({error:false,result:result});
      else
        resolve({ error:true,message: "No such user found" })
    })
  });
}
/*  api for reset password
*/
exports.resetPassword = function (body) {
  return new Promise(function (resolve, reject) {
    console.log(body);
    User.findOne({ _id: body.id, password: body.password }, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      if (result) {
        result.password = body.newPassword
        result.save()
          .then(user => {
            resolve({ error: false, result: user });
          }).catch(err => {
            reject(err);
          })

      }
      else
        resolve({ error: true, message: "Wrong password" })
    })
  });
}

/* Pi to get the user dashboard details
*/
exports.userDashboardDetails = function (id) {
  return new Promise(function (resolve, reject) {
    console.log(id);
    project.aggregate([
      {
        $match: { createdBy: id }
      },
      { $group: { _id: "status", count: { $sum: 1 } } }
    ], (error, res) => {
      console.log("res", res);
      if (error) {
        reject(error)
        return;
      }
      else if (res) {
        if (res.length == 0) {
          resolve({ error: false, message: "Dashboard details" })
          return;
        }
        res.forEach((element, index, array) => {
          console.log("element", element);
          count++;
          if (element._id == 'New')
            resolve({ New :element.count })
          else if (element._id == 'InDiscussion')
            resolve({ InDiscussion :element.count });
          else if (element._id == 'Scoping')
            resolve({ Scoping : element.count });
          else if (element._id == 'InProgess')
            resolve({ InProgess : element.count });
          else if (element._id == 'Stalled')
            resolve({ Stalled : element.count });
          else if (element._id == 'Completed')
            resolve({ Completed : element.count });
          if (count == array.length) {
            resolve({ error: false, result: array.length, message: "Dashboard details" })
          }
        });

      }
    })
  });
}



