const express = require('express');
const router = express.Router();
const notificationsController = require('../controllers/NotificationsController');


router.get('/', notificationsController.getNotifications);
router.post('/', notificationsController.createNotification);
router.put('/:id', notificationsController.markAsRead)
router.delete('/:id', notificationsController.deleteNotification);

module.exports = router