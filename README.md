# Pet Accessories eCommerce App

## Description:
This is a Pet Accessories eCommerce application built using React.js, Vite, Redux Toolkit, and JSON Server. The app provides a user-friendly interface for customers to browse and purchase pet accessories, manage their cart, login, register, and view past orders.

## Features:
- Product Display: The app allows users to browse pet accessories with various tags that help filter and search groups of products. Each product is associated with an ID, name, price, and tag. Users can filter products based on tags and view detailed information such as name, tag, price, and description.

- Cart Management: Users can add products to their cart, which displays the product name along with the selected quantity and total price. The cart also shows the total price for all products in the cart. Users can remove products from the cart as well.

- User Authentication: The app provides a login and register functionality for users to create an account and authenticate themselves.

- Order History: Users can view their past orders, allowing them to track their purchase history and review previous transactions.

## Technologies Used:
- React.js
- Vite
- Redux Toolkit
- JSON Server

## Installation:
1. Clone the repository:
   git clone https://github.com/IbrahimHiarea/Pet-Accessories-eCommerce-app

2. Install dependencies:
   cd ecommerce
   npm install

3. Start the development server:
   npm run dev

4. Start the json-server
    npx json-server --watch data/db.json --port 3000

5. Open your browser and visit http://localhost:8000 to access the app.

## Usage:
- Browse the app to view the available pet accessories.
- Use the tags or search functionality to filter and search for specific products.
- Click on a product to view detailed information.
- Add products to the cart by specifying the quantity.
- View and manage the cart, including removing products.
- Register or login to create an account or authenticate yourself.
- View your past orders to track your purchase history.

Notes:
- The app uses JSON Server to simulate a backend API. The product data is stored in a JSON file.
- This project is created for learning and demonstration purposes. It is not intended for production use.