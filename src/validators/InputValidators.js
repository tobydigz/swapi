const {
    query,
    body,
} = require('express-validator/check');

exports.checkPage = query('page').isNumeric();

exports.checkSort = query('sort')
    .custom((sort) => {
        if (!sort) {
            return true;
        }
        return (sort === 'name') || (sort === 'gender') || (sort === 'height');
    });

exports.checkOrder = query('order')
    .custom((order) => {
        if (!order) {
            return true;
        }
        return (order === 'asc') || (order === 'desc');
    });

exports.checkFilter = query('filter')
    .custom((filter) => {
        if (!filter) {
            return true;
        }
        return (filter === 'male') || (filter === 'female') || (filter === 'unknown');
    });

exports.checkLimit = query('limit').isNumeric()
    .custom(limit => limit <= 20);

exports.checkOffset = query('offset').isNumeric();

exports.checkContent = body('content').exists()
    .isLength({
        min: 2,
        max: 500,
    });
