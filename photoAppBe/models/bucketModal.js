import {Schema, model} from 'mongoose'

const bucketSchema = new Schema({
    typePicture: {
        type: Array,
        default: []
    },
    count: {
        type: Number,
        required: true
    },
    pictures: { type: Array, default: [{
        pictureId: {type: String, required: true},
        author: {type: Object, default: {}},
        pictureUrl: {type: Object, default: ''}, 
    }]}
}, {
    timestamps: true
})

const _Bucket = model('Bucket', bucketSchema)
export default _Bucket