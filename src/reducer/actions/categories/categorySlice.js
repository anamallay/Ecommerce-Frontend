import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURl } from "../baseURl";
export const fetchCategories = createAsyncThunk("categories/fetchCategories", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${baseURl}/api/categories`);
        return response.data.payload;
    }
    catch (error) {
        console.error("Error fetching categories:", error);
        return rejectWithValue("Error fetching categories");
    }
});
export const createCategories = createAsyncThunk("categories/createCategories", async (categoryData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${baseURl}/api/categories`, categoryData);
        return response.data.payload;
    }
    catch (error) {
        console.error("Error creating category:", error);
        return rejectWithValue(error.response.data);
    }
});
export const updateCategories = createAsyncThunk("categories/updateCategories", async ({ id, categoryData }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${baseURl}/api/categories/${id}`, categoryData);
        return response.data.payload;
    }
    catch (error) {
        console.error("Error updating category:", error);
        return rejectWithValue("Error updating category");
    }
});
export const deleteCategories = createAsyncThunk("categories/deleteCategories", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`${baseURl}/api/categories/${id}`);
        return response.data.payload;
    }
    catch (error) {
        console.error("Error deleting category:", error);
        return rejectWithValue("Error deleting category");
    }
});
const initialState = {
    categories: [],
    error: null,
    isLoading: false,
};
export const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
            state.isLoading = false;
        })
            .addCase(createCategories.fulfilled, (state) => {
            state.isLoading = false;
        })
            .addCase(updateCategories.fulfilled, (state) => {
            state.isLoading = false;
        })
            .addCase(deleteCategories.fulfilled, (state) => {
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
// export const { } = categorySlice.actions
export default categorySlice.reducer;
