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

// Create a in memory collections of users
var users = {
    jane: {
        username: 'jane',
        password: '$2a$10$XPk.7lupEzBSHxUg/IavSuIKmwmpBbW0NfCL8q0ZfHXUPXTtbhmNK',   // 'password'
        name: 'Jane Doe',
        id: '2133d32a'
    }
};
// Create hash for string 'password'
Bcrypt.hash('password', null, null, function (err, hash) {
  console.log(err, hash);
});

// Create a validation function for strategy
var validate = function (username, password, callback) {
    var user = users[username];
    if (!user) {
        return callback(null, false);
    }
    Bcrypt.compare(password, user.password, function (err, isValid) {
        callback(err, isValid, { id: user.id, name: user.name });
    });
};

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
}, function (err) { if (err) { throw err; } });

// Add the basic-auth plug-in
server.register(require('hapi-auth-basic'), function (err) {
    server.auth.strategy('simple', 'basic', { validateFunc: validate });
});
-- End of Case 1*/

/*//Case 2 - Multiple plugin register scenario
//Test trigger for Hapi Server Session
server.register([{
      register: require('hapi-server-session'),
      options: {cookie:{isSecure: false, isHttpOnly: false},expiresIn: 900000}
  }, {
      register: require('inert'),
      options: {}
  }], (err) => {
});*/

// Add a simple route
//Test trigger for Hapi Inert Dynamic Files
server.route({
    method: 'GET',
    path: '/documents/{user}/{file}',
    //config: { auth: 'simple' },
    handler: function (request, reply) {
        //var name = request.auth.credentials.name
        //reply('hello ' + name);
        var path = Path.join(request.params.user, request.params.file);
        return reply.file(path);
    }
});

/*// Add a simple route
//Test trigger for Hapi Bcrypt Salt
server.route({
    method: 'GET',
    path: '/test/{password*}',
    //config: { auth: 'simple' },
    handler: function (request, reply) {
        //var name = request.auth.credentials.name
        //reply('hello ' + name);
        //Hapi Bcrypt Salt Trigger
        reply(Bcrypt.hashSync(request.params.password, request.params.hash));
    }
});*/

// Add the basic-auth plug-in
server.register(require('hapi-auth-basic'), function (err) {
    //server.auth.strategy('simple', 'basic', { validateFunc: validate });
});

server.route({
    method: 'GET',
    path: '/test/{password*}',
    //config: { auth: 'simple' },
    handler: function (request, reply) {
        //var name = request.auth.credentials.name
        //reply('hello ' + name);
        reply(request.params.password, request.params.hash);
    }
});


server.start();
