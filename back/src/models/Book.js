const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 64,
    },
    author: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 64,
    },
    description: {
        type: String,
        required: true,
        maxlength: 324,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    images: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},{versionKey: false})

const book = mongoose.model('Book', bookSchema)
module.exports = book;