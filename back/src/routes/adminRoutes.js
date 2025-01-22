const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const verifyToken = require('../middlewares/verifyToken');
const checkAdminRole = require('../middlewares/checkAdminRole');

router.use(verifyToken);
router.use(checkAdminRole);

router.get('/users', AdminController.getAllUsers);
router.get('/users/:id', AdminController.getUserById);
router.delete('/users/:id', AdminController.deleteUserById);

router.get('/books', AdminController.getAllBooks);
router.post('/books', AdminController.addBook);
router.put('/books/:id', AdminController.updateBook);
router.delete('/books/:id', AdminController.deleteBook);

module.exports = router;