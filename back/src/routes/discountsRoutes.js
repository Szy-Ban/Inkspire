const express = require('express')
const router = express.Router()
const discountsController = require('../controllers/discountsController')

router.get('/', discountsController.getAllDiscounts)
router.post('/', discountsController.addDiscount)
router.get('/:id', discountsController.getDiscountById)
router.delete('/:id', discountsController.deleteDiscount)
router.put('/:id', discountsController.updateDiscount)

module.exports = router