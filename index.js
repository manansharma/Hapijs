const hapi = require('hapi');
const server = new hapi.Server();
var cryptiles = require('cryptiles');
var bcryptObj = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var pass = '123456789';

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
      isHttpOnly: true
    },
    expiresIn: 900000,
    //key: cryptiles.randomString(16);
  },
}, function (err) { if (err) { throw err; } });

Bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {

  if(err) {
                return console.error(err);
        }

        Bcrypt.hash(pass, salt, function(err, hash) {
                if(err) {
                        return console.error(err);
                }

                console.log(hash);

                Bcrypt.compare(pass, hash, function(err, isMatch) {
                        if(err) {
                                return console.error(err);
                        }

                        console.log('do they match?', isMatch);
                });

        });
});

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
