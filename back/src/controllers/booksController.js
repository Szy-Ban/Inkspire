const Book = require('../models/Book');

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

module.exports = {
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook
}