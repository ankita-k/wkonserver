var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

module.exports = mongoose.model('client', new Schema({
    name: {
        type: String
    },
    password:  {
        type: String
    },
    country:{
        name: String,
        geolocation: [Number],
        phoneCode: String   
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
        default: Date.now()
    },
    updatedDate:{
        type: Date,
        default: Date.now()
    },
    enable:{
        type: Number,
        default: 0
    }
    
}));