const express = require('express');
const router = express.Router();
const ReviewsController = require('../controllers/ReviewsController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', ReviewsController.getAllReviews);
router.post('/', verifyToken, ReviewsController.addReview);
router.delete('/:id', verifyToken, ReviewsController.deleteReview);

module.exports = router;
