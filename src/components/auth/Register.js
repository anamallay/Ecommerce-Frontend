import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../reducer/actions/users/usersSlice";
import { useToaster } from "../../contexts/ToasterProvider";
import CircularColor from "../pages/Loading";
import { useState } from "react";
const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: "1px",
    overflow: "hidden",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
});
export default function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.users);
    const { showHideToast } = useToaster();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        confirmPassword: "",
        image: null,
    });
    const handleInputChange = (event) => {
        if (event.target.type === "file") {
            const fileInput = event.target;
            if (fileInput.files && fileInput.files.length > 0) {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    [event.target.name]: fileInput.files[0],
                }));
            }
            else {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    [event.target.name]: null,
                }));
            }
        }
        else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [event.target.name]: event.target.value,
            }));
        }
    };
    console.log("formData reg", formData);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else {
            if (formData.password !== formData.confirmPassword) {
                console.error("Passwords do not match");
                return;
            }
            if (formData.password.length < 8) {
                console.error("Password must be at least 8 characters");
                return;
            }
            const formdata = new FormData();
            formdata.append("first_name", formData.first_name);
            formdata.append("last_name", formData.last_name);
            formdata.append("email", formData.email);
            formdata.append("phone", formData.phone);
            formdata.append("address", formData.address);
            formdata.append("password", formData.password);
            console.log("formData.image", formData.image);
            if (formData.image) {
                formdata.append("image", formData.image);
            }
            try {
                const response = await dispatch(createUser(formdata));
                if (response.type === "users/createUser/fulfilled") {
                    showHideToast(response.payload.message, "success");
                    navigate("/login");
                }
                else if (response.type === "users/createUser/rejected" &&
                    "error" in response) {
                    showHideToast(response.error.message || "An unknown error occurred", "warning");
                }
            }
            catch (error) {
                console.error("Failed to create user", error);
            }
            navigate("/login");
        }
        // setValidated(true);
    };
    if (isLoading)
        return _jsx(CircularColor, {});
    return (_jsxs(Container, { component: "main", maxWidth: "xs", children: [_jsx(CssBaseline, {}), _jsxs(Box, { sx: {
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }, children: [_jsx(Avatar, { sx: { m: 1, bgcolor: "secondary.main" }, children: _jsx(LockOutlinedIcon, {}) }), _jsx(Typography, { component: "h1", variant: "h5", children: "Sign Up" }), _jsxs(Box, { component: "form", onSubmit: handleSubmit, noValidate: true, sx: { mt: 1 }, children: [_jsx(TextField, { margin: "normal", required: true, fullWidth: true, id: "first_name", label: "first_name", name: "first_name", autoComplete: "given-name", autoFocus: true, value: formData.first_name, onChange: handleInputChange }), _jsx(TextField, { margin: "normal", required: true, fullWidth: true, id: "last_name", label: "last_name", name: "last_name", autoComplete: "family-name", value: formData.last_name, onChange: handleInputChange }), _jsx(TextField, { margin: "normal", required: true, fullWidth: true, id: "email", label: "Email Address", name: "email", autoComplete: "email", value: formData.email, onChange: handleInputChange }), _jsx(TextField, { margin: "normal", required: true, fullWidth: true, id: "phone", label: "Phone Number", name: "phone", autoComplete: "tel", value: formData.phone, onChange: handleInputChange }), _jsx(TextField, { margin: "normal", required: true, fullWidth: true, id: "address", label: "Address", name: "address", autoComplete: "street-address", value: formData.address, onChange: handleInputChange }), _jsx(TextField, { margin: "normal", required: true, fullWidth: true, name: "password", label: "Password", type: "password", id: "password", autoComplete: "new-password", value: formData.password, onChange: handleInputChange }), _jsx(TextField, { margin: "normal", required: true, fullWidth: true, name: "confirmPassword", label: "Confirm Password", type: "password", id: "confirmPassword", autoComplete: "new-password", value: formData.confirmPassword, onChange: handleInputChange }), _jsxs(Button, { component: "label", variant: "outlined", color: "primary", fullWidth: true, sx: { mt: 2, mb: 2 }, children: ["Upload Profile Image", _jsx(VisuallyHiddenInput, { accept: "image/*", type: "file", name: "image", onChange: handleInputChange })] }), _jsx(Button, { type: "submit", fullWidth: true, variant: "contained", sx: { mt: 3, mb: 2 }, children: "Sign Up" }), _jsx(Grid, { container: true, justifyContent: "flex-end", children: _jsx(Grid, { item: true, children: _jsx(Link, { href: "/login", variant: "body2", children: "Already have an account? Sign in" }) }) })] })] })] }));
}
