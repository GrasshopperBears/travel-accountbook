const express = require('express');
const service = require('../services/trip');
const router = express.Router();

router.get('/', service.getTrips);
router.post('/', service.createTrip);
router.patch('/:tripId', service.modifyTrip);
router.delete('/:tripId', service.deleteTrip);

module.exports = router;
