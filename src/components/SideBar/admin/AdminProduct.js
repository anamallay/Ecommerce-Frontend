import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct, fetchProducts, updateProduct, createProduct, } from "../../../reducer/actions/products/productSlice";
import { fetchCategories } from "../../../reducer/actions/categories/categorySlice";
import { Box, Card, CardContent, CardMedia, Typography, List, ListItem, Button, Stack, TextField, Container, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, useTheme, useMediaQuery, } from "@mui/material";
import AddBoxTwoToneIcon from "@mui/icons-material/AddBoxTwoTone";
import { FormControl, InputLabel, Select, MenuItem, Chip } from "@mui/material";
import "../../../css/index.css";
import AdminSideBar from "./AdminSideBar";
import CircularColor from "../../pages/Loading";
import { useToaster } from "../../../contexts/ToasterProvider";
const AdminProduct = () => {
    const { products, isLoading } = useSelector((state) => state.products);
    const { categories } = useSelector((state) => state.categories);
    const { showHideToast } = useToaster();
    const dispatch = useDispatch();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    // Edit a Product
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [editableProduct, setEditableProduct] = useState({
        _id: "",
        slug: "",
        title: "",
        image: null,
        description: "",
        category: [],
        quantity: 0,
        sold: 0,
        shipping: 0,
        price: 0,
    });
    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories());
    }, [dispatch]);
    const handleOpenModalEdit = (productId) => {
        const product = products.find((product) => product._id === productId);
        if (!product) {
            console.error("Product not found");
            return;
        }
        const updatedProduct = {
            ...product,
            category: product.category.map((cat) => cat._id || cat),
        };
        setEditableProduct(updatedProduct);
        setOpenModalEdit(true);
    };
    const handleCloseModalEdit = () => {
        setOpenModalEdit(false);
    };
    // const handleEditChange = (
    //   event: React.ChangeEvent<{ name?: string; value: unknown }>
    // ) => {
    //   const { name, value } = event.target;
    //   if (name === "category") {
    //     setEditableProduct((prevState) => ({
    //       ...prevState,
    //       [name]: value,
    //     }));
    //   } else if (name === "image" && event.target.files) {
    //     const file = event.target.files[0];
    //     setEditableProduct((prevState) => ({
    //       ...prevState,
    //       image: file,
    //     }));
    //   } else {
    //     setEditableProduct((prevState) => ({
    //       ...prevState,
    //       [name]: value,
    //     }));
    //   }
    // };
    const handleEditChange = (event) => {
        const { name, value } = event.target;
        if (name === "category") {
            setEditableProduct((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
        else if (name === "image" && event.target.files) {
            const file = event.target.files[0];
            setEditableProduct((prevState) => ({
                ...prevState,
                image: file,
            }));
        }
        else {
            setEditableProduct((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };
    const handleSaveEdit = async () => {
        const slug = editableProduct.slug;
        const formData = new FormData();
        formData.append("title", editableProduct.title);
        formData.append("description", editableProduct.description);
        formData.append("quantity", String(editableProduct.quantity));
        formData.append("price", String(editableProduct.price));
        formData.append("shipping", String(editableProduct.shipping));
        formData.append("sold", String(editableProduct.sold));
        if (Array.isArray(editableProduct.category)) {
            editableProduct.category.forEach((catId) => {
                formData.append("category", String(catId));
            });
        }
        if (editableProduct.image) {
            formData.append("image", editableProduct.image);
        }
        await dispatch(updateProduct({ slug: slug, productsData: formData }));
        setOpenModalEdit(false);
        dispatch(fetchProducts());
        showHideToast("Product updated successfully!", "success");
    };
    // Delete a product
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteProductSlug, setDeleteProductSlug] = useState(null);
    const handleOpenDeleteDialog = (productSlug) => {
        setDeleteProductSlug(productSlug);
        setOpenDelete(true);
    };
    const handleCloseDelete = () => {
        setOpenDelete(false);
    };
    const handleDeleteConfirm = async () => {
        if (deleteProductSlug) {
            await dispatch(deleteProduct(deleteProductSlug));
            setOpenDelete(false);
            dispatch(fetchProducts());
            showHideToast("Product deleted successfully!", "success");
        }
    };
    // Create a new product
    const initialProductState = {
        _id: "",
        slug: "",
        title: "",
        image: null,
        description: "",
        category: [],
        quantity: 0,
        sold: 0,
        shipping: 0,
        price: 0,
    };
    const [openEditCreate, setOpenCreate] = useState(false);
    const [createNewProduct, setCreateNewProduct] = useState({
        _id: "",
        slug: "",
        title: "",
        image: null,
        description: "",
        category: [],
        quantity: 0,
        sold: 0,
        shipping: 0,
        price: 0,
    });
    function handleCloseCreate() {
        setOpenCreate(false);
    }
    function handleOpenCreate() {
        setOpenCreate(true);
    }
    const handleCreateChange = (event) => {
        const { name, value } = event.target;
        if (name === "category") {
            setCreateNewProduct((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
        else if (name === "image" && event.target.files) {
            const file = event.target.files[0];
            setCreateNewProduct((prevState) => ({
                ...prevState,
                image: file,
            }));
        }
        else {
            setCreateNewProduct((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };
    // Corrected handleSaveCreate function
    const handleSaveCreate = async () => {
        const formData = new FormData();
        // Append all necessary fields to formData
        formData.append("title", createNewProduct.title);
        formData.append("description", createNewProduct.description);
        formData.append("quantity", String(createNewProduct.quantity));
        formData.append("price", String(createNewProduct.price));
        formData.append("shipping", String(createNewProduct.shipping));
        formData.append("sold", String(createNewProduct.sold));
        createNewProduct.category.forEach((catId) => {
            formData.append("category", String(catId));
        });
        if (createNewProduct.image) {
            formData.append("image", createNewProduct.image);
        }
        // Dispatch the createProduct action with formData
        await dispatch(createProduct(formData));
        handleCloseCreate();
        dispatch(fetchProducts());
        showHideToast("Product created successfully!", "success");
        setCreateNewProduct(initialProductState);
    };
    if (isLoading)
        return _jsx(CircularColor, {});
    // if (error)
    //   return (
    //     <Box sx={{ display: "flex" }}>
    //       <Box sx={{ flexBasis: "300px" }}>
    //         <AdminSideBar />
    //       </Box>
    //       <Box sx={{ flexGrow: 1, overflow: "auto" }}>
    //         <p>
    //           <Typography
    //             sx={{
    //               height: "100vh",
    //               display: "flex",
    //               justifyContent: "center",
    //               alignItems: "center",
    //             }}
    //             variant="h4"
    //             color="error"
    //             gutterBottom>
    //             {error}
    //           </Typography>
    //         </p>
    //       </Box>
    //     </Box>
    //   );
    if (!products)
        return (_jsxs(Box, { sx: { display: "flex" }, children: [_jsx(Box, { sx: { flexBasis: "300px" }, children: _jsx(AdminSideBar, {}) }), _jsx(Box, { sx: { flexGrow: 1, overflow: "auto" }, children: _jsx("p", { children: _jsx(Typography, { sx: {
                                height: "100vh",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }, variant: "h4", color: "error", gutterBottom: true, children: "No products found!" }) }) })] }));
    return (_jsxs(Box, { sx: { display: "flex", flexDirection: matches ? "row" : "column" }, children: [_jsx(AdminSideBar, {}), _jsxs(Box, { sx: { flexGrow: 1, overflow: "auto", p: 3 }, children: [_jsxs("div", { style: {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }, children: [_jsx(Typography, { variant: "h4", gutterBottom: true, children: "Product List" }), _jsx(AddBoxTwoToneIcon, { color: "primary", style: {
                                    marginRight: "16px",
                                    fontSize: "40px",
                                    cursor: "pointer",
                                }, onClick: () => handleOpenCreate() })] }), _jsx(List, { children: products.map((product) => (_jsx(ListItem, { alignItems: "flex-start", children: _jsxs(Card, { sx: {
                                    display: "flex",
                                    width: "100%",
                                    "&:hover": {
                                        backgroundColor: "primary.light",
                                    },
                                }, children: [_jsx(CardMedia, { sx: { width: 160 }, image: product.image || "public/images/default.png", title: product.title }), _jsxs(Box, { sx: {
                                            display: "flex",
                                            flexDirection: "column",
                                            flexGrow: 1,
                                        }, children: [_jsxs(CardContent, { sx: { flex: "1 0 auto" }, children: [_jsx(Typography, { gutterBottom: true, variant: "h5", component: "div", children: product.title }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: product.description }), _jsxs(Typography, { variant: "body2", color: "text.primary", children: ["Price: $", product.price] })] }), _jsxs(Stack, { direction: "row", spacing: 1, justifyContent: "flex-end", p: 2, children: [_jsx(Button, { size: "small", variant: "contained", color: "primary", onClick: () => handleOpenModalEdit(product._id), children: "Edit" }), _jsx(Button, { size: "small", variant: "contained", color: "secondary", onClick: () => handleOpenDeleteDialog(product.slug), children: "Delete" })] })] })] }) }, product._id))) }), _jsxs(Dialog, { open: openModalEdit, onClose: handleCloseModalEdit, fullWidth: true, maxWidth: "md", children: [_jsx(DialogTitle, { children: "Edit Product" }), _jsx(DialogContent, { children: _jsxs(Container, { children: [_jsx(TextField, { fullWidth: true, margin: "normal", label: "Title", name: "title", value: editableProduct?.title || "", onChange: handleEditChange }), _jsx(TextField, { fullWidth: true, margin: "normal", label: "Description", name: "description", multiline: true, minRows: 3, value: editableProduct?.description || "", onChange: handleEditChange }), _jsxs(Button, { variant: "contained", component: "label", fullWidth: true, children: ["Upload Image", _jsx("input", { hidden: true, accept: "image/*", type: "file", name: "image", onChange: handleEditChange })] }), _jsx(TextField, { fullWidth: true, margin: "normal", label: "Price", name: "price", type: "number", value: editableProduct?.price || "", onChange: handleEditChange }), _jsx(TextField, { fullWidth: true, margin: "normal", label: "Quantity", name: "quantity", type: "number", value: editableProduct?.quantity || "", onChange: handleEditChange }), _jsx(TextField, { fullWidth: true, margin: "normal", label: "Shipping", name: "shipping", type: "number", value: editableProduct?.shipping, onChange: handleEditChange, helperText: "Enter a shipping option as a number." }), _jsxs(FormControl, { fullWidth: true, margin: "normal", children: [_jsx(InputLabel, { children: "Categories" }), _jsx(Select, { multiple: true, value: editableProduct.category || [], onChange: handleEditChange, inputProps: {
                                                        name: "category",
                                                    }, renderValue: (selected) => (_jsx(Box, { sx: { display: "flex", flexWrap: "wrap", gap: 0.5 }, children: selected.map((categoryId) => {
                                                            const category = categories.find((c) => c._id === categoryId);
                                                            return (_jsx(Chip, { label: category ? category.title : categoryId, sx: { bgcolor: "secondary.main", color: "white" } }, categoryId));
                                                        }) })), MenuProps: {
                                                        PaperProps: {
                                                            style: {
                                                                maxHeight: 300,
                                                                overflow: "auto",
                                                            },
                                                        },
                                                    }, sx: {
                                                        ".Mui-selected": {
                                                            backgroundColor: "primary.main",
                                                            color: "white",
                                                            "&:hover": {
                                                                backgroundColor: "primary.dark",
                                                            },
                                                        },
                                                    }, children: categories.map((category) => (_jsx(MenuItem, { value: category._id, children: category.title }, category._id))) })] }), _jsx(TextField, { fullWidth: true, margin: "normal", label: "Sold", name: "sold", type: "number", value: editableProduct?.sold || "", onChange: handleEditChange }), _jsxs(Stack, { direction: "row", spacing: 2, justifyContent: "flex-end", marginTop: 2, children: [_jsx(Button, { variant: "outlined", color: "error", onClick: handleCloseModalEdit, children: "Cancel" }), _jsx(Button, { variant: "contained", color: "primary", onClick: handleSaveEdit, children: "Save" })] })] }) })] }), _jsxs(Dialog, { open: openDelete, onClose: handleCloseDelete, "aria-labelledby": "delete-dialog-title", "aria-describedby": "delete-dialog-description", children: [_jsx(DialogTitle, { id: "delete-dialog-title", children: "Confirm Delete" }), _jsx(DialogContent, { children: _jsx(DialogContentText, { id: "delete-dialog-description", children: "Are you sure you want to delete this product? This action cannot be undone." }) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: handleCloseDelete, children: "Cancel" }), _jsx(Button, { onClick: handleDeleteConfirm, autoFocus: true, children: "Confirm Delete" })] })] }), _jsxs(Dialog, { open: openEditCreate, onClose: handleCloseCreate, fullWidth: true, maxWidth: "md", children: [_jsx(DialogTitle, { children: "Create Product" }), _jsx(DialogContent, { children: _jsxs(Container, { children: [_jsx(TextField, { fullWidth: true, margin: "normal", label: "Title", name: "title", value: createNewProduct?.title || "", onChange: handleCreateChange }), _jsx(TextField, { fullWidth: true, margin: "normal", label: "Description", name: "description", multiline: true, minRows: 3, value: createNewProduct?.description || "", onChange: handleCreateChange }), _jsxs(Button, { variant: "contained", component: "label", fullWidth: true, children: ["Upload Image", _jsx("input", { hidden: true, accept: "image/*", type: "file", name: "image", onChange: handleCreateChange })] }), _jsx(TextField, { fullWidth: true, margin: "normal", label: "Price", name: "price", type: "number", value: createNewProduct?.price || "", onChange: handleCreateChange }), _jsx(TextField, { fullWidth: true, margin: "normal", label: "Quantity", name: "quantity", type: "number", value: createNewProduct?.quantity || "", onChange: handleCreateChange }), _jsx(TextField, { fullWidth: true, margin: "normal", label: "Shipping", name: "shipping", type: "number", value: createNewProduct?.shipping, onChange: handleCreateChange, helperText: "Enter a shipping option as a number." }), _jsxs(FormControl, { fullWidth: true, margin: "normal", children: [_jsx(InputLabel, { children: "Categories" }), _jsx(Select, { multiple: true, value: createNewProduct.category || [], onChange: handleCreateChange, inputProps: {
                                                        name: "category",
                                                    }, renderValue: (selected) => (_jsx(Box, { sx: { display: "flex", flexWrap: "wrap", gap: 0.5 }, children: selected.map((categoryId) => {
                                                            const category = categories.find((c) => c._id === categoryId);
                                                            return (_jsx(Chip, { label: category ? category.title : categoryId, sx: { bgcolor: "secondary.main", color: "white" } }, categoryId));
                                                        }) })), MenuProps: {
                                                        PaperProps: {
                                                            style: {
                                                                maxHeight: 300,
                                                                overflow: "auto",
                                                            },
                                                        },
                                                    }, sx: {
                                                        ".Mui-selected": {
                                                            backgroundColor: "primary.main",
                                                            color: "white",
                                                            "&:hover": {
                                                                backgroundColor: "primary.dark",
                                                            },
                                                        },
                                                    }, children: categories.map((category) => (_jsx(MenuItem, { value: category._id, children: category.title }, category._id))) })] }), _jsx(TextField, { fullWidth: true, margin: "normal", label: "Sold", name: "sold", type: "number", value: createNewProduct?.sold || "", onChange: handleCreateChange }), _jsxs(Stack, { direction: "row", spacing: 2, justifyContent: "flex-end", marginTop: 2, children: [_jsx(Button, { variant: "outlined", color: "error", onClick: handleCloseCreate, children: "Cancel" }), _jsx(Button, { variant: "contained", color: "primary", onClick: handleSaveCreate, children: "Save" })] })] }) })] })] })] }));
};
export default AdminProduct;
