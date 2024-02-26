import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURl } from "../baseURl";
axios.defaults.withCredentials = true;
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const response = await axios.get(`${baseURl}/api/products`);
    return response.data;
});
export const findProductById = createAsyncThunk("products/findProductById", async (id) => {
    const response = await axios.get(`${baseURl}/api/products/${id}`);
    return response.data;
});
export const fetchProductByLimit = createAsyncThunk("products/fetchProductByLimit", async ({ page, limit }) => {
    const response = await axios.get(`${baseURl}/api/products/pagination/?page=${page}&limit=${limit}`);
    return response.data;
});
export const createProduct = createAsyncThunk("products/createProduct", async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${baseURl}/api/products`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error.response.data);
    }
});
export const updateProduct = createAsyncThunk("products/updateProduct", async ({ slug, productsData }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`http://localhost:3002/api/products/${slug}`, productsData);
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error.response.data);
    }
});
export const deleteProduct = createAsyncThunk("products/deleteProduct", async (slug, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`http://localhost:3002/api/products/${slug}`);
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error.response.data);
    }
});
// Initial state
const initialState = {
    products: [],
    error: null,
    isLoading: false,
    singleProduct: null,
    pagination: {
        page: 0,
        totalPages: 0,
        totalCount: 0,
    },
};
// Slice
export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload.data;
            state.isLoading = false;
        })
            .addCase(fetchProductByLimit.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload.data;
            state.pagination = action.payload.pagination;
        })
            .addCase(createProduct.fulfilled, (state) => {
            state.isLoading = false;
        })
            .addCase(updateProduct.fulfilled, (state) => {
            state.isLoading = false;
        })
            .addCase(deleteProduct.fulfilled, (state) => {
            state.isLoading = false;
        })
            .addCase(findProductById.fulfilled, (state) => {
            state.isLoading = false;
        })
            // Handle pending and rejected for all async thunks in a generic way
            .addMatcher((action) => action.type.endsWith("/pending"), (state) => {
            state.isLoading = true;
            state.error = null;
        })
            .addMatcher((action) => action.type.endsWith("/rejected"), (state, action) => {
            state.error = action.error.message || "An error occurred";
            state.isLoading = false;
        });
    },
});
// export const {  } = productsSlice.actions
export default productsSlice.reducer;
