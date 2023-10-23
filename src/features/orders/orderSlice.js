import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    loading: false,
    data: [],
    error: "",
};

export const fetchOrders = createAsyncThunk('getOrders/fetchOrders' , async (id) => {
    return axios
    .get(`http://localhost:3000/user/${id}`)
    .then((response) => {
        return response.data;
    })
});

export const fetchAdd = createAsyncThunk('addOrder/fetchAdd' , async (data) => {
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


const orderSlice = createSlice({
    name: 'order',
    initialState,
    extraReducers: (builder) => {
        // get Orders
        builder.addCase(fetchOrders.pending , (state) => {
            state.loading =  true;
        })
        builder.addCase(fetchOrders.fulfilled , (state , action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = '';
        })
        builder.addCase(fetchOrders.rejected , (state , action) => {
            state.loading = false;
            state.data = [];
            state.error = action.error.message;
        })
        // add Order
        builder.addCase(fetchAdd.pending , (state) => {
            state.loading = true;
        })
        builder.addCase(fetchAdd.fulfilled , (state , action) => {
            console.log(action);
            state.loading = false;
            state.error = '';
        })
        builder.addCase(fetchAdd.rejected , (state , action) => {
            state.loading = false;
            state.data = [];
            state.error = action.error.message;
        })
    },
})

export default orderSlice.reducer;