var mongoose = require('mongoose');
const { dbUrl } = require('./utils/constants')

let mongoDB = dbUrl;
mongoose.connect(mongoDB, { useNewUrlParser: true });

module.exports = mongoose.connection;
