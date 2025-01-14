const express = require('express')
const router = express.Router()
const shippingsController = require('../controllers/shippingsController')

router.get('/', shippingsController.getAllShippings)
router.post('/', shippingsController.addShipping)
router.get('/:id', shippingsController.getShippingById)
router.delete('/:id', shippingsController.deleteShipping)
router.put('/:id', shippingsController.updateShipping)

module.exports = router