import apiRequest from '../api-request';

const getDailyStat = async (tripId, year, month) => {
  const { data } = await apiRequest.get(`/daily/${tripId}/${year}/${month}`);
  return data;
};

export default getDailyStat;
