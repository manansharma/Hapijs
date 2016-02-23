const hapi = require('hapi');
const server = new hapi.Server();

server.connection({
  host: 'localhost',
  address: '127.0.0.1',
  port: 3000,
});

server.register({
  register: require('hapi-server-session'),
  options: {
    /*cookie: {
      isSecure: true,
      isHttpOnly: true
    },*/
    //expiresIn: 1200000
  },
}, function (err) { if (err) { throw err; } });

//const cache = server.cache({ segment: 'countries', expiresIn: 60 * 60 * 1000 });

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    request.session.views = request.session.views + 1 || 1;
    reply('Views: ' + request.session.views);
  },
});

server.start();
