import React , { useEffect , useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { fetchOrders } from '../orderSlice';
import { useNavigate } from 'react-router-dom';

import style from './AllOrders.module.css';

function AllOrders() {

    const navigate = useNavigate();
    const state = useSelector((state) => state.order);
    const dispatch = useDispatch();

    useEffect(() => {
        const id = localStorage.getItem('id');
        if(id !== null){
            dispatch(fetchOrders(id));
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
        <div className={style["all-orders"]}>
            <h1>Orders</h1>
            <div className={style.orders}>
            {
                state?.data?.orders?.map((order) => {
                    return <div className={style.order} key={order.id} onClick={() => navigate(`/order/${order.id}`)}>
                        <div> <span>Id :</span> {order.id}</div>
                        <div><span>Total Price :</span> {order.totalPrice} $</div>
                    </div>
                })   
            }
            </div>
        </div>
    );
}

export default AllOrders;