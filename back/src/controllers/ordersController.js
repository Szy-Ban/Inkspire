const Order = require('../models/order');


const getAllOrders = async (req, res) => {
    try{

        const orders = await Order.find({})
        if(!orders){
            return res.status(404).json({error: "Categories not found"})
        }

        return res.status(200).json(orders)

    }catch(err){
        return res.status(400).json(err);
    }
}

const getOrderById = async (req, res) => {
    try{

        const id = req.params.id;
        const order = await Order.findById(id)
        if(!id){
            return res.status(404).json({error: "Invalid ID (format)!"})
        }
        if(!order){
            return res.status(404).json({error: "Order doest not exist!"})
        }

        return res.status(200).json(order)


    }catch(err){
        return res.status(400).json(err)
    }
}

const addOrder = async (req, res) => {
    try{

        const order = req.body;
        if(!order){
            return res.status(404).json({error: "Request body empty!"})
        }

        const newOrder = new Order(order)
        const saveOrder = await newOrder.save()

        return res.status(200).json(saveOrder)

    }catch(err){
        return res.status(400).json(err);
    }
}

const updateOrder = async (req, res) => {
    try{
        const id = req.params.id;
        const updatedOrder = req.body

        if(!id){
            return res.status(404).json({error: "Invalid ID (format)!"})
        }
        if(!updatedOrder){
            return res.status(404).json({error: "Request body empty!"})
        }

        const updateOrder = await Order.findByIdAndUpdate(id, updatedOrder)
        return res.status(200).json(updateOrder)

    } catch (err){
        return res.status(400).json(err)
    }
}

const cancelOrder = async (req, res) => {
    try {

        const id = req.params.id;
        if(!id){
            return res.status(404).json({error: "Invalid ID (format)!"})
        }

        const order = await Order.findById(id)
        if(!order){
            return res.status(404).json({error: "Order not found!"})
        }

        if(order.status==='cancelled'){
            return res.status(400).json({message: 'Order has been already cancelled!'})
        }

        order.status = 'cancelled'
        order.updatedAt = Date.now()

        return res.status(200).json({message: "Order has been successfully cancelled!", order})


    } catch(err){
        return res.status(400).json(err);
    }
}

module.exports = {
    getAllOrders,
    getOrderById,
    addOrder,
    updateOrder,
    cancelOrder
}