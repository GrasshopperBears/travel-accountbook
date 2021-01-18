import apiRequest from '../api-request';

const getCategoryPayment = async (categoryId) => {
  const { data } = await apiRequest.get(`/category-stat/${categoryId}`);
  return data;
};

export default getCategoryPayment;
