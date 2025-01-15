const express = require('express')
const router = express.Router()
const discountsController = require('../controllers/discountsController')
const verifyToken = require('../middlewares/verifyToken')
const checkAdminRole = require('../middlewares/checkAdminRole')


router.get('/', discountsController.getAllDiscounts)
router.get('/:id', discountsController.getDiscountById)

router.post('/', verifyToken, checkAdminRole, discountsController.addDiscount)
router.delete('/:id', verifyToken, checkAdminRole, discountsController.deleteDiscount)
router.put('/:id', verifyToken, checkAdminRole, discountsController.updateDiscount)

module.exports = router