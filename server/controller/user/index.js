const express = require('express');
const login = require('./login');
const logout = require('./logout');
const signup = require('./signup');

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.get('/logout', logout);

module.exports = router;
