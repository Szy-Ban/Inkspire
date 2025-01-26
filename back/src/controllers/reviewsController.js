    const Review = require("../models/Review");
    const mongoose = require("mongoose");

    const getAllReviews = async (req, res) => {
        try {
            const { bookId } = req.query;

            if (!bookId) {
                return res.status(400).json({ message: "Book ID is required." });
            }

            const userId = req.user?.id;

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

            const reviews = await Review.find({ bookId })
                .populate("userId", "name surname")
                .lean();

            const userReview = reviews.find((review) => review.userId._id.toString() === userId) || null;

            const { averageRating = 0 } = aggregateResult[0] || {};

            return res.status(200).json({
                averageRating: averageRating.toFixed(2),
                reviews,
                userReview,
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

            const existingReview = await Review.findOne({ bookId, userId });
            if (existingReview) {
                return res.status(400).json({ message: "You have already reviewed this book." });
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
            const userId = req.user.id;

            if (!reviewId) {
                return res.status(400).json({ message: "Review ID is required." });
            }

            const review = await Review.findById(reviewId);

            if (!review) {
                return res.status(404).json({ message: "Review not found." });
            }

            if (review.userId.toString() !== userId) {
                return res.status(403).json({ message: "You are not authorized to delete this review." });
            }

            await Review.findByIdAndDelete(reviewId);

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
