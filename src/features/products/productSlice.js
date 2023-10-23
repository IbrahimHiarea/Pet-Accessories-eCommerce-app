import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    loading: false,
    data: [],
    singleData: null,
    error: "",
};

export const fetchAllProducts = createAsyncThunk('allProducts/fetchAllProducts', async () => {
    return axios
        .get('http://localhost:3000/products')
        .then((response) => {
            return response.data;
        })
})

export const fetchProduct = createAsyncThunk('getProduct/fetchProduct' , async (id) => {
    return axios
    .get(`http://localhost:3000/products/${id}`)
    .then((response) => {
        return response.data;
    })
});


const productSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers: (builder) => {
        // get all products
        builder.addCase(fetchAllProducts.pending , (state) => {
            state.loading =  true;
        })
        builder.addCase(fetchAllProducts.fulfilled , (state , action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = '';
        })
        builder.addCase(fetchAllProducts.rejected , (state , action) => {
            state.loading = false;
            state.data = [];
            state.error = action.error.message;
        })
        // get product by id
        builder.addCase(fetchProduct.pending , (state) => {
            state.loading = true;
        })
        builder.addCase(fetchProduct.fulfilled , (state , action) => {
            state.loading = false;
            state.singleData = action.payload;
            state.error = '';
        })
        builder.addCase(fetchProduct.rejected , (state , action) => {
            state.loading = false;
            state.singleData = null;
            state.error = action.error.message;
        })
    },
})

export default productSlice.reducer;