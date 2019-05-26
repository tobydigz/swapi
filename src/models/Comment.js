const Sequelize = require('sequelize');
const {
    sequelize,
} = require('../database');

const {
    Model,
} = Sequelize;

class Comment extends Model {}

Comment.init({
    movie_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    ip_address: {
        type: Sequelize.STRING,
        validate: {
            isIP: true,
            notNull: true,
        },
    },
    content: {
        type: Sequelize.STRING,
        validate: {
            len: [2, 500],
            notNull: true,
        },
    },
}, {
    sequelize,
    modelName: 'comment',
});

module.exports = {
    Comment,
};
