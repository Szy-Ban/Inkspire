const mongoose = require('mongoose');

const shippingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    estimatedDelivery: {
        type: String,
        required: true,
        minLength: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
},{versionKey: false})

const shipping = mongoose.model('Shipping', shippingSchema)
module.exports = shipping;