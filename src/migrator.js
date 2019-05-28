const Umzug = require('umzug');
const {
    sequelize,
} = require('./data/models/index');

const umzug = new Umzug({
    storage: 'sequelize',
    storageOptions: {
        sequelize,
    },

    migrations: {
        params: [
            sequelize.getQueryInterface(), // queryInterface
            sequelize.constructor, // DataTypes
            () => {
                throw new Error('Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.');
            },
        ],
        path: `${__dirname}/data/migrations`,
        pattern: /\.js$/,
    },

    logging: () => {
        // eslint-disable-next-line no-undef,no-console
        console.log.apply(null, arguments);
    },
});

const runMigrations = async () => {
    await umzug.up({});
};

module.exports = {
    runMigrations,
};
