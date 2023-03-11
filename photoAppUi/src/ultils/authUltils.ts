import { userLocal } from '../pages/Profile';
import { getLocalStorageItem } from '../hook/useLocastorage';
import axios from 'axios';

export const logoutUser = async () => {
  const res = await axios.get('http://localhost:8080/auth/logout');
  console.log(res);
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  //   window.location.reload();
};

export const getUserFromLocalStorage = () => {
  const user = getLocalStorageItem<userLocal>('user');
  return user;
};
