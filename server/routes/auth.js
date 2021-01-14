const express = require('express');
const router = express.Router();
const service = require('../services/auth');
const authorizeToken = require('../services/utils/authorize-token');

router.get('/is-auth', authorizeToken, service.isAuth);
router.post('/login', service.login);

module.exports = router;
