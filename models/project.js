var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;


const projectSchema = mongoose.Schema({

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
    expectedStartDate:{
        type: Date
    },
    actualStartDate:{
        type: Date
    },
    client:{
        type: Schema.ObjectId,
        ref: 'client'
    },
    expectedEndDate:{
        type: Date
    },
    actualEndDate:{
        type: Date
    },
    members:[
        {
            userId: {
                type: Schema.ObjectId,
                ref: 'user'
            },
            role: String
        }
    ],
    createdBy:{
        type: Schema.ObjectId,
        ref: 'user'
    },
    updatedBy:{
        type: Schema.ObjectId,
        ref: 'user'
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
  
});

projectSchema.pre('findOne', function (next) {
    this.populate('members.userId');
    next();
});

projectSchema.pre('find', function (next) {
    this.populate('members.userId');
    next();
});

const project = module.exports = mongoose.model('project',projectSchema) 




