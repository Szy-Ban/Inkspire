const Shipping = require('../models/Shipping');

const getAllShippings = async (req, res) => {
    try{

        const allShippings = await Shipping.find({})

        if(!allShippings){
            return res.status(404).json({message: "Shippings not found!"})
        }

        res.status(200).json(allShippings)

    } catch (err) {
        return res.status(400).json(err);
    }
}

const getShippingById = async (req, res) => {
    try{

        const id = req.params.id

        if(!id) {
            return res.status(404).json({message: "Invalid ID (format)!"})
        }

        const shipping = await Shipping.findById(id)

        if(!shipping) {
            return res.status(404).json({message: "Shipping not found!"})
        }

        return res.status(200).json(shipping)

    } catch (err) {
        return res.status(400).json(err)
    }
}

const addShipping = async (req, res) => {
    try{

        const shipping = req.body

        if(!shipping){
            return res.status(404).json({message: "Request body empty!"})
        }

        const newShipping = await new Shipping(shipping)
        const saveShipping = await newShipping.save()

        return res.status(200).json({message: "Shipping added successfully!"})

    } catch (err) {
        return res.status(400).json(err)
    }
}

const updateShipping = async (req, res) => {
    try {

        const id = req.params.id
        const shippingData = req.body

        if(!id) {
            return res.status(404).json({message: "Invalid ID (format)!"})
        }

        const updateShipping = await Shipping.findByIdAndUpdate(id, shippingData)

        if(!updateShipping){
            return res.status(404).json({message: "Shipping not found!"})
        }

        return res.status(200).json(updateShipping)

    } catch (err) {
        return res.status(400).json({message: "Shipping successfully updated!"})
    }
}

const deleteShipping = async (req, res) => {
    try{

        const id = req.params.id

        if(!id) {
            return res.status(404).json({message: "Invalid ID (format)!"})
        }

        const deleteShipping = await Shipping.findByIdAndDelete(id)

        if(!deleteShipping){
            return res.status(404).json({message: "Shipping not found!"})
        }

        return res.status(200).json({message: "Shipping successfully deleted!"})

    } catch (err) {
        return res.status(400).json
    }
}

module.exports = {
    getAllShippings,
    getShippingById,
    addShipping,
    updateShipping,
    deleteShipping
}