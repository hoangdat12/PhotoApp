import _Video from '../models/videoModal.js'
import fetch from 'node-fetch'

import {
    pagination,
    getDetail,
    getTrend,
    getList,
    like,
    removeLike,
    checkLike
} from '../services/pictureService.js'

export const paginationVideo = async (req, res) => {
    pagination(req, res, _Video)
}

export const getDetailVideo = async (req, res) => {
    getDetail(req, res, 'video', _Video)
}

export const getTrendVideo = async (req, res) => {
    getTrend(req, res, _Video)
}

export const getListVideo = async (req, res) => {
    getList(req, res, 'video', _Video)
}

export const likeVideo = async (req, res) => {
    like(req, res, 'video', _Video)
}

export const removeLikeVideo = async (req, res) => {
    removeLike(req, res, 'video', _Video)
}

export const checkLikeVideo = async (req, res) => {
    checkLike(req, res, _Video)
}


// Insert Data from Pexels into DataBase
export const insertManyVideo = async (req, res) => {
    try {
        const {type} = req.params
        const page = parseInt(req.query.page)
        const response = await fetch(`https://api.pexels.com/videos/search?query=${type}&page=${page}&per_page=10`, {
            method: 'get',
            headers: {'Authorization': process.env.SECRET_PEXEL_KEY}
        })
        const data = await response.json()

        const newVideo = data.videos?.map(photo => {
            const videoUrl = photo.video_files.map(video => (
                {
                    height: video.height,
                    width: video.width,
                    quality: video.quality,
                    link: video.link
                }
            ))
            return (
                {
                    author: {
                        authorId: '63883c263ba1a988689c2e0e',
                        photographer_url: 'https://toigingiuvedep.vn/wp-content/uploads/2021/01/avatar-dep-cute.jpg',
                        photographer: 'Pixabay'
                    },
                    image: photo.image,
                    imageMini: photo.video_pictures[0].picture,
                    videoUrl,
                    typeVideo: [type],
                    downloads: 0
                }
            )
        })
        const videos = await _Video.insertMany(newVideo)
        res.status(201).json(videos)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Server Error!'})
    }
}
