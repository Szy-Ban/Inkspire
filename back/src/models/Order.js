const mongoose = require("mongoose");
const calculateTotalPrice = require('../middlewares/calculateTotalPrice')


const shippingAddressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 64
    },
    city: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 64
    },
    country: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 64
    },
    zipCode: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 5
    }
}, {versionKey: false})

const orderItemSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        validate: {
            validator: Number.isInteger,
            message: "Number must be a integer"
        }
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
}, {versionKey: false})

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: {
        type: [orderItemSchema],
        required: true
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0,
        immutable: true
    },
    shippingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shipping",
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'shipped', 'delivered', 'cancelled', 'ordered'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['credit_card', 'paypal', 'bank_transfer'],
        default: 'credit_card'
    },
    shippingAddress: {
        type: shippingAddressSchema,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });

calculateTotalPrice(orderSchema)

const order = mongoose.model('Order', orderSchema);
module.exports = order;