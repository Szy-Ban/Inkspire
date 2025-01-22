const mongoose = require('mongoose');
const calculateTotalPrice = require('../middlewares/calculateTotalPrice')


const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    items: {
        type: [
            {
                bookId: {type: mongoose.Schema.Types.ObjectId, ref: 'Book' ,required: true},
                quantity: {type: Number, required: true, min:1,
                    validate: {
                        validator: Number.isInteger,
                        message: "Number must be a integer"
                    }},
                price: {type: Number, required: true, min:0},
            }
        ]
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {versionKey: false})


calculateTotalPrice(cartSchema)

const cart = mongoose.model('Cart', cartSchema)
module.exports = cart;