const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const taskSchema = mongoose.Schema({

    name: {
        type: String
    },
    status: {
        type: String,
        enum:['New','Inprogess','Completed']
    }, 
    description:{
        type: String  
    },
    date:{
        type: Date
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    assignTo:[{
        userId:{
            type: Schema.ObjectId,
            ref: 'user'
        }  
    }],
    submoduleId: {
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


taskSchema.pre('findOne', function (next) {
    this.populate('submoduleId');
    next();
});

taskSchema.pre('find', function (next) {
    this.populate('submoduleId');
    next();
});

taskSchema.pre('find', function (next) {
    this.populate('assignTo.userId');
    next();
});

taskSchema.pre('findOne', function (next) {
    this.populate('assignTo.userId');
    next();
});

const task = module.exports = mongoose.model('task', taskSchema);