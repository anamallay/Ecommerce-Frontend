import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, fetchOrders, updateOrderStatus, } from "../../../reducer/actions/orders/ordersSlice";
import AdminSideBar from "./AdminSideBar";
import { Accordion, AccordionSummary, AccordionDetails, Box, Card, CardContent, Grid, List, ListItem, Typography, useMediaQuery, useTheme, FormControl, InputLabel, Select, MenuItem, Button, } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CircularColor from "../../pages/Loading";
import { useToaster } from "../../../contexts/ToasterProvider";
const AdminOrders = () => {
    const dispatch = useDispatch();
    const { orders, isLoading } = useSelector((state) => state.order);
    const { showHideToast } = useToaster();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);
    const handleStatusChange = (orderId, newStatus) => {
        dispatch(updateOrderStatus({ orderId: orderId.toString(), status: newStatus }))
            .then(() => {
            dispatch(fetchOrders())
                .then(() => {
                showHideToast("Order status updated successfully", "success");
            })
                .catch(() => {
                console.error("Failed to fetch orders after updating status");
                showHideToast("Failed to fetch orders after updating status", "error");
            });
        })
            .catch((error) => {
            console.error("Failed to update order status:", error);
            showHideToast("Failed to update order status", "error");
        });
    };
    const handleDeleteOrder = (orderId) => {
        dispatch(deleteOrder(orderId))
            .then(() => {
            dispatch(fetchOrders()).then(() => {
                showHideToast("Order deleted successfully", "success");
            });
        })
            .catch(() => {
            showHideToast("Failed to delete order", "error");
        });
    };
    if (isLoading)
        return _jsx(CircularColor, {});
    return (_jsxs(Box, { sx: { display: "flex", flexDirection: matches ? "row" : "column" }, children: [_jsx(AdminSideBar, {}), _jsx(Box, { sx: { flexGrow: 1, overflow: "auto", p: 3 }, children: _jsx(List, { children: Array.isArray(orders) &&
                        orders.map((order) => (_jsx(ListItem, { alignItems: "flex-start", children: _jsxs(Card, { sx: {
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%",
                                    "&:hover": {
                                        backgroundColor: "primary.light",
                                    },
                                }, children: [_jsx(CardContent, { children: _jsxs(Grid, { container: true, spacing: 2, children: [_jsxs(Grid, { item: true, xs: 12, sm: 6, children: [_jsxs(Typography, { gutterBottom: true, variant: "h6", component: "div", children: ["Order ID: ", order?._id] }), _jsxs(Typography, { variant: "body2", color: "text.secondary", children: ["Buyer Email:", " ", order?.buyer?.email] })] }), _jsx(Grid, { item: true, xs: 12, sm: 6, children: _jsxs(Accordion, { children: [_jsx(AccordionSummary, { expandIcon: _jsx(ArrowDownwardIcon, {}), "aria-controls": "panel1-content", id: "panel1-header", children: _jsx(Typography, { children: "Products" }) }), _jsx(AccordionDetails, { children: order.products.map((product) => (_jsxs(Grid, { container: true, children: [_jsx(Grid, { item: true, xs: 6, children: _jsxs(Typography, { variant: "body2", color: "text.secondary", children: ["Product: ", product._id] }) }), _jsx(Grid, { item: true, xs: 6, children: _jsxs(Typography, { variant: "body2", color: "text.secondary", children: ["Quantity: ", product.quantity] }) })] }, product._id))) })] }) }), _jsxs(Grid, { item: true, xs: 12, children: [_jsxs(Typography, { variant: "body2", color: "text.secondary", children: ["Payment amount: ", order?.payment?.amount] }), _jsxs(Typography, { variant: "body2", color: "text.secondary", children: ["Payment method: ", order?.payment?.method] })] })] }) }), _jsxs(Box, { sx: { display: "flex", justifyContent: "flex-end", p: 2 }, children: [_jsxs(FormControl, { variant: "outlined", size: "small", sx: { minWidth: 120 }, children: [_jsx(InputLabel, { children: "Status" }), _jsxs(Select, { value: order?.status, onChange: (e) => handleStatusChange(order._id, e.target.value), label: "Status", children: [_jsx(MenuItem, { value: "Not processed", children: "Not processed" }), _jsx(MenuItem, { value: "Processing", children: "Processing" }), _jsx(MenuItem, { value: "Shipped", children: "Shipped" }), _jsx(MenuItem, { value: "Delivered", children: "Delivered" }), _jsx(MenuItem, { value: "Cancelled", children: "Cancelled" })] })] }), _jsx(Button, { variant: "contained", color: "secondary", size: "small", sx: { marginLeft: "10px" }, onClick: () => handleDeleteOrder(order._id), children: "Delete" })] })] }) }, order?._id))) }) })] }));
};
export default AdminOrders;
