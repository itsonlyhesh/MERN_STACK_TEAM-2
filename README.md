# 📚 Book Haven

Book Haven is a full-stack online bookstore built using the **MERN Stack (MongoDB, Express.js, React, Node.js)**. It allows users to browse books, search by category, manage carts and wishlists, and place orders through a responsive and user-friendly interface.

## ✨ Features

- 📖 Browse books by category
- 🔍 Search books
- ❤️ Wishlist management
- 🛒 Shopping cart
- 👤 User authentication (JWT)
- 📦 Order management
- 📱 Responsive design
- 🗄 MongoDB database integration

## 🛠 Tech Stack

- **Frontend:** React, Vite, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT, bcrypt

## 🚀 Getting Started

### Install dependencies

```bash
npm install
cd server
npm install
```

### Configure environment variables

Create a `.env` file inside the `server` folder:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/books
JWT_SECRET=your_secret_key
```

### Run the application

Backend:

```bash
cd server
npm run dev
```

Frontend:

```bash
npm run dev
```
