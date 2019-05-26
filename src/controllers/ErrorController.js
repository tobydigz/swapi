const {
    validationResult,
} = require('express-validator/check');
const messages = require('../constants/Messages');

exports.handle = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: messages.VALIDATION_ERROR,
            errors: errors.array(),
        });
    }
    return next();
};
