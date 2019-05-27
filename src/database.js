const Sequelize = require('sequelize');
const config = require('config');

const {
    DB_NAME: database,
    DB_HOST: host,
    DB_USER: username,
    DB_PASSWORD: password,
} = config;

const sequelize = new Sequelize(database, username, password, {
    host,
    dialect: 'postgres',
});

module.exports = {
    sequelize,
};
