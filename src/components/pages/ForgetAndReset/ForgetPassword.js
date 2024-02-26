import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import { forgetPassword } from "../../redux/slices/users/usersSlice";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { forgetPassword } from "../../../reducer/actions/users/usersSlice";
import { useToaster } from "../../../contexts/ToasterProvider";
function ForgetPassword() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const { showHideToast } = useToaster();
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            dispatch(forgetPassword(email));
            showHideToast("please check your email to reset your password", "info");
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
        }, children: _jsxs(Box, { component: "form", onSubmit: handleSubmit, sx: { mt: 1, width: "100%" }, children: [_jsx(Typography, { component: "h1", variant: "h5", textAlign: "center", mb: 4, children: "Reset Password" }), _jsx(TextField, { variant: "outlined", margin: "normal", required: true, fullWidth: true, id: "email", label: "Email Address", name: "email", autoComplete: "email", autoFocus: true, value: email, onChange: handleEmailChange, sx: {
                        borderColor: "#230034",
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#230034" },
                        },
                    } }), _jsx(Button, { type: "submit", fullWidth: true, variant: "contained", sx: {
                        mt: 3,
                        mb: 2,
                    }, children: "Send" })] }) }));
}
export default ForgetPassword;
