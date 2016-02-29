module.exports = function(app) {
  'use strict';

  server.register({
    register: require('hapi-server-session'),
    options: {
      cookie: {
        isSecure: true,
        isHttpOnly: false
      },
      expiresIn: 9000000,
      //key: cryptiles.randomString(16);
    },
  }, function (err) { if (err) { throw err; } });

  //const cache = server.cache({ segment: 'countries', expiresIn: 60 * 60 * 1000 });
};
