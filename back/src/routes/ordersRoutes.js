const ordersController = require('../controllers/ordersController');
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken')
const checkAdminRole = require('../middlewares/checkAdminRole')

router.use(verifyToken)

router.get('/', checkAdminRole, ordersController.getAllOrders);
router.get('/:id', ordersController.getOrderById);
router.post('/', ordersController.addOrder);
router.put('/:id', checkAdminRole, ordersController.updateOrder);
router.patch('/:id', ordersController.cancelOrder);
router.get('/user/:userId', ordersController.getOrderByUserId)

module.exports = router;