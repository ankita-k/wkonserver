// 'use strict'
// const Image = require('../models/upload');
// var path = require('path');
// var multer = require('multer');
// var upload = multer({ dest: 'filesUpload/' });
// var request = require('request');
// var fs = require('fs');
// var ObjectId = require('mongodb').ObjectID;


// /* Api for file upload of the driver
// field:- file 
// */

// exports.fileUpload = function (body) {
//     return new Promise(function (resolve, reject) {
//       var image;
//       console.log("file upload");
//       console.log(body.file);
  
//       var upload = multer({
//         storage: storage,
//         fileFilter: function (body, file, cb) {
//           var ext = path.extname(file.originalname);
//           cb(null, true)
//         }
//       }).single('file');
  
  
//       upload(body,function (error) {
//         if (error) {
//           reject(error);
//           return;
//         }
//         else if (body) {
//           image = body.file;
  
//           let data = new Image({
//             file: image
//           });
  
//           data.save((error, result) => {
//             if (error) {
//               reject({ error: true, message: error });
//             } else if (result) {
//               resolve({ error: false, result: result, message: "Successfully document upload" })
//             }
//             else {
//               reject({ error: true, message: 'file upload Unsuccessfull' });
//             }
//           })
//         }
//       });
//     });
//   }













