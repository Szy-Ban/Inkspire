const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UsersController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/register', UserController.registerUser);

router.use(verifyToken);

router.get('/profile', UserController.getUserProfile);
router.put('/profile', UserController.updateUserProfile);
router.delete('/profile', UserController.deleteUserProfile);

router.get('/addresses', UserController.getUserAddresses);
router.post('/addresses', UserController.addUserAddress);
router.put('/addresses/:addressId', UserController.updateUserAddress);
router.delete('/addresses/:addressId', UserController.deleteUserAddress);

module.exports = router;