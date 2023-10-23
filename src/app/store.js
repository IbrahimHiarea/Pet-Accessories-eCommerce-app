import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from '../features/products/productSlice';
import CartReducer from '../features/cart/cartSlice';
import UserReducer from '../features/user/userSlice';
import OrderReducer from '../features/orders/orderSlice';

const store = configureStore({
    reducer: {
        product: ProductReducer,
        cart: CartReducer,
        user: UserReducer,
        order: OrderReducer,
    }
})

export default store;