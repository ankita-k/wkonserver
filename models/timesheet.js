const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const timesheetSchema = mongoose.Schema({

    
    userId: {
        type: Schema.ObjectId,
        ref: 'user'
    }, 
    purpose:{
        type: String  
    },
    startTime: {
        type: String
    },
    endTime: {
        type: String
    },
    date:{
        type: Date, 
    },
    taskId:{
        type: Schema.ObjectId,
        ref: 'task'
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


timesheetSchema.pre('findOne', function (next) {
    this.populate('userId');
    next();
});

timesheetSchema.pre('find', function (next) {
    this.populate('userId');
    next();
});



const timesheet = module.exports = mongoose.model('timesheet', timesheetSchema);