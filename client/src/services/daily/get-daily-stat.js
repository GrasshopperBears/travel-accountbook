import apiRequest from '../api-request';

const getDailyStat = async (year, month) => {
  const { data } = await apiRequest.get(`/daily/${year}/${month}`);
  return data;
};

export default getDailyStat;
