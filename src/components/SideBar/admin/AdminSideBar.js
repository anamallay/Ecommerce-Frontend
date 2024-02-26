import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from "react";
import { useSelector } from "react-redux";
import { Button, Box, Typography, Drawer, IconButton, useTheme, useMediaQuery, } from "@mui/material";
import AdminPanelSettingsTwoToneIcon from "@mui/icons-material/AdminPanelSettingsTwoTone";
import { Link as RouterLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
const AdminSideBar = () => {
    const { userData, isLoggedIn } = useSelector((state) => state.users);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const drawerWidth = Math.min(300, window.innerWidth - theme.spacing(4));
    const drawerContent = (_jsx(Box, { sx: {
            width: drawerWidth, // Responsive width
            height: "100vh",
            // width: "300px",
            bgcolor: "primary.light",
            padding: "10px",
            borderRadius: "0px 10px 10px 0px",
        }, children: isLoggedIn && (_jsxs(Box, { sx: { p: 2 }, children: [_jsxs(Typography, { variant: "h4", component: "h2", sx: { mb: 2, fontSize: { xs: "1.5rem", sm: "2rem" } }, children: [_jsx(AdminPanelSettingsTwoToneIcon, { color: "primary", sx: { fontSize: { xs: "30px", sm: "40px" } } }), userData?.isAdmin ? "Admin" : "User", " Profile"] }), _jsxs(Typography, { variant: "body1", children: ["Name: ", userData?.first_name, " ", userData?.last_name] }), _jsxs(Typography, { variant: "body1", children: ["Email: ", userData?.email] }), _jsxs(Box, { sx: { display: "flex", flexDirection: "column", gap: 1 }, children: [_jsx(Button, { component: RouterLink, to: "/dashboard/admin/products", variant: "outlined", fullWidth: true, children: "Products" }), _jsx(Button, { component: RouterLink, to: "/dashboard/admin/category", variant: "outlined", fullWidth: true, children: "Category" }), _jsx(Button, { component: RouterLink, to: "/dashboard/admin/userlist", variant: "outlined", fullWidth: true, children: "User List" }), _jsx(Button, { component: RouterLink, to: "/dashboard/admin/orders", variant: "outlined", fullWidth: true, children: "All the Orders" })] })] })) }));
    return (_jsx("div", { children: isMobile ? (_jsxs(_Fragment, { children: [_jsx(IconButton, { color: "secondary", "aria-label": "open drawer", edge: "start", onClick: handleDrawerToggle, sx: { mr: 2, display: { sm: "none" } }, children: _jsx(MenuIcon, {}) }), _jsx(Drawer, { variant: "temporary", open: mobileOpen, onClose: handleDrawerToggle, ModalProps: {
                        keepMounted: true,
                    }, sx: {
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                            // width: "80vh",
                        },
                    }, children: drawerContent })] })) : (_jsx(Box, { sx: {
                display: "flex",
                width: drawerWidth,
            }, children: _jsx(Box, { sx: {
                    width: "300px",
                    marginTop: "30px",
                    bgcolor: "primary.light",
                    padding: "10px",
                    borderRadius: "0px 10px 10px 0px",
                }, children: isLoggedIn && (_jsxs(Box, { sx: { p: 2 }, children: [_jsxs(Typography, { variant: "h4", component: "h2", sx: { mb: 2, fontSize: { xs: "1.5rem", sm: "2rem" } }, children: [_jsx(AdminPanelSettingsTwoToneIcon, { color: "primary", sx: { fontSize: { xs: "30px", sm: "40px" } } }), userData?.isAdmin ? "Admin" : "User", " Profile"] }), _jsxs(Typography, { variant: "body1", children: ["Name: ", userData?.first_name, " ", userData?.last_name] }), _jsxs(Typography, { variant: "body1", children: ["Email: ", userData?.email] }), _jsxs(Box, { sx: { display: "flex", flexDirection: "column", gap: 1 }, children: [_jsx(Button, { component: RouterLink, to: "/dashboard/admin/products", variant: "outlined", fullWidth: true, children: "Products" }), _jsx(Button, { component: RouterLink, to: "/dashboard/admin/category", variant: "outlined", fullWidth: true, children: "Category" }), _jsx(Button, { component: RouterLink, to: "/dashboard/admin/userlist", variant: "outlined", fullWidth: true, children: "User List" }), _jsx(Button, { component: RouterLink, to: "/dashboard/admin/orders", variant: "outlined", fullWidth: true, children: "All the Orders" })] })] })) }) })) }));
};
export default AdminSideBar;
