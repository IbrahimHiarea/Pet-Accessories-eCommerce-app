import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    loading: false,
    data: null,
    isAuthorized: false,
    error: "",
};

export const fetchLogin= createAsyncThunk('userLogin/fetchLogin' , async (user) => {
    console.log();
    return axios
    .get(`http://localhost:3000/user`)
    .then((response) => {
        const res = {
            id: 0,
            phone: '',
            password: '',
            message: 'invalid phone or invalid password',
            isAuthorized: false,
        }
        response?.data?.forEach((e) => {
            if(e.password === user.password  &&  e.phone === user.phone){
                
                res.id = e.id;
                res.phone = e.phone;
                res.password = e.password;
                res.isAuthorized = true;
                res.message = '';
            }
        })
        return res;
    })
});


export const fetchRegister= createAsyncThunk('userRegister/fetchRegister' , async (user) => {
    return axios
        .post(
            `http://localhost:3000/user`,
            JSON.stringify(user),
            {
                headers: {
                    'Content-type': 'application/json',
                },
            }
        )
        .then((response) => {
            return response.data;
        })
});

export const fetchToken= createAsyncThunk('userToken/fetchToken' , async (id) => {
    return axios
    .get(`http://localhost:3000/user/${id}`)
    .then((response) => {
        const phone = localStorage.getItem("phone");
        const password = localStorage.getItem("password");
        const res = {
            isAuthorized: false,
        }
        if(response?.data?.phone === phone  &&  response?.data?.password === password){
            res.isAuthorized = true;
        }
        return res;
    })
});



const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        //  Register
        builder.addCase(fetchRegister.pending , (state) => {
            state.loading =  true;
        })
        builder.addCase(fetchRegister.fulfilled , (state , action) => {
            state.loading = false;
            state.data = action.payload;
            state.isAuthorized = true;
            state.error = '';
        })
        builder.addCase(fetchRegister.rejected , (state , action) => {
            state.loading = false;
            state.data = null;
            state.isAuthorized = false;
            state.error = action.error.message;
        })
        // Login
        builder.addCase(fetchLogin.pending , (state) => {
            state.loading = true;
        })
        builder.addCase(fetchLogin.fulfilled , (state , action) => {
            state.loading = false;
            if(action.payload.isAuthorized){
                state.data = {
                    id: action.payload.id,
                    phone: action.payload.phone,
                    password: action.payload.password,
                }
                state.isAuthorized = true;
                state.error = '';
            }else{
                state.data = null;
                state.isAuthorized = false;
                state.error = action.payload.message;
            }
        })
        builder.addCase(fetchLogin.rejected , (state , action) => {
            state.loading = false;
            state.data = null;
            state.isAuthorized = false;
            state.error = action.error.message;
        })
        // Check token
        builder.addCase(fetchToken.pending , (state) => {
            state.loading = true;
        })
        builder.addCase(fetchToken.fulfilled , (state , action) => {
            state.loading = false;
            if(action.payload.isAuthorized){
                state.isAuthorized = true;
            }else{
                state.isAuthorized = false;
            }
            state.error = '';
        })
        builder.addCase(fetchToken.rejected , (state , action) => {
            state.loading = false;
            state.isAuthorized = false;
            state.error = action.error.message;
        })
    },
})

export default userSlice.reducer;