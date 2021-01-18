import apiRequest from '../api-request';

const getDailyPayment = async (year, month, date) => {
  const { data } = await apiRequest.get(`/daily/${year}/${month}/${date}`);
  return data;
};

export default getDailyPayment;
