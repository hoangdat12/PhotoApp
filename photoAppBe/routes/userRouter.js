import express from 'express';
import {
  getInforUser,
  addFollwing,
  removeFollwing,
  addCollection,
  removeCollection,
  searchUserByName,
  checkFollowing,
} from '../controller.js/userController.js';
import { verifyAccessToken } from '../middleware/verifyAccessToken.js';

const router = express.Router();

router.post('/following', verifyAccessToken, addFollwing);
router.post('/un-following', verifyAccessToken, removeFollwing);
router.post('/check-following', checkFollowing);
router.post('/add-collection', verifyAccessToken, addCollection);
router.post('/remove-collection', verifyAccessToken, removeCollection);
router.get('/list', searchUserByName);
router.get('/:userId', getInforUser);

export default router;
