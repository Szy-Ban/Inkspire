const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();


const loginUser = async (req, res) => {
    try{

        const {email, password} = req.body;

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({error: "User does not exist"})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.status(401).json({error: "Invalid password!"})
        }

        const token = jwt.sign(
            {id: user._id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: '45m'}
        )

        return res.status(200).json({message: "Login successful!", token})

    } catch (err) {
        console.error("Error during login: ", err)
        return res.status(500).json(err);
    }
}

const logoutUser = async (req, res) => {
    try {

        return res.status(200).json({error: "User logged out"})

    } catch (err) {
        return res.status(500).json(err)
    }
}

module.exports = {
    loginUser,
    logoutUser
}