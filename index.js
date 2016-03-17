'use strict';

var Hapi = require('hapi');
var Joi = require('joi');
var bcrypt = require('bcrypt');

var server = new Hapi.Server();
server.app.key = 'secret_app_value_102';
server.connection({
  port: 3000
});

server.route({
  method: 'POST',
  path: '/positive/bcrypt/1/{password*}',
  config: {
    validate: {
      params: {
        password: Joi.string().max(128).min(8).alphanum()
      }
    },
    handler: function (request, reply) {
      //var salt1 = bcrypt.genSaltSync(10); // param is optional
      reply(bcrypt.hashSync(request.params.password, bcrypt.genSaltSync(10)));
    }
  }
});

server.route({
  method: 'POST',
  path: '/positive/bcrypt/2/{password*}',
  config: {
    validate: {
      params: {
        password: Joi.string().max(128).min(8).alphanum()
      }
    },
    handler: function (request, reply) {
      bcrypt.genSalt(10, function (err, salt) { // first param is optional
        if (err) {
          return reply(err);
        }
        reply(bcrypt.hashSync(request.params.password, salt));
      });
    }
  }
});

server.route({
  method: 'POST',
  path: '/positive/bcrypt/3/{password*}',
  config: {
    validate: {
      params: {
        password: Joi.string().max(128).min(8).alphanum()
      }
    },
    handler: function (request, reply) {
      bcrypt.genSalt(function (err, res) {
        if (!err) {
          reply(bcrypt.hashSync(request.params.password, res));
        } else {
          reply("Internal Error");
        }
      });
    }
  }
});

server.route({
  method: 'POST',
  path: '/positive/bcrypt/4/{password*}',
  config: {
    validate: {
      params: {
        password: Joi.string().max(128).min(8).alphanum()
      }
    },
    handler: function (request, reply) {
      bcrypt.genSalt(function (err, res) {
        if (!err) {
          bcrypt.hash(request.params.password, res, null, function (err, hash) {
            if (err) {
              return reply(err);
            }
            reply(hash);
          });
        } else {
          reply("Internal Error");
        }
      });
    }
  }
});

server.start(function () {});
