import {Schema, model} from 'mongoose'

const pictureSchema = new Schema({
    author: {
        type: Object,
        required: true,
        default: {}
    },
    name: {
        type: String,
        required: true
    },
    pictureUrl: {
        type: Object,
        required: true,
        default: {}
    },
    picture: {
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
    typePicture: {
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
    },
    comment_num: {
        type: Number,
        default: 0
    },
    view_num: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const _Picture = model('Picture', pictureSchema)
export default  _Picture