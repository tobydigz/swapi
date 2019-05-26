const {
    query,
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
