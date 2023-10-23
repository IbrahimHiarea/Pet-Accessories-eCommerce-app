import React from 'react'
import { Route , Routes } from 'react-router-dom';
import Login from '../features/user/login/Login'
import AllProduct from '../features/products/allProducts/AllProducts';
import ProductDetails from '../features/products/productDetails/ProductDetails';
import CartDetails from '../features/cart/cartDetails/CartDetails';
import Register from '../features/user/register/register';
import AllOrders from '../features/orders/allOrders/AllOrders';
import OrderDetails from '../features/orders/orderDetails/OrderDetails';
import ProtectedRoute from './ProtectedRoute';

function AllRoutes() {
    return (
        <Routes>

            {/* register */}
            <Route path='/register' element={ <Register/> }/>

            {/* Login */}
            <Route path='/login' element={ <Login/> }/>


            <Route element= {<ProtectedRoute to='/login' check={() => {return localStorage.length === 0 ? false : true}}/>} >
                {/* All product */}
                <Route path='/' element = { <AllProduct /> } />

                {/* product details */}
                <Route path='/:id' element={ <ProductDetails/> }/>

                {/* cart details */}
                <Route path='/cart/' element={ <CartDetails/> }/>

                {/* orders */}
                <Route path='/orders/' element={ <AllOrders/> }/>

                {/* orders Details */}
                <Route path='/order/:id' element={ <OrderDetails/> }/>
            </Route>
            

        </Routes>
    );
}

export default AllRoutes;