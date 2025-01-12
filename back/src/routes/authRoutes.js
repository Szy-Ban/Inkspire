const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middlewares/authMiddleware');

router.post('/login', authController.loginUser)
router.post('/logout', verifyToken, authController.logoutUser)

module.exports = router;