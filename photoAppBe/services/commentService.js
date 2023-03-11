import _Comment from "../models/commentModal.js"
import _Picture from '../models/pictureModal.js'

const createCommentService = async (
    author,
    pictureId,
    content,
    slug,
    parrent_slug    
) => {
    const comment = await _Comment.create({
        author,
        pictureId,
        content,
        slug,
        parrent_slug 
    })

    if (!comment) return {
        code: 500,
        message: 'Error!'
    }

    const updateResult = await _Picture.findOneAndUpdate({
        _id: pictureId
    }, {
        $inc: {
            comment_num: 1
        }
    }, {
        new: true,
        upsert: true
    })

    if (!updateResult) return {
        code: 500,
        message: 'Error!'
    }
    return {
        code: 201,
        result: comment
    }
}

const removeCommentService = async (slug, pictureId) => {
    if (!slug) {
        return {
            code: 404,
            message: 'Missing value!'
        }
    }

    await _Comment.findOneAndDelete({ slug })

    const picture = await _Picture.findOneAndUpdate({
        _id: pictureId
    }, {
        $inc: {
            comment_num: -1
        }
    }, {
        new: true,
        upsert: true
    })

    if (!picture) return {
        code: 500,
        message: 'Error!'
    }
    return {
        code: 200,
        message: 'Delete success!'
    }
}

const updateCommentService = async (slug, content) => {
    if (!slug) {
        return {
            code: 400,
            message: 'Missing value!'
        }
    }

    const comment = await _Comment.findOneAndUpdate({
        slug
    }, {
        content
    }, {
        upsert: true,
        new: true
    })

    if (!comment) return {
        code: 500,
        message: 'Error!'
    } 
    return {
        code: 200,
        message: 'Update suceess',
        result: comment
    }
}

const getCommentsService = async (pictureId, limit, page, isReply, parrent_slug = "") => {
    // If missing value then return message
    if (!pictureId) return {
        code: 404,
        message: 'Missing value!'
    }

    // Calculate the offset based on the page number and number of results per page
    const offset = (page) * limit

    // Check if isReply === true => get Comment reply 
    if (isReply) {
        const comment = await _Comment.find({
            pictureId,
            parrent_slug
        }).limit(limit * page).exec()
        
        const total = await _Comment.find({
            pictureId,
            parrent_slug
        }).skip(offset).count()

        if (!comment)  return {
            code: 500,
            message: 'Error!'
        }
        return {
            code: 200,
            result: comment,
            total
        }
    } 

    // Else get image commments     
    else {
        const comment = await _Comment.find({
            parrent_slug: "",
            pictureId
        }).limit(limit * page).exec()

        const total = await _Comment.find({
            parrent_slug: "",
            pictureId
        }).skip(offset).count()

        if (!comment) return {
            code: 500,
            message: 'Error!'
        }
        return {
            code: 200,
            result: comment,
            total
        }
    }
}

const getTopCommentService = async (slug, pictureId, limit, page, isReply) => {
    const offset = (page - 1) * limit
    if (isReply) {
        const comments = await _Comment.find({
            parrent_slug,
            pictureId
        }).sort(['posted', -1]).limit(limit * page).exec()

        if (comments) return {
            code: 500,
            message: 'Error!'
        }
        else return {
            code: 200,
            result: comments
        }

    } else {
        const comments = await _Comment.aggregate([
            {
                $group: {
                    pictureId,
                    parrent_slug: ''
                }
            },
            {
                $sort: {
                    comment_like_num: -1
                }
            }
        ]).limit(limit * page).exec()

        const total = await _Comment.find({
            parrent_slug: "",
            pictureId
        }).skip(offset).count()

        if (!comments) return {
            code: 500,
            message: 'Error!'
        }
    
        return {
            code: 200,
            result: comments,
            total
        }
    }
}

const likeCommentService = async (author, slug) => {
    if (!author) {
        return {
            code: 400,
            message: 'Missing value!'
        }
    }

    const isExist = await _Comment.findOne({
        slug,
        comment_likes: {
            $elemMatch: {
                "author.authorId": author.authorId
            }
        }
    })

    // Un Like comment
    if (isExist) {
        const comment = await _Comment.findOneAndUpdate({
            slug,
            comment_like_num: {$gt: 0}
        }, {
            $pull: {
                comment_likes: {
                    author
                }
            },
            $inc: {
                comment_like_num: -1
            }
        }, {
            new: true,
            upsert: true
        },)

        if (!comment) return {
            code: 500,
            message: 'Error!'
        }

        return {
            code: 200,
            message: 'UnLike comment success!',
            result: comment
        }
    }

    // Like comment
    const comment = await _Comment.findOneAndUpdate({
        slug
    }, {
        $push: {
            comment_likes: {
                author
            }
        },
        $inc: {
            comment_like_num: 1
        }
    }, {
        new: true,
        upsert: true
    })

    if (!comment) return {
        code: 500,
        message: 'Error!',
    }
    return {
        code: 200,
        message: 'Like comment success!',
        result: comment
    }
}

const checkLikeCommentService = async (slug, authorId) => {
    if (!slug || !authorId) return {
        code: 500,
        message: 'Missing value!'
    }

    const comment = await _Comment.findOne({
        slug,
        comment_likes: {
            $elemMatch: {
                "author.authorId": authorId
            }
        }
    })

    if (!comment)  return {
        code: 200,
        result: false
    }
    else return {
        code: 200,
        result: true
    }
}

export {
    removeCommentService,
    updateCommentService,
    getCommentsService,
    getTopCommentService,
    likeCommentService,
    createCommentService,
    checkLikeCommentService
}