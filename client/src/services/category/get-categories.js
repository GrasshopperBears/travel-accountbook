import apiRequest from '../api-request';

const getCategories = async () => {
  const { data } = await apiRequest.get(`/category`);
  return data;
};

export default getCategories;
