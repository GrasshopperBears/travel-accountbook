const express = require('express');
const service = require('../services/map');
const router = express.Router();

router.get('/:tripId', service.getMapPayments);

module.exports = router;
