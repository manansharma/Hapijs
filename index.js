const hapi = require('hapi');
const server = new hapi.Server();
var cryptiles = require('cryptiles');
var bcrypt = require('bcrypt');
var hashsave;


server.connection({
  host: 'localhost',
  address: '127.0.0.1',
  port: 3000,
});

bcrypt.genSalt(10, function(err, salt) {
 bcrypt.hash('B4c0/\/', salt, function(err, hash) {
   hashsave = hash,
 });
});

// Load hash from your password DB.
bcrypt.compare('B4c0/\/', hashsave, function(err, res) {
 // res == true
});



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
}, function (err) { if (err) { throw err; } });*/




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





server.start();
