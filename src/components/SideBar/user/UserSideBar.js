import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
const UserSideBar = () => {
    const { userData, isLoggedIn } = useSelector((state) => state.users);
    return (_jsx("div", { style: { display: "flex", height: "80vh" }, children: _jsx("div", { children: _jsx(Box, { sx: {
                    width: "300px",
                    bgcolor: "primary.light",
                    padding: "10px",
                    marginTop: "50px",
                    borderRadius: "0px 10px 10px 0px",
                }, children: isLoggedIn && (_jsxs(Box, { sx: { p: 2 }, children: [_jsxs(Typography, { variant: "h6", component: "h2", sx: { mb: 2 }, children: [userData?.isAdmin ? "Admin" : "User", " Profile"] }), _jsxs(Typography, { variant: "body1", children: ["Name: ", userData?.first_name, " ", userData?.last_name] }), _jsxs(Typography, { variant: "body1", children: ["Email: ", userData?.email] }), _jsxs(Box, { sx: { display: "flex", flexDirection: "column", gap: 1 }, children: [_jsx(Button, { variant: "outlined", fullWidth: true, component: RouterLink, to: "/dashboard/user/myprofile", style: { textDecoration: "none" }, children: "My Profile" }), _jsx(Button, { variant: "outlined", fullWidth: true, component: RouterLink, to: "/dashboard/user/myorder", style: { textDecoration: "none" }, children: "My Order" })] })] })) }) }) }));
};
export default UserSideBar;
