const express = require('express');
const router = express.Router();
const notificationsController = require('../controllers/NotificationsController');
const verifyToken = require('../middlewares/verifyToken')
const checkAdminRole = require('../middlewares/checkAdminRole')

router.use(verifyToken);

router.get('/', notificationsController.getNotifications);
router.post('/', checkAdminRole, notificationsController.createNotification);
router.put('/:id', notificationsController.markAsRead)
router.delete('/:id', checkAdminRole, notificationsController.deleteNotification);

module.exports = router