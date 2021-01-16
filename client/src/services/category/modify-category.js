import apiRequest from '../api-request';

const modifyCategory = async (categoryId, title) => {
  const body = { title };
  const { data } = await apiRequest.patch(`/category/${categoryId}`, body);
  return data;
};

export default modifyCategory;
