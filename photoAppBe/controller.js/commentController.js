import _Comment from "../models/commentModal.js"
import {
    createCommentService,
    getCommentsService,
    getTopCommentService,
    removeCommentService,
    updateCommentService,
    likeCommentService,
    checkLikeCommentService
} from '../services/commentService.js'
import { v4 as uuidv4 } from 'uuid'

const createComment = async (req, res) => {
    try {
        const {
            pictureId, 
            content, 
            author
        } = req.body 
        const parrent_slug = req.body.parrent_slug || ""
        const slug = uuidv4()
        
        const {
            code,
            message,
            result
        } = await createCommentService(author, pictureId, content, slug, parrent_slug)

        res.status(code).json({
            message,
            result
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Server Error!'})
    }
}

const removeComment = async (req, res) => {
    try {
        const {
            slug,
            pictureId
        } = req.body

        const {code, message} = await removeCommentService(slug, pictureId)

        res.status(code).json(message)

    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Server Error!'})
    }
}

const updateComment = async (req, res) => {
    try {
        const {
            slug,
            content
        } = req.body

        const {
            code,
            message, 
            result
        } = await updateCommentService(slug, content)
        
        res.status(code).json({
            message,
            result
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Server Error!'})
    }
}

const getComment = async (req, res) => {
    try {
        const {
            parrent_slug,
            pictureId
        } = req.body

        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5
        
        const isReply = parrent_slug ? true : false

        const {
            code,
            message,
            result,
            total
        } = await getCommentsService(pictureId, limit, page, isReply, parrent_slug)

        res.status(code).json({
            page,
            total,
            message,
            result
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Server Error!'})
    }
}

const getTopComment = async (req, res) => {
    const {
        slug, 
        parrent_slug,
        pictureId
    } = req.body

    const page = parseInt(req.body.page) || 1
    const limit = parseInt(req.body.limit) || 5

    const isReply = parrent_slug ? true : false

    const {
        code,
        message,
        result,
        total
    } = await getTopCommentService(slug, pictureId, limit, page, isReply)

    res.status(code).json({
        message,
        page,
        total,
        result
    })
}

const likeComment = async (req, res) => {
    try {
        const {
            author,
            slug
        } = req.body

        const {
            code,
            message,
            result
        } = await likeCommentService(author, slug)

        res.status(code).json({
            message,
            result
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Server Error!'})
    }
}

const checkLikeComment = async (req, res) => {
    try {
        const {
            slug,
            authorId
        } = req.body

        const {
            code,
            message, 
            result
        } = await checkLikeCommentService(slug, authorId)

        res.status(code).json({
            message,
            result
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Server Error!'})
    }
}

export {
    createComment,
    updateComment,
    removeComment,
    getComment,
    getTopComment,
    likeComment,
    checkLikeComment
}