const Hapi = require('hapi');
const Path = require('path');
//const Inert  = require('inert');

const server = new Hapi.Server({});
server.connection({ port: 3000 });
//server.register(Inert, () => {});

/*server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/picture.jpg',
        handler: function (request, reply) {
            reply.file('/path/to/picture.jpg');
        }
    });

    server.start((err) => {

        if (err) {
            throw err;
        }

        console.log('Server running at:', server.info.uri);
    });
});
server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: '../test.html',
            listing: true
        }
    }
});*/

server.start((err) => {

    if (err) {
        throw err;
    }

    console.log('Server running at:', server.info.uri);
});

server.state('demo', {
  ttl: 30 * 1000,     // 30 seconds
  isHttpOnly: false,
  isSecure: true,
  path: '/',
  encoding: 'base64json',
  sign: {
    password : 'demo'
  }
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});

/*server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!'),
        directory: {
            path: './',
            listing: true
        }
    }
});

server.register({
    register: Good,
    options: {
        reporters: [{
            reporter: require('good-console'),
            events: {
                response: '*',
                log: '*'
            }
        }]
    }
}, (err) => {
    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start(() => {
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});*/
