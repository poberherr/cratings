var Model = require('ampersand-state');

var Review = Model.extend({
    props: {
        id: 'number',
        author: 'string',
        created_at: 'number',
        item: 'string',
        ratings: 'object'
    }
});

module.exports = Review;
