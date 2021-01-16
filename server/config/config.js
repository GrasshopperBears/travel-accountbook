require('dotenv').config();

const env = process.env;

module.exports = {
  development: {
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
  },
  production: {
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
  },
};
