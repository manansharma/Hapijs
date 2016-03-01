const hapi = require('hapi');
const server = new hapi.Server();
var cryptiles = require('cryptiles');
var bcryptObj = require('bcrypt');
const Basic = require('hapi-auth-basic');

server.connection({
  host: 'localhost',
  address: '127.0.0.1',
  port: 3000,
});

const users = {
    john: {
        username: 'john',
        password: 'secret',   // 'secret'
        name: 'John Doe',
        id: '2133d32a'
    }
};

const validate = function (request, username, password, callback) {
    const user = users[username];
    if (!user) {
        return callback(null, false);
    }

    /*Bcrypt.compare(password, user.password, (err, isValid) => {
        callback(err, isValid, { id: user.id, name: user.name });
    });*/
};

//Hapi.hs Server Session Test
/*server.register({
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




server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    request.session.views = request.session.views + 1 || 1;
    reply('Views: ' + request.session.views);
  },
});*/

server.register(Basic, (err) => {
    server.auth.strategy('simple', 'basic', { validateFunc: validate });
    server.route({
        method: 'GET',
        path: '/',
        config: {
            auth: 'simple',
            handler: function (request, reply) {
                reply('hello, ' + request.auth.credentials.name);
            }
        }
    });
  });



server.start();
