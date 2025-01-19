const express = require('express');
const cors = require('cors');
const connectDb = require('./config/db');
const helmet = require('helmet');
const trimRequestBody = require('./middlewares/trimRequestBody');
const booksRoutes = require('./routes/booksRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const authRoutes = require('./routes/authRoutes');
const usersRoutes = require('./routes/usersRoutes');
const shippingsRoutes = require('./routes/shippingRoutes')
const discountsRoutes = require('./routes/discountsRoutes')
const reviewsRoutes = require('./routes/reviewsRoutes')
const inventoryRoutes = require('./routes/inventoryRoutes')
const notificationsRoutes = require('./routes/notificationsRoutes')
const cartRoutes = require('./routes/cartRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const port = 5000;

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet({
    hsts: false,
}));
app.use(trimRequestBody);

connectDb();

app.use('/api/books', booksRoutes)
app.use('/api/categories', categoriesRoutes)
app.use('/api/orders', ordersRoutes)
app.use('/auth', authRoutes)
app.use('/users', usersRoutes)
app.use('/api/shippings', shippingsRoutes)
app.use('/api/discounts', discountsRoutes)
app.use('/api/reviews', reviewsRoutes)
app.use('/api/inventory', inventoryRoutes)
app.use('/api/notifications', notificationsRoutes)
app.use('/api/carts', cartRoutes)
app.use('/api/admin', adminRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})