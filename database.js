var mongoose = require('mongoose');
const { dbUrl, testDbUrl } = require('./utils/constants')

let mongoDB = dbUrl;
if(process.env.NODE_ENV === 'test'){
  mongoDB = testDbUrl;
}
mongoose.connect(mongoDB, { useNewUrlParser: true });

module.exports = mongoose.connection;
