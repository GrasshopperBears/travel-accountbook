const express = require('express');
const service = require('../services/category-stat');
const router = express.Router();

router.get('/:tripId/:categoryId', service.getCategoryPayment);
router.get('/:tripId', service.getCategoryStat);

module.exports = router;
