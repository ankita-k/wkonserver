var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

module.exports = mongoose.model('project', new Schema({
    name: {
        type: String,
        required: true
    },
    requirement:  {
        type: String
    },
    status:  {
        type: String,
        default: 'Pipeline'
    },
    technology:  {
        type: String
    },
    expectedstartDate:{
        type: Date
    },
    actualstartDate:{
        type: Date
    },
    client:{
        type: Schema.ObjectId,
        ref: 'Client'
    },
    expectedendDate:{
        type: Date
    },
    actualendDate:{
        type: Date
    },
    members:[
        {
            userId: {
                type: Schema.ObjectId,
                ref: 'User'
            },
            role: String
        }
    ],
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