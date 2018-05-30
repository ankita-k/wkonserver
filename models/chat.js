const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const chatSchema = mongoose.Schema({

    text: {
        type: String
    },
    userId: {
        type: Schema.ObjectId,
        ref: 'submodule'
    },
    projectId: {
        type: Schema.ObjectId,
        ref: 'submodule'
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


chatSchema.pre('findOne', function (next) {
    this.populate('userId');
    next();
});

chatSchema.pre('find', function (next) {
    this.populate('userId');
    next();
});

chatSchema.pre('find', function (next) {
    this.populate('projectId');
    next();
});

chatSchema.pre('findOne', function (next) {
    this.populate('projectId');
    next();
});

const chat = module.exports = mongoose.model('chat', chatSchema);