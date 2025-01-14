const Notification = require('../models/Notification');

const getNotifications = async (req, res) => {
    try {
        const { type, read } = req.query;

        const filter = {};
        if (type) filter.type = type;
        if (read !== undefined) filter.read = read === 'true';

        const notifications = await Notification.find(filter).sort({ createdAt: -1 });

        if (notifications.length === 0) {
            return res.status(404).json({ error: "No notifications found matching the criteria." });
        }


        return res.status(200).json(notifications);

    } catch (error) {
        return res.status(500).json(error);
    }
}

const createNotification = async (req, res) => {
    try {
        const { userId, type, message } = req.body;

        if (!userId || !type || !message) {
            return res.status(400).json({ error: "userId, type, and message are required." });
        }

        const newNotification = new Notification({ userId, type, message });
        const savedNotification = await newNotification.save();

        return res.status(201).json(savedNotification);

    } catch (error) {
        return res.status(500).json(error);
    }
}

const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Invalid ID format." });
        }

        const notification = await Notification.findByIdAndUpdate(
            id,
            { read: true },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({ error: "Notification not found." });
        }

        return res.status(200).json(notification);

    } catch (error) {
        return res.status(500).json(error);
    }
}


const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Invalid ID format." });
        }

        const deletedNotification = await Notification.findByIdAndDelete(id);

        if (!deletedNotification) {
            return res.status(404).json({ error: "Notification not found." });
        }

        return res.status(200).json({ message: "Notification deleted successfully." });

    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {
    getNotifications,
    createNotification,
    markAsRead,
    deleteNotification,
}
