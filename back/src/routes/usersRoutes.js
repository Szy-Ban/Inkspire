const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const verifyToken = require('../middlewares/authMiddleware');

router.post('/register', usersController.registerUser)
router.get('/:id/profile', verifyToken, usersController.getUserById)
router.put('/:id/profile', verifyToken, usersController.updateUser)
router.delete('/:id/profile', verifyToken, usersController.deleteUser)
router.get('/:id/addresses', verifyToken, usersController.getUserAddresses)
router.post('/:id/addresses', verifyToken, usersController.addUserAddress)
router.put('/:id/addresses/:addressId', verifyToken, usersController.updateUserAddress)
router.delete('/:id/addresses/:addressId', verifyToken, usersController.deleteUserAddress)

module.exports = router;