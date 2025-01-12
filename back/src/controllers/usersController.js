const User = require('../models/User');

const registerUser = async (req, res) => {
    try{

        const {email, password, name, surname, addresses} = req.body;

        if (!email || !password || !name || !surname || !addresses) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({error: "User already exists"})
        }

        const newUser = new User({
            email, password, name, surname, addresses,
            role: 'user'
        })

        await newUser.save()
        return res.status(200).json({message: "User has been successfully created!"})

    } catch (err) {
        console.error("Error during register: ", err)
        return res.status(500).json(err)
    }
}

const getUserById = async (req, res) => {
    try{

        const id = req.params.id;

        if(!id){
            return res.status(404).json({error: "Invalid ID (format)!"})
        }

        const user = await User.findById(id).select('-password')

        if(!user){
            return res.status(404).json({error: "User not found!"})
        }

        return res.status(200).json(user)

    }catch(err){
        return res.status(400).json(err)
    }
}

const updateUser = async (req, res) => {
    try{

        const id = req.params.id;

        const {email, name, surname} = req.body;

        if(!id){
            return res.status(404).json({error: "Invalid ID (format)!"})
        }

        const user = await User.findByIdAndUpdate(id,{email, name, surname})

        if(!user){
            return res.status(404).json({error: "User not found!"})
        }

        return res.status(200).json({message: "User has been successfully updated!"})

    }catch (err) {
        return res.status(400).json(err);
    }
}

const deleteUser = async (req, res) => {
    try {

        const id = req.params.id;

        if(!id){
            return res.status(404).json({error: "Invalid ID (format)!"})
        }

        const user = await User.findByIdAndDelete(id)

        if(!user){
            return res.status(404).json({error: "User not found!"})
        }

        return res.status(200).json({message: "User has been successfully deleted!"})

    } catch (err) {
        return res.status(400).json(err)
    }
}

const getUserAddresses = async (req, res) => {
    try{

        const id = req.params.id;

        if(!id) {
            return res.status(404).json({error: "Invalid ID (format)!"})
        }

        const user = await User.findById(id)

        if(!user){
            return res.status(404).json({error: "User not found!"})
        }

        const formattedAddresses = user.addresses.map(address =>({
            street: address.street,
            city: address.city,
            country: address.country,
            zipCode: address.zipCode
        }))

        return res.status(200).json(formattedAddresses)

    } catch (err) {
        return res.status(400).json(err)
    }
}

const addUserAddress = async (req, res) => {
    try {

        const id = req.params.id;
        const {street, city, country, zipCode} = req.body;

        if(!id){
            return res.status(404).json({error: "Invalid ID (format)!"})
        }

        if(!street || !city || !country || !zipCode){
            return res.status(404).json({error: "All address field are required!"})
        }

        const user = await User.findById(id)

        if(!user){
            return res.status(404).json({error: "User not found!"})
        }

        const newAddress = {street, city, country, zipCode}
        user.addresses.push(newAddress)

        await user.save()
        return res.status(200).json({message: "Address added successfully!"})

    } catch (err) {
        return res.status(400).json(err)
    }
}

const updateUserAddress = async (req, res) => {
    try {
        const { id, addressId } = req.params;
        const { street, city, country, zipcode } = req.body;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const address = user.addresses.id(addressId);

        if (!address) {
            return res.status(404).json({ error: 'Address not found' });
        }

        if (street) address.street = street;
        if (city) address.city = city;
        if (country) address.country = country;
        if (zipcode) address.zipcode = zipcode;

        await user.save();

        res.status(200).json({ message: 'Address updated successfully', address });

    } catch (err) {
        res.status(500).json(err);
    }
};


module.exports = {
    registerUser,
    getUserById,
    updateUser,
    deleteUser,
    getUserAddresses,
    addUserAddress,
    updateUserAddress
}