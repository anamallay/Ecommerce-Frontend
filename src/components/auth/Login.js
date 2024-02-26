import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Copyright } from "../layout/Copyright";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, loginUser } from "../../reducer/actions/users/usersSlice";
import { useEffect } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useToaster } from "../../contexts/ToasterProvider";
import { useNavigate } from "react-router-dom";
import CircularColor from "../pages/Loading";
export default function Login({ pathName }) {
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.users);
    const navigate = useNavigate();
    const { showHideToast } = useToaster();
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);
    if (isLoading)
        return _jsx(CircularColor, {});
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userData = {
            email: data.get("email"),
            password: data.get("password"),
        };
        try {
            const resultAction = await dispatch(loginUser(userData));
            const loginResponse = resultAction.payload.payload.isAdmin;
            const user = unwrapResult(resultAction);
            navigate(pathName || `${loginResponse ? "/dashboard/admin" : "/dashboard/user"}`);
            showHideToast(user.message, "success");
        }
        catch (error) {
            if (error instanceof Error) {
                showHideToast(error.message, "warning");
            }
            else {
                console.error("An unexpected error occurred:", error);
                showHideToast("An unexpected error occurred", "warning");
            }
        }
    };
    return (_jsxs(Container, { component: "main", maxWidth: "xs", children: [_jsx(CssBaseline, {}), _jsxs(Box, { sx: {
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }, children: [_jsx(Avatar, { sx: { m: 1, bgcolor: "secondary.main" }, children: _jsx(LockOutlinedIcon, {}) }), _jsx(Typography, { component: "h1", variant: "h5", children: "Sign in" }), _jsxs(Box, { component: "form", onSubmit: handleSubmit, noValidate: true, sx: { mt: 1 }, children: [_jsx(TextField, { margin: "normal", required: true, fullWidth: true, id: "email", label: "Email Address", name: "email", autoComplete: "email", autoFocus: true }), _jsx(TextField, { margin: "normal", required: true, fullWidth: true, name: "password", label: "Password", type: "password", id: "password", autoComplete: "current-password" }), _jsx(FormControlLabel, { control: _jsx(Checkbox, { value: "remember", color: "primary" }), label: "Remember me" }), _jsx(Button, { type: "submit", fullWidth: true, variant: "contained", sx: { mt: 3, mb: 2 }, children: "Sign In" }), _jsxs(Grid, { container: true, children: [_jsx(Grid, { item: true, xs: true, children: _jsx(Link, { href: "/forgetPassword", variant: "body2", children: "Forgot password?" }) }), _jsx(Grid, { item: true, children: _jsx(Link, { href: "/register", variant: "body2", children: "Don't have an account? Sign Up" }) })] })] })] }), _jsx(Copyright, { sx: { mt: 8, mb: 4 } })] }));
}
