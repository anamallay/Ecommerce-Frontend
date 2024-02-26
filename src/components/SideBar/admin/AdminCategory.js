import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Button, Card, CardContent, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, Stack, TextField, Typography, } from "@mui/material";
import { useEffect, useState } from "react";
import AdminSideBar from "./AdminSideBar";
import AddBoxTwoToneIcon from "@mui/icons-material/AddBoxTwoTone";
import { useDispatch, useSelector } from "react-redux";
import CircularColor from "../../pages/Loading";
import { useToaster } from "../../../contexts/ToasterProvider";
import { createCategories, deleteCategories, fetchCategories, updateCategories, } from "../../../reducer/actions/categories/categorySlice";
const AdminCategory = () => {
    const { categories, isLoading, error } = useSelector((state) => state.categories);
    const { showHideToast } = useToaster();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);
    // Delete
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteCategorySlug, setDeleteCategorySlug] = useState(null);
    const handleOpenDelete = (productSlug) => {
        setDeleteCategorySlug(productSlug);
        setOpenDelete(true);
    };
    const handleCloseDelete = () => {
        setOpenDelete(false);
    };
    const handleDeleteConfirm = async () => {
        if (deleteCategorySlug) {
            await dispatch(deleteCategories(deleteCategorySlug));
            setOpenDelete(false);
            dispatch(fetchCategories());
            showHideToast("Product deleted successfully!", "success");
        }
    };
    // Edit
    const [openEdit, setOpenEdit] = useState(false);
    const [editableCategory, setEditableCategory] = useState({
        title: "",
    });
    const handleOpenEdit = (categorySlug) => {
        const categoryToEdit = categories.find((category) => category._id.toString() === categorySlug);
        if (categoryToEdit) {
            setEditableCategory({
                title: categoryToEdit.title,
                id: categoryToEdit._id,
            });
        }
        setOpenEdit(true);
    };
    const handleCloseEdit = () => {
        setOpenEdit(false);
    };
    const handleEditChange = (event) => {
        const { name, value } = event.target;
        setEditableCategory((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleSaveEdit = async () => {
        if (editableCategory.id) {
            await dispatch(updateCategories({
                id: editableCategory.id.toString(),
                categoryData: { title: editableCategory.title },
            }));
            dispatch(fetchCategories());
            setOpenEdit(false);
            showHideToast("Category updated successfully!", "success");
        }
        else {
            showHideToast("Error finding category ID", "error");
        }
    };
    // Create
    const [openCreate, setOpenCreate] = useState(false);
    const [createCategory, setCreateCategory] = useState({
        title: "",
    });
    const handleOpenCreate = () => {
        setOpenCreate(true);
    };
    const handleCloseCreate = () => {
        setOpenCreate(false);
    };
    const handleCreateChange = (event) => {
        const { name, value } = event.target;
        setCreateCategory((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleSaveCreate = async () => {
        await dispatch(createCategories({ title: createCategory.title }));
        dispatch(fetchCategories());
        setOpenCreate(false);
        showHideToast("Category Created successfully!", "success");
    };
    if (isLoading)
        return _jsx(CircularColor, {});
    console.log("error", error);
    if (error)
        return (_jsxs(Box, { sx: { display: "flex" }, children: [_jsx(Box, { sx: { flexBasis: "300px" }, children: _jsx(AdminSideBar, {}) }), _jsx(Box, { sx: { flexGrow: 1, overflow: "auto" }, children: _jsx(Typography, { sx: {
                            height: "100vh",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }, variant: "h4", color: "error", gutterBottom: true, children: "Error loading categories!" }) })] }));
    if (!categories)
        return (_jsxs(Box, { sx: { display: "flex" }, children: [_jsx(Box, { sx: { flexBasis: "300px" }, children: _jsx(AdminSideBar, {}) }), _jsx(Box, { sx: { flexGrow: 1, overflow: "auto" }, children: _jsx("p", { children: _jsx(Typography, { sx: {
                                height: "100vh",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }, variant: "h4", color: "error", gutterBottom: true, children: "No categories found!" }) }) })] }));
    return (_jsxs(Box, { sx: { display: "flex" }, children: [_jsx(Box, { sx: { flexBasis: "300px" }, children: _jsx(AdminSideBar, {}) }), _jsxs(Box, { sx: { flexGrow: 1, overflow: "auto", p: 3 }, children: [_jsxs("div", { style: {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }, children: [_jsx(Typography, { variant: "h4", gutterBottom: true, children: "Categories List" }), _jsx(AddBoxTwoToneIcon, { color: "primary", style: {
                                    marginRight: "16px",
                                    fontSize: "40px",
                                    cursor: "pointer",
                                }, onClick: () => handleOpenCreate() })] }), _jsx(List, { children: categories.map((category) => (_jsx(ListItem, { alignItems: "flex-start", children: _jsx(Card, { sx: {
                                    display: "flex",
                                    width: "100%",
                                    "&:hover": {
                                        backgroundColor: "primary.light",
                                    },
                                }, children: _jsxs(Box, { sx: {
                                        display: "flex",
                                        flexDirection: "column",
                                        flexGrow: 1,
                                    }, children: [_jsx(CardContent, { sx: { flex: "1 0 auto" }, children: _jsx(Typography, { gutterBottom: true, variant: "h5", component: "div", children: category.title }) }), _jsxs(Stack, { direction: "row", spacing: 1, justifyContent: "flex-end", p: 2, children: [_jsx(Button, { size: "small", variant: "contained", color: "primary", onClick: () => handleOpenEdit(category._id.toString()), children: "Edit" }), _jsx(Button, { size: "small", variant: "contained", color: "secondary", onClick: () => handleOpenDelete(category._id.toString()), children: "Delete" })] })] }) }) }, category._id))) }), _jsxs(Dialog, { open: openDelete, onClose: handleCloseDelete, "aria-labelledby": "delete-dialog-title", "aria-describedby": "delete-dialog-description", children: [_jsx(DialogTitle, { id: "delete-dialog-title", children: "Confirm Delete" }), _jsx(DialogContent, { children: _jsx(DialogContentText, { id: "delete-dialog-description", children: "Are you sure you want to delete this category? This action cannot be undone." }) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: handleCloseDelete, children: "Cancel" }), _jsx(Button, { onClick: handleDeleteConfirm, autoFocus: true, children: "Confirm Delete" })] })] }), _jsxs(Dialog, { open: openEdit, onClose: handleCloseEdit, fullWidth: true, maxWidth: "md", children: [_jsx(DialogTitle, { children: "Edit Category" }), _jsx(DialogContent, { children: _jsxs(Container, { children: [_jsx(TextField, { fullWidth: true, margin: "normal", label: "Title", name: "title", value: editableCategory?.title || "", onChange: handleEditChange }), _jsxs(Stack, { direction: "row", spacing: 2, justifyContent: "flex-end", marginTop: 2, children: [_jsx(Button, { variant: "outlined", color: "error", onClick: handleCloseEdit, children: "Cancel" }), _jsx(Button, { variant: "contained", color: "primary", onClick: handleSaveEdit, children: "Save" })] })] }) })] }), _jsxs(Dialog, { open: openCreate, onClose: handleCloseCreate, fullWidth: true, maxWidth: "md", children: [_jsx(DialogTitle, { children: "Create Category" }), _jsx(DialogContent, { children: _jsxs(Container, { children: [_jsx(TextField, { fullWidth: true, margin: "normal", label: "Title", name: "title", value: createCategory.title || "", onChange: handleCreateChange }), _jsxs(Stack, { direction: "row", spacing: 2, justifyContent: "flex-end", marginTop: 2, children: [_jsx(Button, { variant: "outlined", color: "error", onClick: handleCloseCreate, children: "Cancel" }), _jsx(Button, { variant: "contained", color: "primary", onClick: handleSaveCreate, children: "Save" })] })] }) })] })] })] }));
};
export default AdminCategory;
