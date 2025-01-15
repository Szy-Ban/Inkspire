const Cart = require('../models/Cart');

const getCart = async (req, res) => {
    try {

        const {userId} = req.params;

        const cart = await Cart.findOne({userId}).populate('items.bookId', 'name price')

        if(!cart){
            return res.status(404).send({error: 'No cart found.'});
        }

        return res.status(200).json(cart);

    } catch(err) {
        return res.status(400).json(err)
    }
}

const addItemToCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const { bookId, quantity, price } = req.body;

        if (!bookId || !quantity || !price) {
            return res.status(400).json({ error: "BookId, quantity, and price are required." });
        }

        if (quantity <= 0 || price < 0) {
            return res.status(400).json({ error: "Invalid quantity or price." });
        }

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ error: "Cart not found." });
        }

        const existingItem = cart.items.find(item => item.bookId.toString() === bookId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({bookId, quantity, price });
        }

        await cart.save();

        return res.status(200).json({ message: "Item added to cart.", cart });

    } catch (err) {
        return res.status(400).json(err);
    }
};

const removeItemFromCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const { bookId } = req.body;

        if (!bookId) {
            return res.status(400).json({ error: "bookId is required." });
        }

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ error: "Cart not found." });
        }

        cart.items = cart.items.filter(item => item.bookId.toString() !== bookId);

        await cart.save();

        return res.status(200).json({ message: "Item removed from cart.", cart });

    } catch (err) {
        return res.status(400).json(err);
    }
};

const clearCart = async (req, res) => {
    try {
        const { userId } = req.params;

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ error: "Cart not found." });
        }

        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        return res.status(200).json({ message: "Cart cleared.", cart });

    } catch (err) {
        return res.status(500).json(err);
    }
};

module.exports = {
    getCart,
    addItemToCart,
    removeItemFromCart,
    clearCart
}