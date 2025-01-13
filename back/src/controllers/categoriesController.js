const Category = require('../models/Category');

const getAllCategories = async (req, res) => {
    try {

        const categories = await Category.find({})

        if(!categories){
            return res.status(404).json({error: "Categories not found"})
        }

        return res.status(200).json(categories)


    } catch (err) {
        return res.status(400).json(err)
    }
}

const getCategoryById = async (req, res) => {
    try {

        const id = req.params.id;

        const category = await Category.findById(id)

        if(!id){
            return res.status(404).json({error: "Invalid ID (format)!"})
        }

        if(!category){
            return res.status(404).json({error: "Category not found"})
        }

        return res.status(200).json(category)

    } catch (err) {
        return res.status(400).json(err)
    }
}

const addCategory = async (req, res) => {
    try{

        const category = req.body;
        if(!category){
            return res.status(404).json({error: "Request body empty!"})
        }

        const newCategory = new Category(category)
        const saveCategory = await newCategory.save()

        return res.status(200).json(saveCategory)

    }catch(err){
        return res.status(400).json(err)
    }
}

const updateCategory = async (req, res) => {
    try{

        const id = req.params.id;
        const category = req.body;
        if(!id){
            return res.status(404).json({error: "Invalid ID (format)!"})
        }
        if(!category){
            return res.status(404).json({error: "Request body empty!"})
        }

        const updatedCategory = await Category.findByIdAndUpdate(id, category)

        if (!updatedCateogry) {
            return res.status(404).json({ error: "Category not found" });
        }

        return res.status(200).json(updatedCategory)

    } catch (err) {
        return res.status(400).json(err)
    }
}

const deleteCategory = async (req, res) => {
    try{

        const id = req.params.id;

        if(!id) {
            return res.status(404).json({error: "Invalid ID (format)!"})
        }

        const deleteCategory = await Category.findByIdAndDelete(id)

        if (!deleteCategory) {
            return res.status(404).json({ error: "Category not found" });
        }

        return res.status(200).json(deleteCategory)

    } catch (err) {
        return res.status(400).json(err)
    }
}

module.exports = {
    getAllCategories,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory
}