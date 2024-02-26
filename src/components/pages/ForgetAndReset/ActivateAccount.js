import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Button, Container, Typography } from "@mui/material";
import { useToaster } from "../../../contexts/ToasterProvider";
import { baseURl } from "../../../reducer/actions/baseURl";
const ActivateAccount = () => {
    const navigate = useNavigate();
    const params = useParams();
    const token = params.token;
    if (!token) {
        console.error("Token is missing");
        return _jsx("div", { children: "Token is missing" });
    }
    const decoded = jwtDecode(token);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { showHideToast } = useToaster();
    // todo: mode this to redux action slice
    const handleActivation = () => {
        axios
            .post(`${baseURl}/api/users/activate-account/${token}`)
            .then(() => {
            navigate("/login", { state: { fromActivation: true } });
            showHideToast("Your account has been activated successfully. You can now log in.", "success");
        })
            .catch((error) => {
            console.error("Error activating account:", error.response.data);
        });
    };
    return (_jsxs(Container, { maxWidth: "sm", style: {
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }, children: [_jsxs(Typography, { variant: "h4", gutterBottom: true, children: ["Hello ", decoded.first_name, " Activate Account"] }), _jsx(Button, { variant: "contained", color: "primary", onClick: handleActivation, sx: { backgroundColor: "primary" }, children: "Activate My Account" })] }));
};
export default ActivateAccount;
