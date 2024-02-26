import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURl } from "../baseURl";
axios.defaults.withCredentials = true;
export const fetchUsers = createAsyncThunk("users/fetchUsers", async ({ page, limit }) => {
    const response = await axios.get(`${baseURl}/api/users?page=${page}&limit=${limit}`);
    return response.data;
});
export const createUser = createAsyncThunk("users/createUser", async (userData) => {
    const response = await axios.post(`${baseURl}/api/users/register`, userData);
    return response.data;
});
export const loginUser = createAsyncThunk("users/loginUser", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${baseURl}/api/auth/login`, userData);
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error);
    }
});
export const logoutUser = createAsyncThunk("users/logoutUser", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${baseURl}/api/auth/logout`);
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error);
    }
});
export const forgetPassword = createAsyncThunk("users/forgetPassword", async (email) => {
    const response = await axios.post(`${baseURl}/api/auth/forget-password`, {
        email: email,
    });
    return response.data;
});
export const resetPassword = createAsyncThunk("users/resetPassword", async (args) => {
    const { password, token } = args;
    console.log("password, token", password, token);
    const response = await axios.put(`${baseURl}/api/auth/reset-password`, {
        password,
        token,
    });
    return response.data;
});
export const Updateusers = createAsyncThunk("users/updateUser", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${baseURl}/api/users/${userData._id}`, userData);
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error.response.data);
    }
});
export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
    const response = await axios.delete(`${baseURl}/api/users/${id}`);
    return response.data;
});
export const banUser = createAsyncThunk("users/banUser", async (id) => {
    const response = await axios.put(`${baseURl}/api/users/ban/${id}`);
    return response.data;
});
export const unbanUser = createAsyncThunk("users/unbanUser", async (id) => {
    const response = await axios.put(`${baseURl}/api/users/unban/${id}`);
    return response.data;
});
const loginData = localStorage.getItem("loginData");
const initialState = {
    users: [],
    error: null,
    isLoading: false,
    isLoggedIn: loginData ? JSON.parse(loginData).isLoggedIn : false,
    userData: loginData ? JSON.parse(loginData).userData : null,
};
export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // fulfilled => fetchUsers
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload;
            state.isLoading = false;
        });
        // fulfilled => loginUser
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            state.userData = action.payload.payload;
            localStorage.setItem("loginData", JSON.stringify({
                isLoggedIn: state.isLoggedIn,
                userData: state.userData,
            }));
            state.isLoading = false;
        });
        // fulfilled => logoutUser
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.isLoggedIn = false;
            state.userData = null;
            localStorage.setItem("loginData", JSON.stringify({
                isLoggedIn: state.isLoggedIn,
                userData: state.userData,
            }));
            state.isLoading = false;
            // localStorage.removeItem("loginData");
        });
        // fulfilled => createUser
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.isLoggedIn = false;
        });
        // fulfilled => forgetPassword
        builder.addCase(forgetPassword.fulfilled, (state, action) => {
            state.isLoggedIn = false;
        });
        // fulfilled => resetPassword
        builder.addCase(resetPassword.fulfilled, (state, action) => {
            state.isLoggedIn = false;
        });
        // fulfilled => Updateusers
        builder.addCase(Updateusers.fulfilled, (state, action) => {
            state.userData.first_name = action.payload.payload.first_name;
            state.userData.last_name = action.payload.payload.last_name;
            localStorage.setItem("loginData", JSON.stringify({
                isLoggedIn: state.isLoggedIn,
                userData: state.userData,
            }));
        });
        // fulfilled => deleteUser
        builder.addCase(deleteUser.fulfilled, (state, action) => { });
        // fulfilled => banUser
        builder.addCase(banUser.fulfilled, (state, action) => { });
        // fulfilled => unbanUser
        builder.addCase(unbanUser.fulfilled, (state, action) => { });
        //* pending
        builder.addMatcher((action) => action.type.endsWith("/pending"), (state) => {
            state.isLoading = true;
            state.error = null;
        });
        //* rejected
        builder.addMatcher((action) => action.type.endsWith("/rejected"), (state, action) => {
            state.error = action.error.message || "an error occurred";
            state.isLoading = false;
        });
    },
});
// export const {  } = usersSlice.actions;
export default usersSlice.reducer;
