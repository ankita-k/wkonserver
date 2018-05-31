var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

module.exports = mongoose.model('client', new Schema({
    name: {
        type: String,
        required: true
    },
    password:  {
        type: String
    },
    country:{
        type: String,
    },
    domain:{
        type: String, 
    },
    address:{
        type: String,         
    },
    company:{
        type: String,                 
    },
    paypalId:{
        type: String,                 
    },
    currency:{
        type: String,                 
    },
    email:  {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber:{
        type: String
    },
    status:{
        type: String,
        default: 'Interested'
    },
    mailstatus:{
        type:Boolean,
        default:false
    },
      createdBy:{
        type: Schema.ObjectId,
        ref: 'User'
    },
    updatedBy:{
        type: Schema.ObjectId,
        ref: 'User'
    },
    createdDate:{
        type: Date,
        default: Date.now
    },
    updatedDate:{
        type: Date,
        default: Date.now
    },
    enable:{
        type: Number,
        default: 0
    }
    
}));