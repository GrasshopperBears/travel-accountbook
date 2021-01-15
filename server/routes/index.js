const express = require('express');
const router = express.Router();
const authorizeToken = require('../services/utils/authorize-token');

router.use('/api/auth', require('./auth'));
router.use('/api/trip', authorizeToken, require('./trip'));

module.exports = router;
