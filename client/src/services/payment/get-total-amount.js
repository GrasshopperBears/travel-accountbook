import moment from 'moment';
import apiRequest from '../api-request';

const getTotalAmount = async () => {
  const { data } = await apiRequest.get(`/payment/total?date=${moment().format('YYYY-MM-DD')}`);
  return data;
};

export default getTotalAmount;
