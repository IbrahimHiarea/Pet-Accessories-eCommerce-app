import React, { useEffect  } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { fetchCart , fetchDelete } from '../cartSlice';
import {fetchOrders , fetchAdd} from '../../orders/orderSlice'
import style from './CartDetails.module.css';
import { useNavigate } from 'react-router-dom';

function CartDetails() {

    const navigate = useNavigate();
    const state = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        const userId = localStorage.getItem('id');
        if(userId !== null){
            dispatch(fetchCart(userId));
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

    const handleDelete = async (itemId) => {
        try{
            const userId = localStorage.getItem('id');
            if(userId !== null){
                const response = await dispatch(fetchOrders(userId));

                const tempCart = response?.payload?.cart?.filter((item) => {
                    return item.id !== itemId;
                });

                const newUser = {
                    id: response.payload.id,
                    firstName: response.payload.firstName,
                    lastName: response.payload.lastName,
                    phone: response.payload.phone,
                    country: response.payload.country,
                    city: response.payload.city,
                    address: response.payload.address,
                    password: response.payload.password,
                    cart: tempCart,
                    orders: response.payload.orders,
                }
                
                dispatch(fetchDelete({userId , newUser}));
            }
            window.location.reload();
        }
        catch(error){
            console.log(error);
        }
    }

    const handleBuy = async ()=> {
        const temp = {
            id: 0,
            totalPrice: state?.totalPrice,
            cart: state?.data?.cart,
        }
        try{
            const userId = localStorage.getItem('id');
            if(userId !== null){
                const response = await dispatch(fetchOrders(userId));
                
                if(response?.payload?.orders?.length > 0)
                    temp.id = response?.payload?.orders[response?.payload?.orders?.length - 1]?.id + 1;
                else
                    temp.id = 1;

                const tempOrders = response?.payload?.orders.map((order) => order);
                tempOrders.push(temp);

                const newUser = {
                    id: response.payload.id,
                    firstName: response.payload.firstName,
                    lastName: response.payload.lastName,
                    phone: response.payload.phone,
                    country: response.payload.country,
                    city: response.payload.city,
                    address: response.payload.address,
                    password: response.payload.password,
                    cart: [],
                    orders: tempOrders
                }
                
                await dispatch(fetchAdd({userId , newUser}));
                navigate('/');
            }
        }
        catch(error){
            console.log(error);
        }
    }

    return (
        <div className={style.cart}>
            <h1>Cart</h1>
            <div className={style.container}>
                <h2>The Total Price is : <span>{state?.totalPrice}</span> $</h2>
                <button disabled={state?.totalPrice === 0} onClick={handleBuy}>Check out</button>
            </div>
            <div className={style.products}>
                {
                    state?.data?.cart?.map((item) => {
                        return <div className={style.product} key={item?.id}>
                            <div>Name : {item?.name}</div>
                            <div>Amount : {item?.amount}</div>
                            <div>Bulk price : {item?.price} $</div>
                            <button className={style.delete}  onClick={() => handleDelete(item?.id)}>Delete</button>
                        </div>
                    })   
                }
            </div>
        </div>
    );
}

export default CartDetails;