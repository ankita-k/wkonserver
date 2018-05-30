var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

module.exports = mongoose.model('user', new Schema({
    name: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String
    },
    status:{
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String
    },
    lastLogin: {
        type: Date
    },
    manager: {
        type: Schema.ObjectId,
        ref: 'user'
    },
    tags: {
        type: Array
    },
    createdBy: {
        type: Schema.ObjectId,
        ref: 'user'
    },
    updatedBy: {
        type: Schema.ObjectId,
        ref: 'user'
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    updatedDate: {
        type: Date,
        default: Date.now()
    },
    enable: {
        type: Number,
        default: 0
    }

}));