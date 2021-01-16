const express = require('express');
const service = require('../services/payment');
const router = express.Router();

router.get('/total', service.getTotalAmount);
router.get('/:page', service.getPayments);
router.post('/', service.createPayment);
router.patch('/:paymentId', service.modifyPayment);
router.delete('/:paymentId', service.deletePayment);

module.exports = router;
