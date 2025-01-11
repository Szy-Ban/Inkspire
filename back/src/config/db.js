const mongoose = require('mongoose');
require('dotenv').config();
const dbURL = process.env.DATABASE_URL

const connectDb = () => {
    mongoose.connect(dbURL)
        .then(()=>{
            console.log("MongoDB Connected!");
        })
        .catch(err=>{
            console.log(err);
        })
}

module.exports = connectDb;