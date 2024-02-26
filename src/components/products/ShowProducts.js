import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProductByLimit } from "../../reducer/actions/products/productSlice";
import CircularColor from "../pages/Loading";
import { addToCart } from "../../reducer/actions/cart/cartSlice";
import { Box, Pagination, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const ShowProducts = () => {
    const { products, isLoading, error } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };
    // Pagination
    const [page, setPage] = useState(1);
    const limit = 4;
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        dispatch(fetchProductByLimit({ page, limit })).then((response) => {
            console.log("fetchUsers response:", response);
            const { pagination } = response.payload;
            if (pagination) {
                setTotalPages(pagination.totalPages);
            }
        });
    }, [dispatch, page, limit]);
    const handlePageChange = (_event, value) => {
        setPage(value);
    };
    if (isLoading)
        return _jsx(CircularColor, {});
    console.log("error", error);
    // if (error)
    //   return (
    //     <div
    //       style={{
    //         height: "100vh",
    //         display: "flex",
    //         justifyContent: "center",
    //         alignItems: "center",
    //       }}>
    //       <Typography
    //         sx={{
    //           height: "100vh",
    //           display: "flex",
    //           justifyContent: "center",
    //           alignItems: "center",
    //         }}
    //         variant="h4"
    //         color="error"
    //         gutterBottom>
    //         {error}
    //       </Typography>
    //     </div>
    //   );
    if (!products)
        return (_jsx("div", { style: {
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }, children: _jsx("p", { children: "No products found!" }) }));
    return (_jsx("div", { id: "showProducts", children: _jsxs(Box, { sx: { padding: { xs: "20px", sm: "40px", md: "80px" } }, children: [_jsx(Grid, { container: true, spacing: 2, justifyContent: "center", children: products.map((product) => (_jsx(Grid, { item: true, xs: 12, sm: 6, md: 4, lg: 3, children: _jsxs(Card, { sx: {
                                maxWidth: 345,
                                boxShadow: 3,
                                "&:hover": { boxShadow: 5 },
                                transition: "box-shadow 0.3s",
                            }, children: [_jsx(CardMedia, { sx: { height: 200, objectFit: "cover" }, image: product.image || "public/images/default.png", title: product.title }), _jsxs(CardContent, { children: [_jsx(Typography, { gutterBottom: true, variant: "h5", component: "div", children: product.title }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: product.description }), _jsxs(Typography, { variant: "body2", color: "text.primary", children: ["Price: $", product.price] }), _jsx(Typography, { variant: "body2", color: "text.primary", children: product.quantity - product.sold === 0
                                                ? "Out of Stock"
                                                : `In Stock: ${product.quantity - product.sold}` })] }), _jsxs(CardActions, { children: [_jsx(ShoppingCartIcon, { onClick: () => handleAddToCart(product), sx: {
                                                color: "primary.main",
                                                cursor: "pointer",
                                            } }), _jsx(Link, { to: `/showProducts/${product._id}`, children: _jsx(Button, { size: "small", sx: { color: "secondary.main" }, children: "Learn More" }) })] })] }) }, product._id))) }), _jsx(Stack, { spacing: 2, alignItems: "center", sx: { marginTop: "20px" }, children: _jsx(Pagination, { count: totalPages, page: page, variant: "outlined", shape: "rounded", color: "secondary", onChange: handlePageChange }) })] }) }));
};
export default ShowProducts;
