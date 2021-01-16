import apiRequest from '../api-request';

const deleteCategory = async (categoryId) => {
  const { data } = await apiRequest.delete(`/category/${categoryId}`);
  return data;
};

export default deleteCategory;
