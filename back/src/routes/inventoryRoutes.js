const express = require('express')
const router = express.Router()
const inventoryController = require('../controllers/inventoryController')

router.get('/', inventoryController.getInventory)
router.get('/:id', inventoryController.getInventoryById)
router.put('/:id', inventoryController.updateInventory)
router.delete('/:id', inventoryController.removeProductFromInventory)


module.exports = router