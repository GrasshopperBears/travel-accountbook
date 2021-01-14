import apiRequest from '../api-request';

const isAuth = async () => {
  const response = await apiRequest.get('/auth/is-auth');
  return response;
};

export default isAuth;
