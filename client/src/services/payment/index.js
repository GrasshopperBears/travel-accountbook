import getPayments from './get-payments';
import getTotalAmount from './get-total-amount';
import createPayment from './create-payment';
import modifyPayment from './modify-payment';
import deletePayment from './delete-payment';

const service = {
  getPayments,
  getTotalAmount,
  createPayment,
  modifyPayment,
  deletePayment,
};

export default service;
