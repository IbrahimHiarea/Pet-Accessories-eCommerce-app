import React , { useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { fetchRegister } from '../userSlice';
import { useNavigate } from 'react-router-dom';
import style from './Register.module.css';

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const state = useSelector((state) => state.user);

    const [user , setUser] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        country: '',
        city: '',
        address: '',
        password: '',
        cart: [],
        orders: [],
    });

    const handleAdd = async (e) => {
        e.preventDefault();
        try{
            const response = await dispatch(fetchRegister(user));
            localStorage.clear();
            localStorage.setItem('id',response.payload.id);
            localStorage.setItem('phone',`${response.payload.phone}`);
            localStorage.setItem('password',`${response.payload.password}`);
            navigate('/');
        }
        catch(error){
            console.log(error);
        }
    }

    return (
        <div className={style.register}>
            <h1>welcome to eCommerce</h1>
            <form onSubmit={handleAdd}>
                <input type="text" placeholder='First Name' required onChange={(e) => { setUser({...user , firstName: e.target.value}) }}/>
                <input type="text" placeholder='last Name' required onChange={(e) => { setUser({...user , lastName: e.target.value}) }}/>
                <input type="text" placeholder='phone' required onChange={(e) => { setUser({...user , phone: e.target.value}) }}/>
                <input type="text" placeholder='country ' required onChange={(e) => { setUser({...user , country: e.target.value}) }}/>
                <input type="text" placeholder='city' required onChange={(e) => { setUser({...user , city: e.target.value}) }}/>
                <input type="text" placeholder='address' required onChange={(e) => { setUser({...user , address: e.target.value}) }}/>
                <input type="password" placeholder='password' required min={3} onChange={(e) => { setUser({...user , password: e.target.value}) }} />
                <input type="submit" value="Register"  style={{color: 'white'}} className={style.button}/>
            </form>
        </div>
    )
}

export default Register;