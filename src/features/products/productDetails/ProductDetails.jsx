import React, { useEffect , useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProduct } from '../productSlice';
import { fetchAdd } from '../../cart/cartSlice';
import { fetchOrders} from '../../orders/orderSlice'
import { useNavigate } from 'react-router-dom';
import Toner from '../../../app/components/toner/Toner';

import style from './ProductDetails.module.css';

function ProductDetails() {

    const { id } = useParams();
    const state = useSelector((state) => state.product);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [counter , setCounter] = useState(0);


    useEffect(() => {
        dispatch(fetchProduct(id));
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

    const handleAdd =  async () => {
        const temp = {
            id: 0,
            name: state?.singleData?.name,
            amount: counter,
            price: state?.singleData?.price
        }
        try{
            const userId = localStorage.getItem('id');
            if(userId !== null){
                const response = await dispatch(fetchOrders(userId));

                if(response?.payload?.cart.length > 0)
                    temp.id = response?.payload?.cart[response?.payload?.cart?.length - 1]?.id + 1;
                else
                    temp.id = 1;

                const tempCart = response?.payload?.cart.map((item) => item);
                tempCart.push(temp);

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

                await dispatch(fetchAdd({userId , newUser}));
                navigate('/');
            }
        }
        catch(error){
            console.log(error);
        }
    }

    return (
        <div className={style.product}>
            <h1>product {id}</h1>
            <div className={style.info}>
                <div><span>Id :</span> {state?.singleData?.id}</div>
                <div><span>Name :</span> {state?.singleData?.name}</div>
                <div><span>Tag :</span> {state?.singleData?.tag}</div>
                <div><span>Price :</span> {state?.singleData?.price}$</div>
                <div><span>description :</span> {state?.singleData?.description}$</div>
                <div className={style.container}>
                    <Toner counter={counter} setCounter={setCounter}/>
                    <button disabled={counter === 0} onClick={handleAdd} className={style.button}>add</button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;