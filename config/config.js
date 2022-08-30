const path = require('path');
require('dotenv').config(); 

module.exports = {
    development: {
        username: 'root',
        password: null,
        storage: path.join(__dirname, 'db.development.sqlite'),
        dialect: 'sqlite',
        host: 'localhost',
        logging: console.log,
    }
}

