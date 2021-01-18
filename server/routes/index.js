const express = require('express');
const router = express.Router();
const authorizeToken = require('../services/utils/authorize-token');

router.use('/api/auth', require('./auth'));
router.use('/api/trip', authorizeToken, require('./trip'));
router.use('/api/category', authorizeToken, require('./category'));
router.use('/api/payment', authorizeToken, require('./payment'));
router.use('/api/daily', authorizeToken, require('./daily'));
router.use('/api/category-stat', authorizeToken, require('./category-stat'));

module.exports = router;
