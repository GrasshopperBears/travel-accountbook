import getPayments from './get-payments';
import getTotalAmount from './get-total-amount';
import createPayment from './create-payment';
import modifyPayment from './modify-payment';
import deletePayment from './delete-payment';
import searchPlaces from './search-place';

const service = {
  getPayments,
  getTotalAmount,
  createPayment,
  modifyPayment,
  deletePayment,
  searchPlaces,
};

export default service;
