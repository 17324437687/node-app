let mongoose = require('mongoose')
let Schema = mongoose.Schema

//创建Users模型
let UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    date: {
        type: String,
        default: Date.now
    }
})

module.exports = User = mongoose.model('Users', UserSchema)