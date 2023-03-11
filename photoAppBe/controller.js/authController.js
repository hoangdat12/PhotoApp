import _User from '../models/userModal.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import client from '../helper/connectRedis.js';
import { signAccessToken, signRefreshToken } from '../services/tokenService.js';
import { createOtp } from './otpController.js';
import sendEmail from '../helper/sendEmail.js';

export const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      avatarUrl,
      location,
      occupation,
    } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is require!' });
    }

    const user = await _User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already Exist!' });
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const otp = createOtp();

    const inforNewUser = {
      firstName,
      lastName,
      nickName: `${firstName} ${lastName}`,
      email,
      hashPassword,
      avatarUrl,
      location,
      occupation,
      otp,
    };
    client.set(email, JSON.stringify(inforNewUser), 'EX', 30 * 60);
    console.log(otp);
    sendEmail(email, otp);
    res.status(201).json({
      message: 'Regiter success, please check your Email to active account!',
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'This Flied is require!' });
    }

    const user = await _User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: `Email don't match with any Account into Special!` });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(400).json({ message: 'Wrong password!' });
    }

    delete user.password;
    const token = await signAccessToken(user._id, user.isAdmin);
    const refresh = await signRefreshToken(user._id, user.isAdmin);
    console.log(refresh);
    if (!token) {
      res.status(500).json({ message: 'Error server!' });
    }
    res.cookie('jwt', refresh, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      token,
      user: {
        _id: user._id,
        nickName: user.nickName,
        avatarUrl: user.avatarUrl,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const changePassword = async (req, res) => {
  try {
    const { email, password, newPassword, rePassword } = req.body;

    if (newPassword !== rePassword) {
      return res.status(400).json({ message: `Passwords don't match!` });
    }

    if (newPassword === password) {
      return res.status(400).json({ message: `Password don't change!` });
    }

    const user = await _User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: `Email don't match with any Account into Special!` });
    }
    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
      return res.status(400).json({ message: 'Wrong password!' });
    }

    const salt = await bcrypt.genSalt();
    const hashNewPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashNewPassword;
    await user.save();
    res.status(200).json({ message: 'Change password is successfully!' });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const logoutUser = async (req, res) => {
  try {
    console.log('Run');
    res.clearCookie('jwt', { path: '/', maxAge: 0 });
    console.log('Run 1');
    return res.status(200).json({ message: '123' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server Error!' });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies) return res.status(401);
    console.log('cookies', cookies);
    const refreshToken = cookies.jwt;
    console.log('refreshToken', refreshToken);
    jwt.verify(
      refreshToken,
      process.env.SECRET_REFRESH_TOKEN,
      async (err, decode) => {
        if (err) {
          console.log(err);
          // Refresh Token expire
          if (err.name === 'TokenExpiredError')
            return res.status(401).json({ message: 'Token Expires!' });
          return res.status(401).json({ message: 'Invalid Token!' });
        }
        const { userId, isAdmin } = decode;
        const newAccessToken = await signAccessToken(userId, isAdmin);
        console.log('newAccessToken', newAccessToken);
        return res.status(200).json({ token: newAccessToken });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error!' });
  }
};
