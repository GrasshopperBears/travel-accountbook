import apiRequest from '../api-request';

const createCategory = async (title) => {
  const body = { title };
  const { data } = await apiRequest.post(`/category`, body);
  return data;
};

export default createCategory;
