const Review = require('../models/Review')

const getAllReviews = async (req, res) => {
    try {

        const allReviews = await Review.find({})

        if(!allReviews){
            return res.status(404).json({message: "Reviews not found!"})
        }

        return res.status(200).json(allReviews)

    } catch (err) {
        return res.status(404).json(err)
    }
}

const addReview = async (req, res) => {
    try {

        const reviewData = req.body

        if(!reviewData){
            return res.status(404).json({message: "Request body empty!"})
        }

        const addReview = new Review(reviewData)
        const savedReview = addReview.save()
        return res.status(200).json({message: "Review added successfully!"})

    } catch (err) {
        return res.status(404).json(err)
    }
}

const deleteReview = async (req, res) => {
    try {

        const id = req.params.id

        if(!id){
            return res.status(404).json({message: "Invalid ID (format)!"})
        }

        const deleteReview = await Review.findByIdAndDelete(id)

        if(!deleteReview){
            return res.status(404).json({message: "Review not found!"})
        }

        return res.status(200).json({message: "Review deleted successfully!"})

    } catch (err) {
        return res.status(404).json(err)
    }
}

module.exports = {
    getAllReviews,
    addReview,
    deleteReview
}