const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const verifyToken = require('../middlewares/verifyToken')

router.use(verifyToken)

router.get('/:userId', cartController.getCart);
router.post('/:userId/items', cartController.addItemToCart);
router.delete('/:userId/items', cartController.removeItemFromCart);
router.delete('/:userId', cartController.clearCart);

module.exports = router;