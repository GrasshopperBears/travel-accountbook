const express = require('express');
const service = require('../services/daily');
const router = express.Router();

router.get('/:tripId/:year/:month/:date', service.getDailyPayment);
router.get('/:tripId/:year/:month', service.getDailyStat);

module.exports = router;
