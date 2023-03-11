import express from 'express';
import {
  insertManyPicture,
  getListPicture,
  getTrendPicture,
  getDetailPicture,
  likePicture,
  removeLikePicture,
  checkLikePicture,
  increateViewPicture,
  updateManyPicture,
  updateManyPictureAddComment_num,
  updateViewPicture,
} from '../controller.js/pictureController.js';
import { verifyAccessToken } from '../middleware/verifyAccessToken.js';

const router = express.Router();

router.get('/create-many-picture/:type', insertManyPicture);
router.get('/list', getListPicture);
router.get('/trend', getTrendPicture);
router.post('/like', verifyAccessToken, likePicture);
router.post('/un-like', verifyAccessToken, removeLikePicture);
router.post('/check-like', checkLikePicture);
router.get('/increase-view/:id', increateViewPicture);

router.get('/detail/:id', getDetailPicture);

router.get('/update/downloads', updateManyPicture);
router.get('/update/comment-num', updateManyPictureAddComment_num);
router.get('/update/view-num', updateViewPicture);

export default router;
