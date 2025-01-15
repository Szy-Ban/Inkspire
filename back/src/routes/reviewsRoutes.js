const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');
const verifyToken = require('../middlewares/verifyToken')
const checkAdminRole = require('../middlewares/checkAdminRole')

router.get('/', reviewsController.getAllReviews);

router.post('/', verifyToken, reviewsController.addReview);
router.delete('/:id', verifyToken, checkAdminRole, reviewsController.deleteReview);

module.exports = router;