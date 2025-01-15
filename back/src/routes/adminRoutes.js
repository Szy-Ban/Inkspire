const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');
const usersController = require('../controllers/usersController');
const verifyToken = require('../middlewares/verifyToken');
const checkAdminRole = require('../middlewares/checkAdminRole');

router.use(verifyToken);
router.use(checkAdminRole);


router.get('/users', usersController.getAllUsers)
router.get('/users/:id', usersController.getUserById)
router.delete('/users/:id', usersController.deleteUser)

router.get('/books', booksController.getAllBooks)
router.post('/books', booksController.addBook)
router.put('/books/:id', booksController.updateBook)
router.delete('/books/:id', booksController.deleteBook)

module.exports = router