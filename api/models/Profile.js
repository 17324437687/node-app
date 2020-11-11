let mongoose = require('mongoose')
let Schema = mongoose.Schema

//创建信息模型
let ProfileSchema = new Schema({
    type: {
        type: String
    },
    desscribe: {
        type: String
    },
    incode: {
        type: String,
        required: true
    },
    exepend: {
        type: String,
        required: true
    },
    cash: {
        type: String,
        required: true
    },
    remark: {
        type: String
    },

    date: {
        type: String,
        default: Date.now
    }
})

module.exports = Profile = mongoose.model('Profile', ProfileSchema)