var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

module.exports = mongoose.model('project', new Schema({
    name: {
        type: String
    },
    requirement:  {
        type: String
    },
    status:  {
        type: String
    },
    technology:  {
        type: String
    },
    expectedstartDate:{
        type: String
    },
    actualstartDate:{
        type: String
    },
    expectedendDate:{
        type: String
    },
    actualendDate:{
        type: String
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