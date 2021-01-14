import apiRequest from '../api-request';

const login = async (code) => {
  const body = { code };
  const { data } = await apiRequest.post(`/auth/login`, body);
  if (data.token) {
    window.localStorage.setItem('token', data.token);
    return true;
  }
  return false;
};

export default login;
