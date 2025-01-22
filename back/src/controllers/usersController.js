const User = require('../models/User');
const Cart = require('../models/Cart');

const registerUser = async (req, res) => {
    try {
        const { email, password, name, surname, addresses } = req.body;

        if (!email || !password || !name || !surname || !addresses) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists.' });
        }

        const newUser = new User({
            email,
            password,
            name,
            surname,
            addresses,
            role: 'user',
        });

        const savedUser = await newUser.save();

        const newCart = new Cart({ userId: savedUser._id });
        await newCart.save();

        return res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { email, name, surname } = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, { email, name, surname }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found.' });
        }
        return res.status(200).json({ message: 'User profile updated successfully.', user: updatedUser });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const deleteUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found.' });
        }
        await Cart.findOneAndDelete({ userId });
        return res.status(200).json({ message: 'User account deleted successfully.' });
    } catch (error) {
        console.error('Error deleting user profile:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const getUserAddresses = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        return res.status(200).json(user.addresses);
    } catch (error) {
        console.error('Error fetching user addresses:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const addUserAddress = async (req, res) => {
    try {
        const userId = req.user.id;
        const { street, city, country, zipCode } = req.body;

        if (!street || !city || !country || !zipCode) {
            return res.status(400).json({ error: 'All address fields are required.' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        user.addresses.push({ street, city, country, zipCode });
        await user.save();

        return res.status(201).json({ message: 'Address added successfully.' });
    } catch (error) {
        console.error('Error adding user address:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const updateUserAddress = async (req, res) => {
    try {
        const userId = req.user.id;
        const { addressId } = req.params;
        const { street, city, country, zipCode } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const address = user.addresses.id(addressId);
        if (!address) {
            return res.status(404).json({ error: 'Address not found.' });
        }

        if (street) address.street = street;
        if (city) address.city = city;
        if (country) address.country = country;
        if (zipCode) address.zipCode = zipCode;

        await user.save();

        return res.status(200).json({ message: 'Address updated successfully.', address });
    } catch (error) {
        console.error('Error updating user address:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const deleteUserAddress = async (req, res) => {
    try {
        const userId = req.user.id;
        const { addressId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const addressIndex = user.addresses.findIndex(address => address._id.toString() === addressId);
        if (addressIndex === -1) {
            return res.status(404).json({ error: 'Address not found.' });
        }

        user.addresses.splice(addressIndex, 1);
        await user.save();

        return res.status(200).json({ message: 'Address deleted successfully.' });
    } catch (error) {
        console.error('Error deleting user address:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};


module.exports = {
    registerUser,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
    getUserAddresses,
    addUserAddress,
    updateUserAddress,
    deleteUserAddress,
};