import express from 'express';
import {
  createComment,
  updateComment,
  removeComment,
  getComment,
  getTopComment,
  likeComment,
  checkLikeComment,
} from '../controller.js/commentController.js';
import { verifyAccessToken } from '../middleware/verifyAccessToken.js';

const router = express.Router();

router.post('/create', verifyAccessToken, createComment);
router.post('/update', verifyAccessToken, updateComment);
router.post('/delete', verifyAccessToken, removeComment);
router.post('/get', getComment);
router.post('/get/top', getTopComment);
router.post('/like', verifyAccessToken, likeComment);
router.post('/check-like', checkLikeComment);

export default router;
