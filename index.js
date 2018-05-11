'use strict';

var fs = require('fs'),
  path = require('path'),
  http = require('http');

var mongoose = require('mongoose');
var app = require('connect')();
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var serverPort = 5088;
var cors = require('cors')
var Cryptr = require('cryptr'),
  cryptr = new Cryptr('thisissecretapikey');


/* socket variables */
var server = http.createServer(app);
var helper = require('./utils/helper');

app.use(cors());

// swaggerRouter configuration
var options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname, 'api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());




  // app.use(middleware.swaggerSecurity({
  //   key: function(req, def, scopes, callback) {
  //     console.log(req.headers['x-api-key']);
  //     // var key = cryptr.decrypt(req.headers['x-api-key']);
  //     //       console.log(key);

  //     if (req.headers['x-api-key'] == 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk=')
  //     callback();
  //     else
  //     {
  //      callback (new Error({message:"Unautharized access"}))
  //     }
  //   }
  // }));

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  mongoose.connect('mongodb://localhost/wkon');
  mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
  mongoose.connection.once('open', function () {

    // http.createServer(app).listen(serverPort, function () {
    //   console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    //   console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
    // });
    
    server.listen(serverPort, function () {
      console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
      console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
      var io = require('socket.io').listen(server);

      io.on('connection', function (socket) {
        console.log('a user connected');
        socket.on('disconnect', function () {
          console.log('user disconnected');

        });
      });
      io.use(function (socket, next) {
        if (socket.request._query['userId'] != 'null' || socket.request._query['userId'] != undefined) {
          helper.addSocketId(socket.request._query['userId'], socket.id, (error, response) => {

          });

          next();
        }
      });

      exports.server = server
      exports.io = io
    });

  });


});
