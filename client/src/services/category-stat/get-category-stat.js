import apiRequest from '../api-request';

const getCategoryStat = async (tripId) => {
  const { data } = await apiRequest.get(`/category-stat/${tripId}`);
  return data;
};

export default getCategoryStat;
