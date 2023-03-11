import _User from "../models/userModal.js"
import fs from 'fs'

const getInforUserService = async (userId) => {
    if (!userId) return {
        code: 400,
        message: 'Missing value!'
    }

    const user = await _User.findOne({_id: userId})
    if (user) {
        const result = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            nickName: user.nickName,
            email: user.email,
            avatarUrl: user.avatarUrl,
            folower: user.followers,
            following: user.following,
            followers_num: user.followers_num,
            following_num: user.following_num,
            collections: user.collections,
            gallery: user.gallery,
            instagram: user.instagram,
            location: user.location,
            occupation: user.occupation 
        }

        return {
            code: 200,
            message: 'Success!',
            result
        }
    } else {
        return {
            code: 400,
            message: 'User not found!'
        }
    }

}

const searchUserByNameService = async (page, limit, search) => {
    const offset = (page - 1) * limit

    const users = await _User.find({
        nickName: {$regex: search, $options: 'i'}
    }, {
        _id: 1,
        firstName: 1,
        lastName: 1,
        avatarUrl: 1,
        nickName: 1,
        occupation: 1
    }).skip(offset).limit(limit).exec()

    if (!users) return {
        code: 500,
        message: 'Error!'
    }
    return {
        code: 200,
        message: 'Success!',
        result: users
    }
}

const addFollwingService = async (userId, follwingId, avatarUrl, name, occupation) => {

    // Handle Following
    const user = await _User.findOneAndUpdate({
        _id: userId
    }, {
        $push: {
            following: {
                userId: follwingId, 
                avatarUrl, 
                nickName: name, 
                occupation
            }
        },
        $inc: {
            following_num: 1
        }
    }, {
        upsert: true,
        new: true
    })

    if (!user) return {
        code: 500,
        message: 'Error!'
    }

    // Handle Follower
    const userUpdate = await _User.findOneAndUpdate({
        _id: follwingId 
    }, {
       $push: {
            followers: {
                userId: user._id,
                avatarUrl: user.avatarUrl,
                nickName: user.nickName,
                occupation: user.occupation
            }
       },
       $inc: {
            followers_num: 1
        }
    }, {
        upsert: true,
        new: true
    })

    return {
        code: 200,
        message: 'Success',
        result: userUpdate
    }

}

const removeFollwingService = async (userId, follwingId) => {
    const user = await _User.findOneAndUpdate({
        _id: userId
    }, {
        $pullAll: {
            following: {
                $elemMatch: {
                    userId: follwingId
                }
            }
        },
        $inc: {
            following_num: -1
        }
    }, {
        upsert: true,
        new: true
    })

    if (!user) return {
        code: 500,
        message: 'Error!'
    }

    await _User.findOneAndUpdate({
        _id: follwingId
    }, {
        $pull: {
            followers: {
                $elemMatch: {
                    userId: userId
                }
            }
        },
        $inc: {
            followers_num: -1
        }
    }, {
        upsert: true,
        new: true
    })

    return {
        code: 200,
        message: 'Success'
    }
}

const checkFollowingService = async (userId, follwingId) => {
    // const isFollowing = await _User.findOne({
    //     _id: '63883c263ba1a988689c2e0e',
    //     followers: {
    //         $elemMatch: {
    //             userId: '63aaa8bfb1f56db0c1aa9095'
    //         }
    //     }
    // })
    const user = await _User.findOne({_id: follwingId})

    const isFollowing = user?.followers?.filter(follwer => follwer.userId !== userId)
    
    if (isFollowing?.length !== 0) return {
        code: 200,
        message: 'Following',
        result: true
    } 
    else return {
        code: 200,
        message: 'Not Following',
        result: false
    }
}

const addCollectionService = async (userId, pictureId, pictureUrl, author, type) => {
    const isExist = await _User.find({
        _id: userId,
        collections: {
            $elemMatch: {
                pictureId: pictureId
            }
        }
    })

    if (isExist.length) return {
        code: 201,
        message: 'Picture is exist into your collection!'
    }

    const user = await _User.findOneAndUpdate({
        _id: userId
    }, {
        $push: {
            collections: {
                pictureId, 
                pictureUrl,
                author,
                type
            }
        }
    }, {
        upsert: true,
        new: true
    })

    return {
        code: 201,
        message: 'Success',
        result: user
    }
}

const removeCollectionService = async (userId, pictureId) => {
    const user = await _User.findOneAndUpdate({
        _id: userId
    }, {
        $pull: {
            collections: {
                pictureId
            }
        }
    }, {
        new: true,
        upsert: true
    })

    if (!user) return {
        code: 500,
        message: 'Error!'
    }

    return {
        code: 200,
        message: 'Remove collection success!'
    }
}

const updateInforUserService = async (
    userId,
    firstName, 
    lastName, 
    email, 
    nickName, 
    occupation, 
    location,
    fileName
) => {
    const isExist = await _User.findOne({
        _id: userId
    }).exec()

    if (!isExist) return {
        code: 400,
        message: 'User not found!'
    }

    const user = await _User.findOneAndUpdate({
        _id: userId
    }, {
        firstName, lastName, nickName, email, occupation, location
    }, {
        upsert: true,
        new: true
    })

    if (!user) return {
        code: 500,
        message: 'Error!'
    }

    if (fileName) {
        const avatarUrl = user.avatarUrl.slice(29)
        const newAvatar = `http://localhost:8080/assets/${fileName}`

        if (avatarUrl !== 'defaultAvatar.png') {
            fs.unlink(`public/assets/${avatarUrl}`, (err) => {
                if (err) {
                    console.log(err)
                    return {
                        code: 500,
                        message: 'Error!'
                    }
                }
            })
    
            user.avatarUrl = newAvatar
            user.save()
        }
        else {
            user.avatarUrl = newAvatar
            user.save()
        }
    }

    return {
        code: 200,
        message: 'Success',
        result: user
    }
}

export {
    getInforUserService,
    searchUserByNameService,
    addFollwingService,
    removeFollwingService,
    addCollectionService,
    removeCollectionService,
    updateInforUserService,
    checkFollowingService
}