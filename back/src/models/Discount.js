const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
    appliesTo: {
        type: {
            type: String,
            required: true,
            enum: ['Book','Category']
        },
        value: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: 'appliesTo.type'
        }
    },
    type: {
        type: String,
        required: true,
        enum: ['fixed','percentage']
    },
    value: {
        type: Number,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    }
})

const discount = mongoose.model('Discount', discountSchema);
module.exports = discount;