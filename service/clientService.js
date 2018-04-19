'use strict';
var Client = require('../models/client');


/**
 * Create client
 * This can only be done by the logged in client.
 *
 * body client Created client object
 * no response value expected for this operation
 **/
exports.createClient = function (body) {
  return new Promise(function (resolve, reject) {
    var client = new Client({
      name: body.name,
      password: 'password',
      country: body.country,
      email: body.email,
      domain: body.domain,
      phoneNumber: body.phoneNumber,
      status: body.status,
      createdBy: body.userId,
      updatedBy: body.userId
    });
    console.log(client.domain);
    // client.createdBy;
    client.save(function (err, client) {
      if (err) {
        if (err.errors && err.errors.email)  // error check if email is not present
        {
          reject({error: true, "message": "Email is required to create a client" })
        }
        else if (err.code == 11000) // error check if email is not unique
        {
          reject({error: true, "message": "This email already exists" })
        }
        else
          reject({error:true,message:err});

        return;
      }
      resolve({error:false,result:client});
    })

  });
}

exports.getClientList = function (id) {
  return new Promise(function (resolve, reject) {
    // let perPage = parseInt(limit) ? parseInt(limit) : 10;
    // let pageCount = parseInt(page) ? parseInt(page) : 0;
    Client.find({ createdBy: id })
      .sort({"createdDate": -1 })
      // .limit(perPage)
      // .skip(perPage * pageCount)
      .then(clientList => {
        resolve({error:false, result:clientList});
      }).catch(err => {
        reject({error:true,message:err});
      })
  });
}

/**
 * Creates list of clients with given input array
 * 
 *
 * body List List of client object
 * no response value expected for this operation
 **/
exports.createclientsWithArrayInput = function (body) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
}


/**
 * Creates list of clients with given input array
 * 
 *
 * body List List of client object
 * no response value expected for this operation
 **/
exports.createclientsWithListInput = function (body) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
}


/**
 * Delete client
 * This can only be done by the logged in client.
 * clientname String The name that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteclient = function (id) {
  return new Promise(function (resolve, reject) {
    Client.findOneAndRemove({ _id: id }, (error, client) => {
      console.log(client);
      console.log(error)
      if (error) {
        reject(error);
        return;
      }
      if (client)
      resolve({error:false, result:client});
      else
        resolve({ error:true,message: "No such client found" })
    })
  });
}


/**
 * Get client by client name
 * 
 *
 * clientname String The name that needs to be fetched. Use client1 for testing. 
 * returns client
 **/
exports.getclientById = function (id) {
  return new Promise(function (resolve, reject) {
    Client.findOne({ _id: id }, (error, result) => {
      console.log(result);
      console.log(error)
      if (error) {
        reject(error);
        return;
      }
      if (result)
      resolve({error:false, result:result});
      else
        resolve({error:true, message: "No such client found" })
    })
  });
}


/**
 * Logs client into the system
 * 
 *
 * clientname String The client name for login
 * password String The password for login in clear text
 * returns String
 **/
exports.loginclient = function (email, password) {
  return new Promise(function (resolve, reject) {
    Client.findOne({ email: email, password: password }, { password: 0 }, (error, client) => {
      console.log(client);
      console.log(error)
      if (error) {
        reject(error);
        return;
      }
      if (client)
      resolve({error:false, result:result});
      else
        resolve({error:true, message: "Invalid email or password" })
    })

  });
}


/**
 * Logs out current logged in client session
 * 
 *
 * no response value expected for this operation
 **/
// exports.logoutclient = function () {
//   return new Promise(function (resolve, reject) {
//     resolve();
//   });
// }


/**
 * Updated client
 * This can only be done by the logged in client.
 *
 * clientname String name that need to be updated
 * body client Updated client object
 * no response value expected for this operation
 **/
exports.updateClient = function (id, body) {
  return new Promise(function (resolve, reject) {
    body.updatedBy = body.userId;
    body.updatedDate = Date.now();
    Client.findOneAndUpdate({ _id: id }, { $set: body }, { new: true, password: 0 }, (error, client) => {
      console.log(client);
      console.log(error)
      if (error) {
        reject(error);
        return;
      }
      if (client)
      resolve({error:false, result:client});
      else
        resolve({error:true, message: "No such client found" })
    })
  });
}

