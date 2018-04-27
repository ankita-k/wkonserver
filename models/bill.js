
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

module.exports = mongoose.model('bill', new Schema({
    billingDate: {
        type: Date
    },
    paypalBillNumber: {
        type: String
    },
    billNumber: {
        type: String
    },
    BDE: {
        type: String
    },
    type: {
        type: String
    },
    client: {
        type: Schema.ObjectId,
        ref: 'client'
    },
    company: {
        type: String
    },
    paypalAccountName: {
        type: String
    },
    email: {
        type: String
    },
    projectName: {
        type: Schema.ObjectId,
        ref: 'project'
    },
    projectCost: {
        type: String
    },
    receivedAmount: {
        type: String
    },
    balance: {
        type: String
    },
    currency: {
        type: String
    },
    receivedDate: {
        type: Date
    },
    status: {
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