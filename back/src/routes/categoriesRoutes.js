const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const verifyToken = require('../middlewares/verifyToken')
const checkAdminRole = require('../middlewares/checkAdminRole')

router.get('/', categoriesController.getAllCategories)
router.get('/:id', categoriesController.getCategoryById)

router.post('/', verifyToken, checkAdminRole, categoriesController.addCategory)
router.put('/:id', verifyToken, checkAdminRole, categoriesController.updateCategory)
router.delete('/:id', verifyToken, checkAdminRole, categoriesController.deleteCategory)

module.exports = router;