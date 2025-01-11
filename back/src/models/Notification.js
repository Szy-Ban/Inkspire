const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['general','order','promotion']
    },
    message: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    read: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const notification = mongoose.model('Notification', notificationSchema);
module.exports = notification;