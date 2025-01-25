const Cart = require('../models/Cart');
const Order = require('../models/Order');

const addOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { shippingAddress, shippingId } = req.body;

        if (!shippingAddress || !shippingAddress.street || !shippingAddress.city || !shippingAddress.country || !shippingAddress.zipCode) {
            return res.status(400).json({ message: 'Shipping address is required and must be complete.' });
        }
        if (!shippingId) {
            return res.status(400).json({ message: 'Shipping ID is required.' });
        }

        const cart = await Cart.findOne({ userId }).populate('items.bookId', 'name price');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty or not found.' });
        }

        const newOrder = new Order({
            userId,
            items: cart.items.map(item => ({
                bookId: item.bookId._id,
                name: item.bookId.name,
                price: item.price,
                quantity: item.quantity
            })),
            totalPrice: cart.items.reduce((total, item) => total + item.price * item.quantity, 0),
            status: 'pending',
            shippingAddress,
            shippingId
        });

        const savedOrder = await newOrder.save();

        return res.status(200).json({
            message: 'Order created successfully. Please confirm the order to proceed.',
            order: savedOrder
        });
    } catch (err) {
        console.error('Error creating order:', err);
        return res.status(500).json({ error: 'Internal server error.', details: err });
    }
};

const confirmOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ message: 'Invalid ID format.' });
        }

        const order = await Order.findOne({ _id: id, userId });
        if (!order) {
            return res.status(404).json({ message: 'Order not found for this user.' });
        }

        if (order.status !== 'pending') {
            return res.status(400).json({ message: 'Order status must be pending to confirm.' });
        }

        order.status = 'ordered';
        order.updatedAt = Date.now();
        await order.save();

        const cart = await Cart.findOne({ userId });
        if (cart) {
            cart.items = [];
            cart.totalPrice = 0;
            await cart.save();
        }

        return res.status(200).json({
            message: 'Order confirmed successfully and cart cleared.',
            order
        });
    } catch (err) {
        console.error('Error confirming order:', err);
        return res.status(500).json({ error: 'Internal server error.', details: err });
    }
};




const getAllOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const allOrders = await Order.find({ userId });

        if (!allOrders || allOrders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user.' });
        }

        return res.status(200).json(allOrders);
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error.', details: err });
    }
};

const getOrderById = async (req, res) => {
    try {
        const userId = req.user.id;
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ message: 'Invalid ID format.' });
        }

        const order = await Order.findOne({ _id: id, userId });
        if (!order) {
            return res.status(404).json({ message: 'Order not found for this user.' });
        }

        return res.status(200).json(order);
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error.', details: err });
    }
};

const getAllOrdersByUserId = async (req, res) => {
    try {
        const userId = req.user.id;

        const userOrders = await Order.find({ userId }).sort({ createdAt: -1 });

        return res.status(200).json(userOrders);
    } catch (err) {
        console.error('Error fetching user orders:', err);
        return res.status(500).json({ error: 'Internal server error.', details: err });
    }
};


const updateOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const id = req.params.id;
        const updatedOrder = req.body;

        if (!id) {
            return res.status(400).json({ message: 'Invalid ID format.' });
        }

        const order = await Order.findOneAndUpdate(
            { _id: id, userId },
            updatedOrder,
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: 'Order not found for this user.' });
        }

        return res.status(200).json(order);
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error.', details: err });
    }
};

const cancelOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ message: 'Invalid ID format.' });
        }

        const order = await Order.findOne({ _id: id, userId });
        if (!order) {
            return res.status(404).json({ message: 'Order not found for this user.' });
        }

        if (order.status === 'cancelled') {
            return res.status(400).json({ message: 'Order has already been cancelled.' });
        }

        order.status = 'cancelled';
        order.updatedAt = Date.now();
        await order.save();

        return res.status(200).json({ message: 'Order has been cancelled successfully.', order });
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error.', details: err });
    }
};

module.exports = {
    getAllOrders,
    getOrderById,
    getAllOrdersByUserId,
    confirmOrder,
    addOrder,
    updateOrder,
    cancelOrder
};