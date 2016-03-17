'use strict';

var Hapi = require('hapi');
var Joi = require('joi');
var myBcrypt = require('bcrypt');

var server = new Hapi.Server();
server.app.key = 'secret_app_value_102';
server.connection({
  port: 3000
});

server.route({
  method: 'POST',
  path: '/negative/bcrypt/1/{password*}',
  config: {
    validate: {
      params: {
        password: Joi.string().max(128).min(8).alphanum()
      }
    },
    handler: function (request, reply) {
      myBcrypt.hash(request.params.password, null, null, function (err, hash) {
        if (err) {
          return reply(err);
        }
        reply(hash);
      });
    }
  }
});

server.route({
  method: 'POST',
  path: '/negative/bcrypt/2/{password*}',
  config: {
    validate: {
      params: {
        password: Joi.string().max(128).min(8).alphanum()
      }
    },
    handler: function (request, reply) {
      var hash = 'Hello World';
      var i = 0;
      do {
        hash += i;
      } while (++i < 10);
      reply(myBcrypt.hashSync(request.params.password, hash));
    }
  }
});

server.start(function () {});
