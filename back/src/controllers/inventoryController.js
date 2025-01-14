const Book = require('../models/Book')

const getInventory = async (req, res) => {
    try {
        const products = await Book.find().select('name stock');
        return res.status(200).json(products);
    } catch (error) {
        return res.status(400).json(error);
    }
};

const getInventoryById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        const product = await Book.findById(id).select('name stock');

        if (!product) {
            return res.status(404).json({ error: "Book not found" });
        }

        return res.status(200).json(product);
    } catch (error) {
        return res.status(400).json(error);
    }
}

const updateInventory = async (req, res) => {
    try {
        const { id } = req.params;
        const { stockChange } = req.body;

        if (!id) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        if (typeof stockChange !== 'number') {
            return res.status(400).json({ error: "stockChange must be a number" });
        }

        const product = await Book.findById(id);

        if (!product) {
            return res.status(404).json({ error: "Book not found" });
        }

        if (product.stock + stockChange < 0) {
            return res.status(400).json({ error: "Stock cannot be negative" });
        }

        product.stock += stockChange;
        await product.save();

        return res.status(200).json({ message: "Inventory updated successfully", product });
    } catch (error) {
        return res.status(400).json(error);
    }
}


const removeProductFromInventory = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        const product = await Book.findById(id);

        if (!product) {
            return res.status(404).json({ error: "Book not found" });
        }

        product.stock = 0;
        await product.save();

        return res.status(200).json({ message: "Book stock set to 0", product });
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {
    getInventory,
    getInventoryById,
    updateInventory,
    removeProductFromInventory,
}
