const booksController = require('../controllers/booksController');
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken')
const checkAdminRole = require('../middlewares/checkAdminRole')

router.get('/search', booksController.searchBooks)

router.get('/', booksController.getAllBooks)
router.get('/:id', booksController.getBookById)
router.get('/categories/books', booksController.getCategoriesWithBooks);


router.post('/', verifyToken, checkAdminRole, booksController.addBook)
router.put('/:id', verifyToken, checkAdminRole, booksController.updateBook)
router.delete('/:id', verifyToken, checkAdminRole, booksController.deleteBook)


module.exports = router;