module.exports = (sequelize, DataTypes) => {
    const comment = sequelize.define('comment', {
        movie_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ip_address: {
            type: DataTypes.STRING,
            validate: {
                isIP: true,
                notNull: true,
            },
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            validate: {
                len: [2, 500],
                notNull: true,
            },
            allowNull: false,
        },
    }, {});
    return comment;
};
