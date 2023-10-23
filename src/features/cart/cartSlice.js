import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    loading: false,
    data: null,
    totalPrice: 0,
    error: "",
};

export const fetchCart= createAsyncThunk('getCart/fetchCart' , async (id) => {
    return axios
    .get(`http://localhost:3000/user/${id}`)
    .then((response) => {
        return response.data;
    })
});

export const fetchDelete = createAsyncThunk('deleteItem/fetchDelete' , async (data) => {
    const id = data.userId;
    const user = data.newUser;
    return axios
        .put(
            `http://localhost:3000/user/${id}`,
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


export const fetchAdd = createAsyncThunk('addItem/fetchAdd' , async (data) => {
    const id = data.userId;
    const user = data.newUser;
    return axios
        .put(
            `http://localhost:3000/user/${id}`,
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



const cartSlice = createSlice({
    name: 'cart',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchCart.pending , (state) => {
            state.loading =  true;
        })
        builder.addCase(fetchCart.fulfilled , (state , action) => {
            state.loading = false;
            state.data = action.payload;
            state.totalPrice = 0;
            state?.data?.cart?.forEach((item) => {
                state.totalPrice += (item.amount * item.price);
            })
            state.error = '';
        })
        builder.addCase(fetchCart.rejected , (state , action) => {
            state.loading = false;
            state.data = null;
            state.totalPrice = 0;
            state.error = action.error.message;
        })
        // add to the cart
        builder.addCase(fetchAdd.pending , (state) => {
            state.loading = true;
        })
        builder.addCase(fetchAdd.fulfilled , (state , action) => {
            state.loading = false;
            state.totalPrice = 0;
            state.error = '';
        })
        builder.addCase(fetchAdd.rejected , (state , action) => {
            state.loading = false;
            state.data = action.payload;
            state.totalPrice = 0;
            state.error = '';
        })
        // delete from the cart
        builder.addCase(fetchDelete.pending , (state) => {
            state.loading = true;
        })
        builder.addCase(fetchDelete.fulfilled , (state , action) => {
            state.loading = false;
            state.data = action.payload;
            state.totalPrice = 0;
            state.error = '';
        })
        builder.addCase(fetchDelete.rejected , (state , action) => {
            state.loading = false;
            state.data = [];
            state.totalPrice = 0;
            state.error = action.error.message;
        })
    },
})

export default cartSlice.reducer;