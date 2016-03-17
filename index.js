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
  path: '/negative/bcrypt/3/{password*}',
  config: {
    validate: {
      params: {
        password: Joi.string().max(128).min(8).alphanum()
      }
    },
    handler: function (request, reply) {
      reply(myBcrypt.hashSync(request.params.password, request.params.hash));
    }
  }
});

server.start(function () {});
