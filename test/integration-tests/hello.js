var Promise = require('bluebird');
var request = Promise.promisify(require('request'));

describe('/hello', function () {
    it('should reply with hello world', function () {
        var response = request('http://localhost:8889/hello');
        var body = response.spread(function (response, body) {
            return body;
        });
        return body.should.eventually.eql('hello world');
    });
});

