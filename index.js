const hapi = require('hapi');
const server = new hapi.Server();
var cryptiles = require('cryptiles');

server.connection({
  host: 'localhost',
  address: '127.0.0.1',
  port: 3000,
});

//Hapi Server Session Tests
//require('./hapi-server-session-test/hapi.server.session.test.js')(app);

server.register({
  register: require('hapi-server-session'),
  options: {
    cookie: {
      isSecure: true,
      
    },
    expiresIn: 12000000000000000000000,
    //key: cryptiles.randomString(16);
  },
}, function (err) { if (err) { throw err; } });


server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    request.session.views = request.session.views + 1 || 1;
    reply('Views: ' + request.session.views);
  },
});

/*Hapi Inert File Inclusion Test
server.register(Inert, () => {});

server.route({
    method: 'GET',
    path: '/documents/{user}/{file}',
    handler: function(request, reply) {
        var path = Path.join(request.params.user, request.params.file);
        return reply.file(path);
    }
});
End of Inert File Inclusion Test*/

server.start();
