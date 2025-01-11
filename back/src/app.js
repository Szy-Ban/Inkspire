const express = require('express');
const cors = require('cors');
const connectDb = require('./config/db');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

connectDb();


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})