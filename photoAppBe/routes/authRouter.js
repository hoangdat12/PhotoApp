import express from 'express';
import {
  registerUser,
  loginUser,
  changePassword,
  logoutUser,
  refreshToken,
} from '../controller.js/authController.js';
import { verifyAccessToken } from '../middleware/verifyAccessToken.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.post('/password/change', verifyAccessToken, changePassword);
router.get('/refreshToken', refreshToken);
router.get('/refresh', refreshToken);

export default router;
