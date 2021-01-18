import apiRequest from '../api-request';

const getCategoryStat = async () => {
  const { data } = await apiRequest.get(`/category-stat`);
  return data;
};

export default getCategoryStat;
