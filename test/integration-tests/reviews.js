var Promise = require('bluebird');
var request = Promise.promisify(require('request'));

var domain = 'http://localhost:8889/reviews';



describe('/reviews/', function () {
    describe('when posting a review', function(){
        var response;
        beforeEach(function(){
            response = request({
                url: 'http://localhost:8889/reviews',
                method: 'POST',
                json: {
                    "id": 123,
                    "author": "Herman Whatever",
                    "created_at": 12323423453425,
                    "item": "/items/456",
                    "ratings": {
                        "review": "great shit man",
                        "delivery_time": 120,
                        "delivery_time_satisfaction": 0.7,
                        "food_quality": 0.5
                    }
                }
            });
        });

        it('should reply with 201 created', function () {
            var statusCode = response.spread(function (response, body) {
                return response.statusCode;
            });
            return statusCode.should.eventually.eql(201);
        });
    });
});
