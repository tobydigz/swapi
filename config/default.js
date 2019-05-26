module.exports = {
    environment: process.env.NODE_ENV || 'development',
    logLevel: process.env.LOG_LEVEL || 'info',
    SWAPI_URL: 'https://swapi.co/api',
    TABLE_NAME: process.env.TABLE_NAME || '',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_NAME: process.env.DB_NAME || '',
    DB_HOST: process.env.DB_HOST || '',
    DB_USER: process.env.DB_USER || '',
};
