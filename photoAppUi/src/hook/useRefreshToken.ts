import useAxios from './useAxios';

const refreshToken = async () => {
  try {
    // Send request to refresh token endpoint
    const res = await useAxios.get('/auth/refreshToken');
    // save new token in local storage
    console.log(res);
    localStorage.setItem('token', res.data.token);
    if (res.status === 200) {
      return res.data.token;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default refreshToken;
