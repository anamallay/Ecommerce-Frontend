import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import jwtDecode from "jwt-decode";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { resetPassword } from "../../../reducer/actions/users/usersSlice";
import { useToaster } from "../../../contexts/ToasterProvider";
function ResetPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const { showHideToast } = useToaster();
    // const decode = token ? jwtDecode(token) : null;
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!token) {
            showHideToast("No reset token provided.", "error");
            return;
        }
        try {
            dispatch(resetPassword({ password, token }));
            showHideToast("Password reset successfully", "success");
            navigate("/login");
        }
        catch (error) {
            console.log(error);
        }
    };
    return (_jsx(Container, { maxWidth: "xs", sx: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
        }, children: _jsxs(Box, { component: "form", onSubmit: handleSubmit, sx: { mt: 1, width: "100%" }, children: [_jsx(Typography, { component: "h3", variant: "h6", textAlign: "center", mb: 3, children: "Reset Password" }), _jsx(TextField, { variant: "outlined", margin: "normal", required: true, fullWidth: true, id: "newPassword", label: "New Password", name: "password", type: "password", autoComplete: "new-password", autoFocus: true, value: password, onChange: handlePasswordChange }), _jsx(Button, { type: "submit", fullWidth: true, variant: "contained", sx: { mt: 3 }, children: "Reset Password" })] }) }));
}
export default ResetPassword;
