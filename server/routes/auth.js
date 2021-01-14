const express = require('express');
const router = express.Router();
const Service = require('../services/auth');

router.post('/login', Service.login);

module.exports = router;
