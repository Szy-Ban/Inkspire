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
        const { category, title, author, minPrice, maxPrice } = req.query;

        const filter = {};

        if (category) {
            const categoryData = await Category.findOne({ name: { $regex: category, $options: 'i' } });
            if (!categoryData) {
                return res.status(404).json({ error: "Category not found" });
            }
            filter.categoryId = categoryData._id;
        }

        if (title) {
            filter.title = { $regex: title, $options: 'i' };
        }

        if (author) {
            filter.author = { $regex: author, $options: 'i' };
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) {
                if (isNaN(minPrice)) {
                    return res.status(400).json({ error: "minPrice must be a valid number" });
                }
                filter.price.$gte = Number(minPrice);
            }
            if (maxPrice) {
                if (isNaN(maxPrice)) {
                    return res.status(400).json({ error: "maxPrice must be a valid number" });
                }
                filter.price.$lte = Number(maxPrice);
            }
        }

        const books = await Book.find(filter).populate('categoryId', 'name');

        if (books.length === 0) {
            return res.status(404).json({ error: "No books found matching the criteria" });
        }

        return res.status(200).json(books);

    } catch (err) {
        return res.status(400).json(err);
    }
}

module.exports = {
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
    searchBooks
}