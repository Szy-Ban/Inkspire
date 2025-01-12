const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.post('/register', usersController.registerUser)
router.get('/:id/profile', usersController.getUserById)
router.put('/:id/profile', usersController.updateUser)
router.delete('/:id/profile', usersController.deleteUser)
router.get('/:id/addresses', usersController.getUserAddresses)
router.post('/:id/addresses', usersController.addUserAddress)
router.put('/:id/addresses/:addressId', usersController.updateUserAddress)

module.exports = router;