const express = require('express');
const router = express.Router();
const ReviewsController = require('../controllers/ReviewsController');
const verifyToken = require('../middlewares/verifyToken');
const checkAdminRole = require('../middlewares/checkAdminRole');

router.get('/', ReviewsController.getAllReviews);

router.post('/', verifyToken, ReviewsController.addReview);

router.delete('/:id', verifyToken, checkAdminRole, ReviewsController.deleteReview);

module.exports = router;