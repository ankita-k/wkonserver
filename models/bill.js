
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

module.exports = mongoose.model('bill', new Schema({
    billingDate: {
        type: String
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
        type: String
    },
    status: {
        type: String
    }
}));