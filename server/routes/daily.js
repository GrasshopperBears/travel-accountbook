const express = require('express');
const service = require('../services/daily');
const router = express.Router();

router.get('/:year/:month', service.getDailyStat);

module.exports = router;
