const getPayments = require('./get-payments');
const getTotalAmount = require('./get-total-amount');
const createPayment = require('./create-payment');
const modifyPayment = require('./modify-payment');
const deletePayment = require('./delete-payment');

module.exports = { getPayments, getTotalAmount, createPayment, modifyPayment, deletePayment };
