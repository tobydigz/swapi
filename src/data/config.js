module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB || 'swapi',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'postgres',
    },
    docker: {
        username: 'postgres',
        password: null,
        database: 'swapi',
        host: 'db',
        dialect: 'postgres',
    },
    heroku: {
        use_env_variable: 'DATABASE_URL',
    },
    production: {
        username: 'root',
        password: null,
        database: 'database_production',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
};
