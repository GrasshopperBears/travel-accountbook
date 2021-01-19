import apiRequest from '../api-request';

const getDailyPayment = async (tripId, year, month, date) => {
  const { data } = await apiRequest.get(`/daily/${tripId}/${year}/${month}/${date}`);
  return data;
};

export default getDailyPayment;
