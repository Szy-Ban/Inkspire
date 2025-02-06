# Inkspire – Bookstore Web App

Inkspire is a full-stack web application designed for browsing, searching, and purchasing books online. I built this project with a focus on clean code, secure user authentication, and an intuitive user interface. The application combines a modern React frontend with an Express.js/MongoDB backend to deliver a comprehensive e-commerce solution.

## Table of Contents
- [Features](#features)
  - [Frontend](#frontend)
    - [User Functionality](#user-functionality)
    - [Visual Implementation](#visual-implementation)
    - [Technical Implementation](#technical-implementation)
  - [Backend](#backend)
- [API Endpoints](#api-endpoints)
  - [Admin Routes](#admin-routes)
  - [Authentication](#authentication)
  - [Books](#books)
  - [Cart](#cart)
  - [Categories](#categories)
  - [Discounts](#discounts)
  - [Inventory](#inventory)
  - [Notifications](#notifications)
  - [Orders](#orders)
  - [Reviews](#reviews)
  - [Shipping](#shipping)
  - [Users](#users)
- [Middlewares](#middlewares)
- [Technologies](#technologies)
  - [Frontend Technologies](#frontend-technologies)
  - [Backend Technologies](#backend-technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Features

### Frontend

#### User Functionality
- **Account Management:**  
  - Users can create an account by providing their first name, last name, email, and password.
  - Secure login and logout functionalities are implemented using JWT authentication.
- **Shopping Cart:**  
  - Users can add or remove books from their cart.
  - The application calculates and displays the total price of the items in the cart.
- **Product Browsing:**  
  - The homepage displays available book categories.
  - Users can filter books by various criteria such as price, size, and color.
- **Ratings and Reviews:**  
  - Users can submit reviews and ratings for books.
  - The application calculates and displays the average rating for each book.

#### Visual Implementation
- **Tailwind CSS:**  
  - I used Tailwind CSS to design a clean and responsive user interface that adapts to various screen sizes.
- **Responsive Layouts:**  
  - Utilized Flexbox and CSS Grid to create efficient, responsive layouts that improve the overall user experience.
- **UI Consistency:**  
  - Custom CSS pseudoclasses were used to define different element states, ensuring a smooth and interactive interface.

#### Technical Implementation
- **React & JSX:**  
  - The frontend is built with React using JSX for component-based UI development.
- **Reusable Components & Routing:**  
  - I created reusable components throughout the application and implemented routing using React Router.
- **State Management & Hooks:**  
  - The application makes extensive use of React Hooks (`useState`, `useEffect`, `useLayoutEffect`) to manage component state and side effects.
- **API Integration:**  
  - Frontend communicates with the backend using RESTful API calls to fetch and update data.
- **Formik for Forms:**  
  - All forms are managed using Formik for robust form handling and validation.

---

### Backend

The backend is built with Express.js and MongoDB (using Mongoose) to manage data and provide RESTful endpoints for the application. It handles everything from user authentication to order processing.

- **REST API:**  
  - I designed a comprehensive REST API that handles user management, book operations, order processing, and more.
- **Security:**  
  - JWT-based authentication ensures that only authorized users can access protected routes.
  - Middleware functions are used for role-based access control, input sanitization, and error handling.
- **Data Modeling:**  
  - MongoDB is used for data storage with Mongoose models to enforce schema validations and pre-save hooks.
- **Logging & Error Handling:**  
  - Proper error handling and logging are implemented to facilitate debugging and ensure a robust production environment.

---

## API Endpoints

### Admin Routes (Require Admin Privileges & Token Authentication)
- **Users Management:**
  - `GET /api/admin/users`  
    Retrieve all users (passwords are excluded).
  - `GET /api/admin/users/:id`  
    Retrieve details of a specific user by their ID.
  - `DELETE /api/admin/users/:id`  
    Delete a user by their ID.
- **Books Management:**
  - `GET /api/admin/books`  
    Retrieve all books.
  - `POST /api/admin/books`  
    Add a new book.
  - `PUT /api/admin/books/:id`  
    Update an existing book.
  - `DELETE /api/admin/books/:id`  
    Delete a book.

---

### Authentication
- `POST /auth/login`  
  Log in a user and return a JWT token.
- `POST /auth/logout`  
  Log out the authenticated user.

---

### Books
- `GET /api/books/`  
  Retrieve all books.
- `GET /api/books/:id`  
  Retrieve details for a specific book.
- `GET /api/books/search`  
  Search for books using query parameters (such as categories, authors, title, minPrice, and maxPrice).
- `GET /api/books/authors`  
  Retrieve a list of distinct book authors.
- `GET /api/books/categories/books`  
  Retrieve categories along with up to 5 books per category.
- `POST /api/books/`  
  Add a new book (requires admin privileges).
- `PUT /api/books/:id`  
  Update a book (requires admin privileges).
- `DELETE /api/books/:id`  
  Delete a book (requires admin privileges).

---

### Cart
- `GET /api/carts/cart`  
  Retrieve the authenticated user's shopping cart.
- `POST /api/carts/cart/items`  
  Add an item to the cart.
- `DELETE /api/carts/cart/items`  
  Remove an item from the cart.
- `DELETE /api/carts/cart`  
  Clear the shopping cart.

---

### Categories
- `GET /api/categories/`  
  Retrieve all categories.
- `GET /api/categories/:id`  
  Retrieve details for a specific category.
- `POST /api/categories/`  
  Add a new category (requires admin privileges).
- `PUT /api/categories/:id`  
  Update a category (requires admin privileges).
- `DELETE /api/categories/:id`  
  Delete a category (requires admin privileges).

---

### Discounts
- `GET /api/discounts/`  
  Retrieve all discounts.
- `GET /api/discounts/:id`  
  Retrieve details for a specific discount.
- `POST /api/discounts/`  
  Add a new discount (requires admin privileges).
- `PUT /api/discounts/:id`  
  Update a discount (requires admin privileges).
- `DELETE /api/discounts/:id`  
  Delete a discount (requires admin privileges).

---

### Inventory
- `GET /api/inventory/`  
  Retrieve a list of products along with their current stock.
- `GET /api/inventory/:id`  
  Retrieve inventory details for a specific product.
- `PUT /api/inventory/:id`  
  Update the stock of a product.
- `DELETE /api/inventory/:id`  
  Remove a product from inventory (sets stock to 0).

---

### Notifications
- `GET /api/notifications/`  
  Retrieve notifications (filterable by type and read status).
- `POST /api/notifications/`  
  Create a new notification (requires admin privileges).
- `PUT /api/notifications/:id`  
  Mark a notification as read.
- `DELETE /api/notifications/:id`  
  Delete a notification (requires admin privileges).

---

### Orders
- `GET /api/orders/`  
  Retrieve all orders (admin only).
- `GET /api/orders/user`  
  Retrieve orders for the authenticated user.
- `GET /api/orders/:id`  
  Retrieve details for a specific order (for the authenticated user).
- `POST /api/orders/`  
  Create a new order.
- `PUT /api/orders/:id`  
  Update an order (admin only).
- `PUT /api/orders/:id/confirm`  
  Confirm an order (for the authenticated user).
- `PATCH /api/orders/:id/cancel`  
  Cancel an order (for the authenticated user).

---

### Reviews
- `GET /api/reviews/`  
  Retrieve reviews for a specific book (requires a `bookId` query parameter).
- `POST /api/reviews/`  
  Add a review for a book (requires authentication).
- `DELETE /api/reviews/:id`  
  Delete a review (only the review owner can delete).

---

### Shipping
- `GET /api/shippings/`  
  Retrieve all shipping options.
- `GET /api/shippings/:id`  
  Retrieve details for a specific shipping option.
- `POST /api/shippings/`  
  Add a new shipping option (requires admin privileges).
- `PUT /api/shippings/:id`  
  Update a shipping option (requires admin privileges).
- `DELETE /api/shippings/:id`  
  Delete a shipping option (requires admin privileges).

---

### Users
- `POST /users/register`  
  Register a new user.
- **Profile & Addresses (Protected Routes):**
  - `GET /users/profile`  
    Retrieve the authenticated user's profile.
  - `PUT /users/profile`  
    Update the authenticated user's profile.
  - `DELETE /users/profile`  
    Delete the authenticated user's profile.
  - `GET /users/addresses`  
    Retrieve the user's saved addresses.
  - `POST /users/addresses`  
    Add a new address.
  - `PUT /users/addresses/:addressId`  
    Update an existing address.
  - `DELETE /users/addresses/:addressId`  
    Delete an address.

---

## Middlewares

Several custom middleware functions have been implemented to ensure data consistency, security, and proper processing:

- **totalPrice:**  
  A pre-save hook that calculates the total price of items in the cart by summing each item's price multiplied by its quantity.
- **checkAdminRole:**  
  Verifies that the authenticated user has an `admin` role; otherwise, returns a 403 error.
- **hashPassword:**  
  A pre-save hook that hashes the user’s password using bcrypt if the password is new or modified.
- **loginLimiter:**  
  Limits login attempts to a maximum of 5 within a 5-minute window to protect against brute-force attacks.
- **trimFields:**  
  Trims whitespace from all string fields in the request body for data consistency.
- **verifyToken:**  
  Validates the JWT provided in the `Authorization` header and sets `req.user` with the token payload if valid.

---

## Technologies

### Frontend Technologies
- **React:**  
  Built with React using JSX for a component-based UI.
- **Tailwind CSS:**  
  Tailwind CSS was used to design a responsive, clean, and modern UI.
- **React Router:**  
  Implemented routing with React Router to manage navigation between pages.
- **Formik:**  
  Used Formik to manage and validate form inputs.
- **React Hooks:**  
  Employed hooks like `useState`, `useEffect`, and `useLayoutEffect` for state management and side effects.

### Backend Technologies
- **Express.js:**  
  The backend is built using Express.js to create RESTful APIs.
- **MongoDB & Mongoose:**  
  MongoDB is used as the database with Mongoose for schema modeling and data validation.
- **JWT Authentication:**  
  JSON Web Tokens (JWT) secure protected routes.
- **Helmet:**  
  Helmet is used to set secure HTTP headers.
- **Express Rate Limit:**  
  Implemented rate limiting (e.g., on login routes) to protect against brute-force attacks.

---

## Installation

### Requirements
- Node.js
- npm or yarn
- MongoDB (either local or remote, I've used Mongo Atlas)
