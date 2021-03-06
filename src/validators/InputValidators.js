const {
    query,
    body,
} = require('express-validator/check');

const {
    isValidNumber,
} = require('../utils/Utils');

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
        return (filter === 'male')
            || (filter === 'female')
            || (filter === 'hermaphrodite')
            || (filter === 'n/a')
            || (filter === 'none');
    });

exports.checkLimit = query('limit')
    .custom((limit) => {
        if (!limit) {
            return true;
        }
        if (isValidNumber(limit)) {
            return limit <= 20;
        }
        return false;
    });

exports.checkOffset = query('offset')
    .custom((offset) => {
        if (!offset) {
            return true;
        }
        const number = Number(offset);
        return isValidNumber(number);
    });

exports.checkContent = body('content').exists()
    .isLength({
        min: 2,
        max: 500,
    });
