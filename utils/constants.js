
const dotenv = require('dotenv');
dotenv.config();

const dbUrl = process.env.MONGODB_URI;
const testDbUrl = process.env.TEST_MONGODB_URI;

const userReturnFeilds = '_id\
  username\
  firstName\
  lastName\
  email\
  profilePhoto\
  bio\
  interests\
  isVerified';

const secretKey = process.env.SECRET_KEY

const appId = process.env.APP_UUID

/** Email Options */
const EMAIL_HOST = process.env.EMAIL_HOST
const EMAIL_PORT = process.env.EMAIL_PORT
const EMAIL_SERVICE = process.env.EMAIL_SERVICE
const EMAIL_USER = process.env.EMAIL_USER
const EMAIL_PASS = process.env.EMAIL_PASS
const EMAIL_FROM = process.env.EMAIL_FROM

const emailOptions = {
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  service: EMAIL_SERVICE,
  user: EMAIL_USER,
  pass: EMAIL_PASS,
  fromEmail: EMAIL_FROM
};

module.exports = {
  dbUrl,
  testDbUrl,
  appId,
  userReturnFeilds,
  secretKey,
  emailOptions
};
