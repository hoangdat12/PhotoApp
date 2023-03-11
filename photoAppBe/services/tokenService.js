import jwt from 'jsonwebtoken';
import client from '../helper/connectRedis.js';

export const signAccessToken = async (userId, isAdmin) => {
  return new Promise((resolve, reject) => {
    const payload = { userId, isAdmin };
    const secret = process.env.SECRET_ACCESS_TOKEN;
    const options = { expiresIn: '1h' };

    jwt.sign(payload, secret, options, (err, token) => {
      if (err) return reject(err);
      resolve(token);
    });
  });
};

export const signRefreshToken = async (userId, isAdmin) => {
  return new Promise((resolve, reject) => {
    const payload = { userId, isAdmin };
    const secret = process.env.SECRET_REFRESH_TOKEN;
    const options = { expiresIn: '7d' };

    jwt.sign(payload, secret, options, (err, refresh) => {
      if (err) reject(err);
      client.set(
        userId.toString(),
        refresh,
        'EX',
        7 * 24 * 60 * 60 * 1000,
        (err) => {
          if (err) return reject(err);
          resolve(refresh);
        }
      );
    });
  });
};

export const verifyRefreshToken = async (refresh) => {
  return new Promise((resolve, reject) => {
    jwt.verify(refresh, process.env.SECRET_REFRESH_TOKEN, (err, refresh) => {
      if (err) reject(err);
      client.get(refresh.userId, (err, reply) => {
        if (err) return reject(err);
        if (refresh === reply) return resolve(refresh);
        return reject({ message: 'UnAuthorization!' });
      });
    });
  });
};
