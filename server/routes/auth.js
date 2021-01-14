const express = require('express');
const router = express.Router();
const service = require('../services/auth');

router.get('/is-auth', service.isAuth);
router.post('/login', service.login);

module.exports = router;
