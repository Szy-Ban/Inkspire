const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');
const verifyToken = require('../middlewares/verifyToken')

router.use(verifyToken)

router.get('/cart', CartController.getCart);
router.post('/cart/items', CartController.addItemToCart);
router.delete('/cart/items', CartController.removeItemFromCart);
router.delete('/cart', CartController.clearCart);


module.exports = router;