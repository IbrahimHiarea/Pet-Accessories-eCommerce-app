import React , { useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { fetchLogin } from '../userSlice';
import { useNavigate , Navigate, Link } from 'react-router-dom';
import style from './Login.module.css';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const state = useSelector((state) => state.user);
    const [error , setError] = useState('');

    const [user , setUser] = useState({
        phone: '',
        password: '',
    })

    const handleAdd = async (e) => {
        e.preventDefault();
        try{
            const response = await dispatch(fetchLogin(user));
            if(response.payload.isAuthorized){
                localStorage.clear();
                localStorage.setItem('id',response.payload.id);
                localStorage.setItem('phone',`${response.payload.phone}`);
                localStorage.setItem('password',`${response.payload.password}`);
                navigate('/');
            }else{
                setError(response.payload.message);
            }
        }
        catch(error){
            console.log(error);
        }
    }

    return (
        <div className={style.login}>
            <h1>welcome to eCommerce ,Please Login</h1>
            <form onSubmit={handleAdd}>
                <input type="text" placeholder='phone' required onChange={(e) => { setUser({...user , phone: e.target.value}) }}/>
                <input type="password" placeholder='password' required min={3} onChange={(e) => { setUser({...user , password: e.target.value}) }} />
                <input type="submit" value="login" style={{color: 'white'}} className={style.button} />
            </form>
            <div className={style.register}>
                Don't have an account ? <Link to='/register'>Register</Link>
            </div>
            {
                error !== ''  &&  
                <div className={style['error-message']}>
                    {error}
                </div>
            }
        </div>
    );
}

export default Login;