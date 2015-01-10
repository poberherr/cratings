// DataBase PostgreSQL connection
var pg = require('pg');
var conString = "postgres://patrick:@localhost/cratings";
var Promise = require('bluebird');

var Model = require('ampersand-state');

var Review = Model.extend({
    props: {
        id: 'number',
        author: 'string',
        created_at: 'number',
        item: 'string',
        rating: 'string'
    },
    fetch: function () {
        var id = this.get('id');
        var _this = this;
        var fetchingData = new Promise(function (resolve, reject) {
            pg.connect(conString, function(err, client, done) {
                if(err) {
                    return console.error('error fetching client from pool', err);
                }
                client.query(
                    'SELECT * from reviews where id = $1',
                    [id],
                    function(err, result) {
                        done();
                        if(err) {
                            reject(err);
                        }
                        resolve(result.rows[0]);
                    }
                );
            });
        });

        fetchingData.then(function (data) {
            _this.set(Review.prototype.parse(data));
        });

        return fetchingData.then(function () {
            return _this;
        });
    }
});

var test = new Review({
    id: 1
});

test.fetch().then(console.log);

pg.connect(conString, function(err, client, done) {
    if(err) {
        return console.error('error fetching client from pool', err);
    }
    client.query(
        [
            'INSERT INTO reviews (author, created_at, item, rating)',
            'VALUES($1, $2, $3, $4)'
        ].join(' '),
        ['Dieter', '12939', 'itemstring', '"{}"'],
        function(err, result) {
            //call `done()` to release the client back to the pool
            done();

            if(err) {
                return console.error('error running query', err);
            }
            console.log(result.rows[0]);
            //output: 1
        });
    });






module.exports = Review;
