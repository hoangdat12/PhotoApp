import {Schema, model} from 'mongoose'

const videoSchema = new Schema({
    author: {
        type: Object,
        required: true,
        default: {}
    },
    name: {
        type: String
    },
    image: {
        type: String,
        unique: true
    },
    imageMini: String,
    videoUrl: {
        type: Array,
        required: true,
        default: []
    },
    video: {
        data: Buffer,
        contentType: String
    },
    isFree: {
        type: Boolean,
        default: true
    },
    price: {
        type: Number,
        default: 0
    },
    downloads: {
        type: Number,
        default: 0
    },
    typeVideo: {
        type: Array,
        default: []
    },
    likes: {
        type: Array,
        default: []
    }, 
    comments: {
        type: Array,
        default: [],
    }
}, {
    timestamps: true
})

const _Video = model('Video', videoSchema)
export default _Video 