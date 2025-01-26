const Book = require('../models/Book');
const Category = require('../models/Category');

const getAllBooks = async (req, res) => {
    try {

        const allBooks = await Book.find({})

        if(!allBooks){
            return res.status(404).json({
                message: 'Books not found!'
            })
        }

        return res.status(200).json(allBooks)

    } catch (err) {
        return res.status(400).json(err)
    }
}

const getBookById = async (req, res) => {
    try{

        const id = req.params.id;

        const book = await Book.findById(id)

        if(!id){
            return res.status(404).json({
                message: 'Invalid ID (format)!'
            })
        }
        if(!book){
            return res.status(404).json({
                message: 'Book not found!'
            })
        }

        return res.status(200).json(book)


    } catch (err) {
        return res.status(404).json(err)
    }
}

const addBook = async (req, res) => {
    try{

        const book = req.body;
        if(!book){
            return res.status(404).json({
                message: 'Request body is incomplete!'
            })
        }

        const newBook = new Book(book)
        const saveBook = await newBook.save()
        return res.status(200).json(saveBook)

    } catch (err) {
        return res.status(404).json(err)
    }
}

const updateBook = async (req, res) => {
    try{

        const id = req.params.id;

        const book = req.body;

        if(!id){
            return res.status(404).json({
                message: 'Invalid ID (format)!'
            })
        }
        if(!book){
            return res.status(404).json({
                message: 'Request body not found!'
            })
        }

        const updateBook = await Book.findByIdAndUpdate(id, book, {new: true})

        if (!updateBook) {
            return res.status(404).json({ error: "Book not found" });
        }

        return res.status(200).json(updateBook)


    } catch (err) {
        return res.status(404).json(err)
    }
}

const deleteBook = async (req, res) => {
    try{

        const id = req.params.id;

        if(!id){
            return res.status(404).json({
                message: 'Invalid ID (format)!'
            })
        }

        const deleteBook = await Book.findByIdAndDelete(id)

        if (!deleteBook) {
            return res.status(404).json({ error: "Book not found" });
        }

        return res.status(200).json(deleteBook)


    } catch (err) {
        return res.status(404).json(err)
    }
}

const searchBooks = async (req, res) => {
    try {
        const { categories, authors, title, minPrice, maxPrice } = req.query;

        const filter = {};

        if (categories) {
            const categoryIds = categories.split(',');
            filter.categoryId = { $in: categoryIds };
        }

        if (authors) {
            const authorList = authors.split(',');
            filter.author = { $in: authorList };
        }

        if (title) {
            filter.title = { $regex: title, $options: 'i' };
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        const books = await Book.find(filter).populate('categoryId', 'name');

        if (books.length === 0) {
            return res.status(404).json({ error: 'No books found matching the criteria.' });
        }

        return res.status(200).json(books);
    } catch (err) {
        return res.status(400).json(err);
    }
};


const getAuthors = async (req, res) => {
    try {
        const authors = await Book.distinct('author');
        return res.status(200).json(authors);
    } catch (err) {
        return res.status(400).json({ error: 'Failed to fetch authors', details: err });
    }
};


const getCategoriesWithBooks = async (req, res) => {
    try {
        const categories = await Category.find();

        const categoriesWithBooks = await Promise.all(
            categories.map(async (category) => {
                const books = await Book.find({ categoryId: category._id }).limit(5);
                return {
                    _id: category._id,
                    name: category.name,
                    books,
                };
            })
        );

        return res.status(200).json(categoriesWithBooks);
    } catch (err) {
        return res.status(400).json({ error: "Failed to fetch categories with books", details: err });
    }
};

module.exports = {
    getAllBooks,
    getBookById
    addBook,
    updateBook,
    deleteBook,
    searchBooks,
    getCategoriesWithBooks,
    getAuthors
}