import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { iImageData } from '../components/Picture';
import { getUserFromLocalStorage } from './authUltils';
import { iAuthor } from '../components/Comments';
import useAxios from '../hook/useAxios';

const user = getUserFromLocalStorage();

const userId = user?._id;

// LIKE
export const fetchCheckLike = async (id: string | undefined, type: string) => {
  const URL = `http://localhost:8080/${type}/check-like`;
  const body = {
    userId: userId,
    id: id,
  };
  const res = await axios.post(URL, body);
  if (res.data.isLike) {
    return true;
  } else {
    return false;
  }
};

export const fetchLike = async (id: string | undefined, type: string) => {
  const URL = `/${type}/like`;
  const body = {
    userId: userId,
    id: id,
  };
  await useAxios.post(URL, body);
};

export const fetchUnLike = async (id: string | undefined, type: string) => {
  const URL = `/${type}/un-like`;
  const body = {
    userId: userId,
    pictureId: id,
  };
  await useAxios.post(URL, body);
};

// COLLECTION
export const fetchAddCollection = async (
  id: string | undefined,
  userId: string,
  author: iAuthor | undefined,
  url: string | undefined,
  type: string
) => {
  const URL = `http://localhost:8080/user/add-collection`;
  const body = {
    userId: userId,
    pictureId: id,
    pictureUrl: url,
    author: author,
    type: type,
  };

  const res = await axios.post(URL, body);
  if (res.status === 201) {
    return true;
  } else {
    return false;
  }
};

export const fetchRemoveCollection = async (id: string | undefined) => {
  const URL = `http://localhost:8080/user/remove-collection`;
  const body = {
    userId: userId,
    pictureId: id,
  };
  await axios.post(URL, body);
};
