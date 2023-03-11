import _Picture from '../models/pictureModal.js'
import _User from '../models/userModal.js'
import _Bucket from '../models/bucketModal.js'
import fetch from 'node-fetch'
import {
    pagination,
    getDetail,
    getList,
    getTrend,
    like,
    removeLike,
    checkLike,
    increaseView
} from '../services/pictureService.js'

const paginationPicture = async (req, res) => {
    pagination(req, res, _Picture)
}

const getDetailPicture = async (req, res) => {
    getDetail(req, res, 'picture', _Picture)
}

const getListPicture = async (req, res) => {
    getList(req, res, 'picture', _Picture)
}

const getTrendPicture = async (req, res) => {
    getTrend(req, res, _Picture)
}

// LIKE
const likePicture = async (req, res) => {
    like(req, res, 'picture', _Picture)
}

const removeLikePicture = async (req, res) => {
    removeLike(req, res, 'picture', _Picture)
}

const checkLikePicture = async (req, res) => {
    checkLike(req, res, _Picture)
}

const uploadPicture = async (req, res) => {
    try {
        const {name, isFree} = req.body
        const pictureUrl = `http://localhost:8080/assets/${req.body.pictureUrl}`
        const price = parseInt(req.body.price || 0)
        const typePicture = req.body.typePicture.split(' ')
        const author = JSON.parse(req.body.author)

        const newPicture = await _Picture.create({
            author,
            name, 
            typePicture,
            pictureUrl: {
                original: pictureUrl,
                large2x: pictureUrl,
                large: pictureUrl,
                medium: pictureUrl,
                small: pictureUrl,
                portrait: pictureUrl,
                landscape: pictureUrl,
                tiny: pictureUrl
            }, 
            isFree, 
            price
        })

        if (newPicture) {
            await _User.findOneAndUpdate({
                _id: author.authorId
            }, {
                $push: {
                    gallery: {
                        pictureId: newPicture._id, 
                        pictureUrl,
                        author: author.authorId
                    }
                }
            }, {
                upsert: true,
                new: true
            })

            res.status(201).json(newPicture)
        }else {
            res.status(500).json({message: 'Create Picture is failure!'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

// Insert Data from Pexels into DataBase
const insertManyPicture = async (req, res) => {
    try {
        const {type} = req.params
        const page = parseInt(req.query.page)
        const response = await fetch(`https://api.pexels.com/v1/search?query=${type}&page=${page}&per_page=10`, {
            method: 'get',
            headers: {'Authorization': process.env.SECRET_PEXEL_KEY}
        })
        const data = await response.json()
        const newPhotos = data.photos?.map(photo => ({
            author: {
                authorId: '63883c263ba1a988689c2e0e',
                photographer_url: 'https://toigingiuvedep.vn/wp-content/uploads/2021/01/avatar-dep-cute.jpg',
                photographer: 'Pixabay'
            },
            name: photo.alt,
            pictureUrl: {
                original: photo.src.original,
                large2x: photo.src.large2x,
                large: photo.src.large,
                medium: photo.src.medium,
                small: photo.src.small,
                portrait: photo.src.portrait,
                landscape: photo.src.landscape,
                tiny: photo.src.tiny
            },
            typePicture: [type],
            downloads: 101
        }))
        const pictures = await _Picture.insertMany(newPhotos)
        res.status(201).json(pictures)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Server Error!'})
    }
}

const increateViewPicture = async (req, res) => {
    try {
        increaseView(req, res, _Picture, 'picture')
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Error Server!'})
    }
}


// Update
const updateManyPicture = async (req, res) => {
    try {
        await _Picture.updateMany({}, {downloads: 0})
    res.status(200).json({message: 'Updated!'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Server Error!'})
    }
}

const updateManyPictureAddComment_num = async (req, res) => {
    try {
        await _Picture.updateMany({}, {comment_num: 0})
    } catch (error) {
        console.log(err)
        res.status(500).json('Server Error!')
    }
}

const updateViewPicture = async (req, res) => {
    try {
        console.log('run')
        await _Picture.updateMany({

        }, {
            view_num: 0
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Error server'})
    }
}

export {
    insertManyPicture, 
    getListPicture, 
    getTrendPicture,
    getDetailPicture,
    uploadPicture,
    likePicture,
    removeLikePicture,
    checkLikePicture,
    increateViewPicture,
    updateManyPicture, 
    updateManyPictureAddComment_num,
    updateViewPicture
}