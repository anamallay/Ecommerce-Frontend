import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Box, } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeFromCart, } from "../../reducer/actions/cart/cartSlice";
import Payment from "./Payment";
const Cart = () => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);
    const { isLoggedIn } = useSelector((state) => state.users);
    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart(id));
    };
    const handleClearCart = () => {
        dispatch(clearCart());
    };
    const calculateTotal = () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return (_jsxs(Container, { sx: { mt: 4 }, children: [_jsx(Typography, { variant: "h4", gutterBottom: true, children: "Your Cart" }), _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Image" }), _jsx(TableCell, { children: "Product" }), _jsx(TableCell, { children: "Price" }), _jsx(TableCell, { children: "Quantity" }), _jsx(TableCell, { children: "Actions" })] }) }), _jsx(TableBody, { children: cartItems.map((item) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsx("img", { src: item.image || "public/images/default.png", alt: item.title, style: { width: "50px", height: "50px" } }) }), _jsx(TableCell, { children: item.title }), _jsxs(TableCell, { children: ["$", item.price] }), _jsx(TableCell, { children: item.quantity }), _jsx(TableCell, { children: _jsx(Button, { variant: "contained", color: "secondary", startIcon: _jsx(DeleteIcon, {}), onClick: () => handleRemoveFromCart(item._id), children: "Delete" }) })] }, item.id))) })] }), cartItems.length > 0 && (_jsxs(Box, { children: [_jsxs(Box, { sx: {
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "10px",
                        }, children: [_jsx(Button, { variant: "outlined", color: "secondary", onClick: handleClearCart, children: "Clear Cart" }), _jsx(Box, { sx: { flexGrow: 1 } }), " ", _jsxs(Typography, { variant: "h5", children: ["Total: $", calculateTotal().toFixed(2)] })] }), _jsx(Box, { sx: {
                            display: "flex",
                            justifyContent: "flex-end",
                        }, children: isLoggedIn ? (_jsx(Payment, { cartItems: cartItems, amount: parseFloat(calculateTotal().toFixed(2)) })) : (_jsx(Typography, { variant: "h4", align: "center", 
                            // color="#3D0071"
                            gutterBottom: true, children: "Please Login First" })) })] }))] }));
};
export default Cart;
