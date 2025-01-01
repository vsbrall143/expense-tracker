 

// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('node-complete', 'root', 'Xmachin@123', {
// dialect: 'mysql',
// host: 'localhost'
// });

// module.exports = sequelize;

require('dotenv').config(); // Load environment variables from .env file
 

const Sequelize = require('sequelize');

const sequelize = new Sequelize(`${process.env.USER}`, `${process.env.DATABASE}`, `${process.env.PASSWORD}`, {
dialect: 'mysql',
host: 'localhost'
});

module.exports = sequelize;