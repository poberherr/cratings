var Hapi = require('hapi');

var Review = require('./lib/models/review');

var serverConfig = {
    host: '0.0.0.0',
    port: 8889
}

// Create a server with a host and port
var server = new Hapi.Server();
server.connection(serverConfig);

// Add the route
server.route({
    method: 'POST',
    path:'/reviews',
    handler: function (request, reply) {
        console.log(request)
        var review = new Review(request.payload)
        reply(review.toJSON()).code(201);
    }
});

server.route({
    method: 'GET',
    path:'/hello',
    handler: function (request, reply) {
        reply('hello world');
    }
});

// Start the server
server.start();
