const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middlewares/verifyToken');
const loginLimiter = require('../middlewares/loginLimiter');


router.post('/login', loginLimiter, authController.loginUser)
router.post('/logout', verifyToken, authController.logoutUser)

module.exports = router;