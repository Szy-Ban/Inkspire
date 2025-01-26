const Cart = require("../models/Cart");
const Book = require("../models/Book");

const getCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.findOne({ userId }).populate('items.bookId', 'title images price');


        if (!cart) {
            return res.status(404).json({ message: 'Cart not found.' });
        }

        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const addItemToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { bookId, quantity } = req.body;

        if (!bookId || !quantity) {
            return res.status(400).json({ error: 'bookId and quantity are required.' });
        }

        if (quantity <= 0) {
            return res.status(400).json({ error: 'Quantity must be greater than 0.' });
        }

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ error: 'Book not found.' });
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const existingItem = cart.items.find(item => item.bookId.toString() === bookId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({
                bookId,
                quantity,
                price: book.price
            });
        }

        await cart.save();

        const responseCart = {
            userId: cart.userId,
            items: cart.items.map(item => ({
                bookId: item.bookId,
                quantity: item.quantity
            })),
            totalPrice: cart.totalPrice
        };

        return res.status(200).json({ message: 'Item added to cart.', cart: responseCart });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return res.status(500).json({ error: 'Internal server error.', details: error });
    }
};





const removeItemFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { bookId } = req.body;

        if (!bookId) {
            return res.status(400).json({ error: 'bookId is required.' });
        }

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found.' });
        }

        cart.items = cart.items.filter(item => item.bookId.toString() !== bookId);

        await cart.save();

        return res.status(200).json({ message: 'Item removed from cart.', cart });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error.', details: error });
    }
};

const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found.' });
        }

        cart.items = [];
        cart.totalPrice = 0;

        await cart.save();

        return res.status(200).json({ message: 'Cart cleared.', cart });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error.', details: error });
    }
};



module.exports = {
    getCart,
    addItemToCart,
    removeItemFromCart,
    clearCart
}