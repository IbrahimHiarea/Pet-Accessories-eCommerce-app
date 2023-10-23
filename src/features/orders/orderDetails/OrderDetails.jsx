import React , { useEffect , useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchOrders } from '../orderSlice';

import style from './OrderDetails.module.css'

function OrderDetails() {

    const { id } = useParams();
    const state = useSelector((state) => state.order);
    const dispatch = useDispatch();

    useEffect(() => {
        const userId = localStorage.getItem('id');
        if(userId !== null){
            dispatch(fetchOrders(userId));
        }
    },[])
    

    if(state.loading){
        return (
            <div className={style.loading}>
                loading...
            </div>
        );
    }

    else if(state.error !== ''){
        return (
            <div className={style.error}>
                Error
            </div>
        );
    }
    
    return (
        <div className={style.order}>
            <h1>Order {id}</h1>
            <div className={style.container}>
            {
                state?.data?.orders?.[id-1]?.cart.map((order) => {
                    return <div className={style.cart} key={order.id}>
                        <div><span>Name :</span> {order.name}</div>
                        <div><span>Amount :</span> {order.amount}</div>
                        <div><span>Price :</span> {order.price}</div>
                    </div>
                })   
            }
            </div>
        </div>
    );
}

export default OrderDetails;