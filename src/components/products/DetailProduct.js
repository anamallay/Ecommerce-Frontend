import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Grid, Typography, Button, Card, CardContent, CardMedia } from "@mui/material";
import { findProductById } from "../../reducer/actions/products/productSlice";
import { addToCart } from "../../reducer/actions/cart/cartSlice";
const DetailProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //   const theme = useTheme();
    useEffect(() => {
        if (id) {
            dispatch(findProductById(id));
        }
    }, [id, dispatch]);
    const singleProduct = useSelector((state) => state.products.products.find((product) => product._id === id));
    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };
    return (_jsx(Container, { sx: { mt: 4 }, children: _jsx(Grid, { container: true, justifyContent: "center", spacing: 4, children: singleProduct && (_jsx(Grid, { item: true, xs: 12, md: 6, children: _jsxs(Card, { children: [_jsx(CardMedia, { component: "img", image: singleProduct.image || "public/images/default.png", alt: singleProduct.title, sx: { height: 300 } }), _jsxs(CardContent, { children: [_jsx(Typography, { gutterBottom: true, variant: "h5", component: "div", children: singleProduct.title }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: singleProduct.description }), _jsxs(Typography, { variant: "h6", sx: { mt: 2 }, children: ["Price: $", singleProduct.price] }), _jsxs(Typography, { variant: "body2", children: ["Quantity: ", singleProduct.quantity] }), _jsxs(Typography, { variant: "body2", children: ["Shipping: ", singleProduct.shipping] }), _jsxs(Typography, { variant: "body2", children: ["Sold: ", singleProduct.sold] }), _jsxs(Grid, { container: true, spacing: 2, sx: { mt: 2 }, children: [_jsx(Grid, { item: true, children: _jsx(Button, { size: "small", sx: { color: "secondary.main" }, onClick: () => navigate("/"), children: "Back" }) }), _jsx(Grid, { item: true, children: _jsx(Button, { variant: "contained", color: "primary", onClick: () => handleAddToCart(singleProduct), children: "Add" }) })] })] })] }) })) }) }));
};
export default DetailProduct;
