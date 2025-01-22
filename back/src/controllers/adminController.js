const User = require('../models/User');
const Book = require('../models/Book');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        return res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const deleteUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found.' });
        }

        return res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        return res.status(200).json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const addBook = async (req, res) => {
    try {
        const { name, price, description, stock, categoryId, producer } = req.body;

        if (!name || !price || !description || stock == null || !categoryId || !producer) {
            return res.status(400).json({ error: 'All book fields are required.' });
        }

        if (price <= 0) {
            return res.status(400).json({ error: 'Price must be greater than 0.' });
        }

        if (stock < 0 || !Number.isInteger(stock)) {
            return res.status(400).json({ error: 'Stock must be a non-negative integer.' });
        }

        if (producer.length < 2 || producer.length > 64) {
            return res.status(400).json({ error: 'Producer must be between 2 and 64 characters.' });
        }

        const newBook = new Book({
            name,
            price,
            description,
            stock,
            categoryId,
            producer
        });

        const savedBook = await newBook.save();

        return res.status(201).json({ message: 'Book added successfully.', book: savedBook });
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};



const updateBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const { name, price, description, stock, categoryId } = req.body;

        const updatedBook = await Book.findByIdAndUpdate(
            bookId,
            { name, price, description, stock, categoryId },
            { new: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found.' });
        }

        return res.status(200).json({ message: 'Book updated successfully.', book: updatedBook });
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id;

        const deletedBook = await Book.findByIdAndDelete(bookId);
        if (!deletedBook) {
            return res.status(404).json({ error: 'Book not found.' });
        }

        return res.status(200).json({ message: 'Book deleted successfully.' });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    deleteUserById,
    getAllBooks,
    addBook,
    updateBook,
    deleteBook,
};