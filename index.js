const hapi = require('hapi');
const server = new hapi.Server();
var cryptiles = require('cryptiles');
var bcrypt = require('bcrypt');
const Basic = require('hapi-auth-basic');



server.connection({
  host: 'localhost',
  address: '127.0.0.1',
  port: 3000,
});

const users = {
    john: {
        username: 'john',
        password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',   // 'secret'
        name: 'John Doe',
        id: '2133d32a'
    }
};

//bcrypt.genSalt(10, function(err, salt) {
 bcrypt.hash('B4c0/\/', 'T20', function(err, hash) {
   hashsave = hash,
 });
//});

/*const validate = function (request, username, password, callback) {
    const user = users[username];
    if (!user) {
        return callback(null, false);
    }

    bcrypt.compare('B4c0/\/', user.password, (err, isValid) => {
        callback(err, isValid, { id: user.id, name: user.name });
    });
};*/
bcrypt.compare('B4c0/\/', "T20", function(err, res) {
 // res == true
});



//Hapi.hs Server Session Test
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




/*server.route({
  method: 'GET',
  path: '/',
  config: {
              auth: 'simple',
              handler: function (request, reply) {
                  reply('hello, ' + request.auth.credentials.name);
              }
          }
});*/
server.start();

/*server.register(Basic, (err) => {
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

    server.start(() => {
        console.log('server running at: ' + server.info.uri);
    });
});*/
