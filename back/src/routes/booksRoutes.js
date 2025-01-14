const booksController = require('../controllers/booksController');
const express = require('express');
const router = express.Router();

router.get('/search', booksController.searchBooks)
// Books endpoints
router.get('/', booksController.getAllBooks)
router.get('/:id', booksController.getBookById)
router.post('/', booksController.addBook)
router.put('/:id', booksController.updateBook)
router.delete('/:id', booksController.deleteBook)


module.exports = router;