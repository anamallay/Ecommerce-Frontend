import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ShopIcon from "@mui/icons-material/Shop";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, logoutUser } from "../../reducer/actions/users/usersSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useToaster } from "../../contexts/ToasterProvider";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Home from "./Home";
import Contact from "./Contact";
import AboutUs from "./AboutUs";
import { Link as ScrollLink, scroller } from "react-scroll";
import { Element } from "react-scroll";
import ShowProducts from "../products/ShowProducts";
const pages = ["Home", "Products", "Contact", "About Us"];
export default function Header() {
    const { userData, isLoggedIn } = useSelector((state) => state.users);
    const { cartItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { showHideToast } = useToaster();
    console.log("location", location.pathname == "/");
    const handleNavigateAndScroll = (page) => {
        if (location.pathname !== "/") {
            navigate("/", { replace: true });
        }
        else {
            scrollToSection(page);
        }
    };
    const scrollToSection = (page) => {
        const scrollId = page.toLowerCase().replace(/\s+/g, "");
        setTimeout(() => {
            scroller.scrollTo(scrollId, {
                duration: 800,
                delay: 0,
                smooth: "easeInOutQuart",
            });
        }, 100);
    };
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);
    const handleLogout = async () => {
        try {
            const resultAction = await dispatch(logoutUser());
            const user = unwrapResult(resultAction);
            navigate("/");
            showHideToast(user.message, "success");
        }
        catch (error) {
            if (error instanceof Error) {
                showHideToast(error.message, "warning");
            }
            else {
                showHideToast("An unexpected error occurred.", "warning");
            }
        }
    };
    return (_jsxs("div", { children: [_jsx(Box, { sx: { flexGrow: 1 }, children: _jsx(AppBar, { position: "fixed", sx: { backgroundColor: "white", color: "black" }, children: _jsxs(Toolbar, { children: [_jsx(IconButton, { size: "large", edge: "start", color: "inherit", "aria-label": "menu", sx: { mr: 2 }, children: _jsx("img", { src: "../../public/images/icon.png", alt: "menu", style: { width: 32, height: 32 } }) }), pages.map((page) => (_jsx(Link, { to: page.toLowerCase().replace(/\s+/g, ""), children: _jsx(ScrollLink, { activeClass: "active", to: page.toLowerCase().replace(/\s+/g, ""), spy: true, smooth: true, offset: -70, duration: 500, style: {
                                        textDecoration: "none",
                                        color: "inherit",
                                        marginRight: 4,
                                    }, children: _jsx(Button, { onClick: () => handleNavigateAndScroll(page), sx: { color: "black", marginRight: 4 }, children: page }, page) }, page) }))), _jsx(Box, { sx: { flexGrow: 1 } }), !isLoggedIn ? (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/cart", style: {
                                            textDecoration: "none",
                                            color: "inherit",
                                            marginRight: "10px",
                                        }, children: _jsx(Badge, { badgeContent: cartItems.length, color: "secondary", children: _jsx(ShopIcon, { sx: { color: "primary.main", fontSize: "30px" } }) }) }), _jsx(Link, { to: "/login", style: { textDecoration: "none" }, children: _jsx(Button, { style: { marginLeft: "10px" }, color: "secondary", variant: "contained", children: "Login" }) }), _jsx(Link, { to: "/register", style: { textDecoration: "none" }, children: _jsx(Button, { style: { marginLeft: "10px" }, color: "primary", variant: "contained", children: "Register" }) })] })) : (_jsxs(Box, { sx: { display: "flex", alignItems: "center" }, children: [_jsx(Link, { to: "/cart", style: {
                                            textDecoration: "none",
                                            color: "inherit",
                                            marginRight: "10px",
                                        }, children: _jsx(Badge, { badgeContent: cartItems.length, color: "secondary", children: _jsx(ShopIcon, { sx: { color: "primary.main", fontSize: "30px" } }) }) }), _jsx(Link, { to: userData?.isAdmin ? "/dashboard/admin" : "/dashboard/user", children: _jsx(Avatar, { src: userData?.image }) }), _jsx(Button, { style: { marginLeft: "10px" }, color: "secondary", variant: "contained", onClick: handleLogout, children: "Logout" })] }))] }) }) }), location.pathname === "/" && (_jsxs("div", { className: "element", style: { marginTop: "10vh" }, children: [_jsx(Element, { name: "home", children: _jsx(Home, {}) }), _jsx(Element, { name: "products", children: _jsx(ShowProducts, {}) }), _jsx(Element, { name: "contact", children: _jsx(Contact, {}) }), _jsx(Element, { name: "aboutus", children: _jsx(AboutUs, {}) })] }))] }));
}
