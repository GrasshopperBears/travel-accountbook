import moment from 'moment';
import apiRequest from '../api-request';

const getTotalAmount = async (tripId) => {
  const { data } = await apiRequest.get(
    `/payment/total?tripId=${tripId}&date=${moment().format('YYYY-MM-DD')}`,
  );
  return data;
};

export default getTotalAmount;
