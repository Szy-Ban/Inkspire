const Review = require("../models/Review");
const mongoose = require('mongoose');


const getAllReviews = async (req, res) => {
    try {
        const { bookId } = req.query;

        if (!bookId) {
            return res.status(400).json({ message: "Book ID is required." });
        }

        const aggregateResult = await Review.aggregate([
            { $match: { bookId: new mongoose.Types.ObjectId(bookId) } },
            {
                $group: {
                    _id: "$bookId",
                    averageRating: { $avg: "$rating" },
                    totalReviews: { $sum: 1 },
                },
            },
        ]);

        const reviews = await Review.find({ bookId: bookId });

        const { averageRating = 0, totalReviews = 0 } = aggregateResult[0] || {};

        return res.status(200).json({
            averageRating: averageRating.toFixed(2),
            totalReviews,
            reviews,
        });
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
};



const addReview = async (req, res) => {
    try {
        const userId = req.user.id;
        const { bookId, rating, comment } = req.body;

        if (!bookId || !rating || !comment) {
            return res.status(400).json({ message: "Book ID, rating, and comment are required." });
        }

        const newReview = new Review({
            userId,
            bookId,
            rating,
            comment,
        });

        const savedReview = await newReview.save();
        return res.status(201).json({ message: "Review added successfully.", review: savedReview });
    } catch (error) {
        console.error("Error adding review:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

const deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.id;

        if (!reviewId) {
            return res.status(400).json({ message: "Review ID is required." });
        }

        const deletedReview = await Review.findByIdAndDelete(reviewId);

        if (!deletedReview) {
            return res.status(404).json({ message: "Review not found." });
        }

        return res.status(200).json({ message: "Review deleted successfully." });
    } catch (error) {
        console.error("Error deleting review:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = {
    getAllReviews,
    addReview,
    deleteReview,
};