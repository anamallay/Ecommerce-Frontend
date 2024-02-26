import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, Grid, List, ListItem, Typography, useMediaQuery, useTheme, } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CircularColor from "../../pages/Loading";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersByUser, } from "../../../reducer/actions/orders/ordersSlice";
import UserSideBar from "./UserSideBar";
const MyOrder = () => {
    const dispatch = useDispatch();
    const { orders, isLoading, error } = useSelector((state) => state.order);
    const { userData } = useSelector((state) => state.users);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    useEffect(() => {
        dispatch(fetchOrdersByUser(userData._id));
    }, [dispatch]);
    console.log("orders::", orders);
    if (isLoading)
        return _jsx(CircularColor, {});
    return (_jsxs(Box, { sx: { display: "flex", flexDirection: matches ? "row" : "column" }, children: [_jsx(UserSideBar, {}), _jsx(Box, { sx: { flexGrow: 1, overflow: "auto", p: 3 }, children: _jsx(List, { children: orders && orders.map((order) => (_jsx(ListItem, { alignItems: "flex-start", children: _jsxs(Card, { sx: {
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                "&:hover": {
                                    backgroundColor: "primary.light",
                                },
                            }, children: [_jsx(CardContent, { children: _jsxs(Grid, { container: true, spacing: 2, children: [_jsxs(Grid, { item: true, xs: 12, sm: 6, children: [_jsxs(Typography, { gutterBottom: true, variant: "h6", component: "div", children: ["Order ID: ", order._id] }), _jsxs(Typography, { variant: "body2", color: "text.secondary", children: ["Buyer Name:", " ", order.buyer.first_name + " " + order.buyer.last_name] })] }), _jsx(Grid, { item: true, xs: 12, sm: 6, children: _jsxs(Accordion, { children: [_jsx(AccordionSummary, { expandIcon: _jsx(ArrowDownwardIcon, {}), "aria-controls": "panel1-content", id: "panel1-header", children: _jsx(Typography, { children: "Products" }) }), _jsx(AccordionDetails, { children: order.products.map((product) => (_jsxs(Grid, { container: true, children: [_jsx(Grid, { item: true, xs: 6, children: _jsxs(Typography, { variant: "body2", color: "text.secondary", children: ["Product: ", product._id] }) }), _jsx(Grid, { item: true, xs: 6, children: _jsxs(Typography, { variant: "body2", color: "text.secondary", children: ["Quantity: ", product.quantity] }) })] }, product._id))) })] }) }), _jsxs(Grid, { item: true, xs: 12, children: [_jsxs(Typography, { variant: "body2", color: "text.secondary", children: ["Payment amount: ", order.payment.amount] }), _jsxs(Typography, { variant: "body2", color: "text.secondary", children: ["Payment method: ", order.payment.method] })] })] }) }), _jsx(Box, { sx: { display: "flex", justifyContent: "flex-end", p: 2 }, children: _jsx(Button, { size: "small", color: "secondary", children: order.status }) })] }) }, order._id))) }) })] }));
};
export default MyOrder;
