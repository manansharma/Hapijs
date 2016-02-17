const hapi = require('hapi');

server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    /*server.route({
        method: 'GET',
        path: '/picture.jpg',
        handler: function (request, reply) {
            reply.file('/picture.jpg');
        }
    });

    server.route({
        method: 'GET',
        path: '/{filename}',
        handler: {
            file: function (request) {
                return request.params.filename;
            }
        }
    });*/

    server.route({
        method: 'GET',
        path: '/documents/{user}/{file}',
        handler: function(request, reply) {
            var path = Path.join(request.params.user, request.params.file);
            return reply.file(path);
        }
    });

    server.start((err) => {

        if (err) {
            throw err;
        }

        console.log('Server running at:', server.info.uri);
    });
});
