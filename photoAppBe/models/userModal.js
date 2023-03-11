import { Schema, model } from "mongoose";

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    nickName: String,
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    avatarUrl: String,
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    followers_num: {
        type: Number,
        default: 0
    },
    following_num: {
        type: Number,
        default: 0
    },
    collections: {
        type: Array,
        default: []
    },
    gallery: {
        type: Array,
        default: []
    },
    instagram: String,
    location: String,
    occupation: String
}, {
    timestamps: true
})

userSchema.methods.getFullName = function getFullName() {
    return `${this.firstName} ${this.lastName}`
}

const _User = model('User', userSchema)

export default _User