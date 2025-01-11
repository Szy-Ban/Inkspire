const ordersController = require('../controllers/ordersController');
const express = require('express');
const router = express.Router();

router.get('/', ordersController.getAllOrders);
router.get('/:id', ordersController.getOrderById);
router.post('/', ordersController.addOrder);
router.put('/:id', ordersController.updateOrder);
router.patch('/:id', ordersController.cancelOrder);


module.exports = router;