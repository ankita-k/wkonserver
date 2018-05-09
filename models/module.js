const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const moduleSchema = mongoose.Schema({

    name: {
        type: String
    },
    description: {
        type: String
    },
    projectId:{
        type: Schema.ObjectId,
        ref: 'project'
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

})

moduleSchema.pre('findOne', function (next) {
    this.populate('projectId');
    next();
});

moduleSchema.pre('find', function (next) {
    this.populate('projectId');
    next();
});


const mod = module.exports = mongoose.model('module', moduleSchema);