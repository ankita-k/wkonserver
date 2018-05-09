const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const submoduleSchema = mongoose.Schema({

    name: {
        type: String
    },
    description: {
        type: String
    },
    moduleId:{
        type: Schema.ObjectId,
        ref: 'module'
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

submoduleSchema.pre('findOne', function (next) {
    this.populate('moduleId');
    next();
});

submoduleSchema.pre('find', function (next) {
    this.populate('moduleId');
    next();
});


const submodule = module.exports = mongoose.model('submodule', submoduleSchema);