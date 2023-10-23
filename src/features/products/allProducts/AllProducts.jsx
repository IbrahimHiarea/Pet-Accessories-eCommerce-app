import React, { useEffect , useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { fetchAllProducts } from '../productSlice';
import { useNavigate } from 'react-router-dom';
import style from './AllProducts.module.css';

function AllProducts() {
    const navigate = useNavigate();
    const state = useSelector((state) => state.product);
    const dispatch = useDispatch();
    const [filter, setFilter] = useState('');

    useEffect(() => {
        dispatch(fetchAllProducts());
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
        <div className={style['all-products']}>
            <h1>All Products</h1>
            <div className={style.container}>
                <input type="text" placeholder="Filter" value={filter} onChange = {(e) => setFilter(e.target.value) } />
                <button onClick={() => navigate(`/cart`)}>Cart</button>
                <button onClick={() => navigate(`/orders`)}>My Orders</button>
                <button style={{backgroundColor: 'red'}} onClick={() => {
                    localStorage.clear();
                    navigate(`/login`);
                }}>Logout</button>
            </div>
            <div className={style.products}>
                {
                    state?.data?.map((product) => {
                        if(filter === ''){
                            return <div className={style.product} key={product.id} onClick={() => navigate(`/${product.id}`)}>
                                <div>Name : {product.name}</div>
                                <div>Tag : {product.tag}</div>
                                <div>Price : {product.price} $</div>
                            </div>
                        }
                        else if(filter === product.tag){
                            return <div className={style.product} key={product.id} onClick={() => navigate(`/${product.id}`)}>
                                <div>Name : {product.name}</div>
                                <div>Tag : {product.tag}</div>
                                <div>Price : {product.price} $</div>
                            </div>
                        }
                    })   
                }
            </div>
        </div>
    );
}

export default AllProducts;