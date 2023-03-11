import otpGenerator from 'otp-generator';
import client from '../helper/connectRedis.js';
import _User from '../models/userModal.js';
import { verifyOtpService } from '../services/otpService.js';
import { signAccessToken, signRefreshToken } from '../services/tokenService.js';

export const createOtp = () => {
  return otpGenerator.generate(6, {
    digits: true,
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp, pictureName } = req.body;
    const user = await verifyOtpService(email, otp);
    const avatarUrl = `http://localhost:8080/assets/${pictureName}`;

    // Save image into db
    if (otp === user.otp) {
      const {
        firstName,
        lastName,
        nickName,
        email,
        location,
        occupation,
        hashPassword,
      } = user;

      const newUser = await _User.create({
        firstName,
        lastName,
        nickName,
        email,
        avatarUrl,
        password: hashPassword,
        location,
        occupation,
      });
      client.del(email);
      const token = await signAccessToken(newUser._id, newUser.isAdmin);
      const refresh = await signRefreshToken(newUser._id, user.isAdmin);
      res.cookie('jwt', refresh, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 100,
      });
      res.status(201).json({
        token,
        user: {
          _id: newUser._id,
          nickName: newUser.nickName,
          avatarUrl: newUser.avatarUrl,
          email: newUser.email,
        },
      });
    } else {
      res.status(400).json({ message: 'Wrong Otp!' });
    }
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error);
  }
};
