const express = require('express');
const router = express.Router();

const userValidator = require('../../middleware/userValidator')
const loginRequired = require('../../middleware/loginRequired')
const isAdmin = require('../../middleware/isAdminUser')
const getUsers = require('./getUsers')
const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const resetPassword = require('./resetPassword')
const verifyAccount = require('./verifyAccount')

router.use(userValidator);

router.get('/', loginRequired, isAdmin, getUsers);
router.post('/register', register);
router.post('/login', login);
router.post('/reset-password', resetPassword);
router.get('/logout', loginRequired, logout);
router.get('/verify-account/:verifyId', verifyAccount);

module.exports = router;