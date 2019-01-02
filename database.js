var mongoose = require('mongoose');
const CONSTANTS = require('./utils/constants')

let mongoDB = process.env.MONGODB_URI || CONSTANTS.dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });

module.exports = mongoose.connection;
