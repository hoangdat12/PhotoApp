import mongoose, {Schema, model} from 'mongoose'

const commentSchema = new Schema({
    author: {
        type: Object,
        required: true
    },
    pictureId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    posted: Date,
    slug: {
        type: String,
        required: true,
        unique: true
    },
    parrent_slug: {
        type: String,
        default: ""
    },
    comment_likes: {
        type: Array,
        default: []
    },
    comment_like_num: {
        type: Number,
        default: 0
    },
    score: Number
}, {
    collection: 'Comments',
    timestamps: true
})

const _Comment = model('Comments', commentSchema)
export default _Comment