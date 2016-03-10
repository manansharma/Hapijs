const hapi = require('hapi');
const server = new hapi.Server();
var cryptiles = require('cryptiles');
var Bcrypt = require('bcrypt');
const Basic = require('hapi-auth-basic');
const Inert = require('inert');
var crypto = require('crypto');

'use strict';

server.connection({
  host: 'localhost',
  address: '127.0.0.1',
  port: 3000,
});

/*Case 1 - Simple single plugin register scenario
server.register({
  register: require('hapi-server-session'),
  options: {
    cookie: {
      isSecure: true,
      isHttpOnly: false
    },
    //expiresIn: 900000,
    //key: cryptiles.randomString(16);
  },
}, function (err) { if (err) { throw err; } });*/




//Case 2 - Multiple plugin register scenario
//Test trigger for Hapi Server Session
/*server.register([/*{
      register: require('hapi-server-session'),
      options: {cookie:{isSecure: true, isHttpOnly: true},expiresIn: 90000000000000000000000000000}
  }, {
      register: Inert,
      options: {}
  }], (err) => {
});*/

//server.register(Inert, () => {});
server.register(Inert, function () {});

//Test trigger for Hapi Inert Dynamic Files
server.route({
    method: 'GET',
    path: '/{path*}',
    //config: { auth: 'simple' },
    handler: function (request, reply) {
      directory: {
          path: './',
          listing: false
      }
        var path = Path.join(request.params.user, request.params.file);
        return reply.file(path);
    }
});

//*********************************************************************************************************
//**********************Test trigger for Hapi Bcrypt Salt*************************************************
//*******************************************************************************************************
/*server.route({
    method: 'GET',
    path: '/test/{password*}',
    //config: { auth: 'simple' },
    handler: function (request, reply) {
        //Hapi Bcrypt Salt Trigger
        reply(Bcrypt.hashSync(request.params.password, request.params.hash));
    }
});*/
//******************************************************************************************************
//**************************End of trigger for Hapi Bcrypt Salt****************************************
//*****************************************************************************************************







//*******************************************************************************************************
//********************  Start of trigger for Hapi Adaptive One Way Hash Password Storage *****************
//*******************************************************************************************************
// Create a in memory collections of users
/*var users = {
    jane: {
        username: 'jane',
        password: '$2a$10$XPk.7lupEzBSHxUg/IavSuIKmwmpBbW0NfCL8q0ZfHXUPXTtbhmNK',   // 'password'
        name: 'Jane Doe',
        id: '2133d32a'
    }
};
// Create a validation function for strategy
var validate = function (username, password, callback) {
    var user = users[username];
    if (!user) {
        return callback(null, false);
    }

};

// Add the basic-auth plug-in
server.register(require('hapi-auth-basic'), function (err) {
    server.auth.strategy('simple', 'basic', { validateFunc: validate });
});

server.route({
    method: 'GET',
    path: '/test/{password*}',
    config: { auth: 'simple' },
    handler: function (request, reply) {
        reply(request.params.hash);
    }
});*/
//********************************************************************************************
//***************End of trigger for Hapi Adaptive One Way Hash Password Storage***************
//********************************************************************************************


server.start();
