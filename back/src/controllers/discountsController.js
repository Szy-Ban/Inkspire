const Discount = require("../models/Discount")

const getAllDiscounts = async (req, res) => {
    try {
        const allDiscounts = await Discount.find()

        if(!allDiscounts) {
            return res.status(404).json({message: "Discounts not found!"})
        }

        return res.status(200).json(allDiscounts)
    } catch (err) {
        return res.status(400).json(err)
    }
}

const getDiscountById = async (req, res) => {
    try {

        const id = req.params.id

        if(!id) {
            return res.status(404).json({message: "Invalid id (format)!"})
        }

        const discount = await Discount.findById(id)

        if(!discount){
            return res.status(404).json({message: "Discount not found!"})
        }

        return res.status(200).json(discount)

    } catch (err) {
        return res.status(400).json(err)
    }
}

const addDiscount = async (req, res) => {
    try {

        const discount = req.body

        if(!discount){
            return res.status(404).json({message: "Request body empty!"})
        }

        const newDiscount = new Discount(discount)
        const saveDiscount = await newDiscount.save()

        return res.status(200).json({message: "Discount added successfully!"})

    } catch (err) {
        return res.status(400).json(err)
    }
}

const updateDiscount = async (req, res) => {
    try {

        const id = req.params.id
        const discountData = req.body

        if(!id){
            return res.status(404).json({message: "Invalid id (format)!"})
        }

        if(!discountData){
            return res.status(404).json({message: "Request body empty!"})
        }

        const updateDiscount = await Discount.findByIdAndUpdate(id, discountData)

        if(!updateDiscount){
            return res.status(404).json({message: "Discount not found!"})
        }

        return res.status(200).json({message: "Discount successfully updated!"})

    } catch (err) {
        return res.status(400).json(err)
    }
}

const deleteDiscount = async (req, res) => {
    try{

        const id = req.params.id

        if(!id){
            return res.status(404).json({message: "Invalid id (format)!"})
        }

        const deleteDiscount = await Discount.findByIdAndDelete(id)

        if(!deleteDiscount){
            return res.status(404).json({message: "Discount not found!"})
        }

        return res.status(200).json({message: "Discount successfully deleted!"})

    } catch (err) {
        return res.status(400).json(err)
    }
}


module.exports = {
    getAllDiscounts,
    getDiscountById,
    addDiscount,
    updateDiscount,
    deleteDiscount
}