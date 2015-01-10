var Collection = require('ampersand-collection');
var Review = require('../models/review');

var Reviews = Collection.extend({
    model: Review
});

module.exports = Reviews;
