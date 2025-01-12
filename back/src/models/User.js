const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const hashPassword = require('../middlewares/hashPassword')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 64,
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 64,
    },
    surname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 64,
    },
    addresses: {
        type: [
            {
                street: {
                    type: String,
                    required: true,
                    maxlength: 64,
                    minlength: 3,
                },
                city: {
                    type: String,
                    required: true,
                    maxlength: 64,
                    minlength: 3,
                },
                country: {
                    type: String,
                    required: true,
                    maxlength: 64,
                    minlength: 3,
                },
                zipCode: {
                    type: String,
                    required: true,
                    minlength: 5,
                    maxlength: 5,
                }
            }
        ]
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
},{versionKey: false})

hashPassword(userSchema);

const user = mongoose.model('User', userSchema);
module.exports = user;