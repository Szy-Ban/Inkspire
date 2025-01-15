const express = require('express')
const router = express.Router()
const shippingsController = require('../controllers/shippingsController')
const verifyToken = require('../middlewares/verifyToken')
const checkAdminRole = require('../middlewares/checkAdminRole')

router.get('/', shippingsController.getAllShippings)
router.get('/:id', shippingsController.getShippingById)

router.post('/', verifyToken, checkAdminRole, shippingsController.addShipping)
router.delete('/:id', verifyToken, checkAdminRole, shippingsController.deleteShipping)
router.put('/:id', verifyToken, checkAdminRole, shippingsController.updateShipping)

module.exports = router