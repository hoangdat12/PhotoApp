import express from "express"
import {
    getDetailVideo,
    getListVideo,
    getTrendVideo,
    likeVideo,
    removeLikeVideo,
    checkLikeVideo,
    insertManyVideo
} from '../controller.js/videoController.js'

const router = express.Router()

router.get('/list', getListVideo)
router.get('/trend', getTrendVideo)
router.post('/like', likeVideo)
router.post('/un-like', removeLikeVideo)
router.post('/check-like', checkLikeVideo)
router.get('/insert/:type', insertManyVideo)

router.get('/detail/:id', getDetailVideo)

export default router