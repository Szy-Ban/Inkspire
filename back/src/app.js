const express = require('express');
const cors = require('cors');
const connectDb = require('./config/db');
const booksRoutes = require('./routes/booksRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

connectDb();

app.use('/api/books', booksRoutes)
app.use('/api/categories', categoriesRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})