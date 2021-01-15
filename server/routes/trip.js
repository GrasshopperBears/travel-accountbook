const express = require('express');
const service = require('../services/trip');
const router = express.Router();

router.get('/', service.getTrips);

module.exports = router;
