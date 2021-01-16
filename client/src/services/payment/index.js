import getPayments from './get-payments';
import createPayment from './create-payment';
import modifyPayment from './modify-payment';
import deletePayment from './delete-payment';

const service = {
  getPayments,
  createPayment,
  modifyPayment,
  deletePayment,
};

export default service;
