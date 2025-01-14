const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');

router.get('/', reviewsController.getAllReviews);
router.post('/', reviewsController.addReview);
router.delete('/:id', reviewsController.deleteReview);

module.exports = router;