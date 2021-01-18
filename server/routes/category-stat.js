const express = require('express');
const service = require('../services/category-stat');
const router = express.Router();

router.get('/:categoryId', service.getCategoryPayment);
router.get('/', service.getCategoryStat);

module.exports = router;
