var Hapi = require('hapi');


var Review = require('./lib/models/review');
var Reviews = require('./lib/collections/reviews');

var reviews = new Reviews();




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
        var review = new Review(request.payload);
        reviews.add(review);
        var response = review.toJSON();
        reply(response).code(201);
    }
});

server.route({
    method: 'GET',
    path:'/reviews',
    handler: function (request, reply) {
        var response = reviews.toJSON();
        reply(response).code(200);
    }
});

server.route({
    method: 'GET',
    path:'/reviews/{id}',
    handler: function (request, reply) {
        var response = reviews.get(request.params.id).toJSON();
        reply(response).code(200);
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
