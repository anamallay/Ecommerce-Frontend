import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, Pagination, Stack, Typography, } from "@mui/material";
import AdminSideBar from "./AdminSideBar";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { banUser, deleteUser, fetchUsers, unbanUser, } from "../../../reducer/actions/users/usersSlice";
import CircularColor from "../../pages/Loading";
import { useToaster } from "../../../contexts/ToasterProvider";
const AdminUserlist = () => {
    const { users, isLoading, error } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const { showHideToast } = useToaster();
    // Pagination
    const [page, setPage] = useState(1);
    const limit = 4;
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        dispatch(fetchUsers({ page, limit })).then((response) => {
            console.log("fetchUsers response:", response);
            const { pageInfo } = response.payload;
            if (pageInfo) {
                setTotalPages(pageInfo.totalPages);
            }
        });
    }, [dispatch, page, limit]);
    const handlePageChange = (event, value) => {
        setPage(value);
    };
    // Delete user
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);
    function handleOpenDelete(userId) {
        setDeleteUserId(userId);
        setOpenDelete(true);
    }
    const handleCloseDelete = () => {
        setOpenDelete(false);
    };
    const handleDeleteConfirm = async () => {
        if (deleteUserId) {
            await dispatch(deleteUser(deleteUserId));
            setOpenDelete(false);
            dispatch(fetchUsers({ page, limit })).then((response) => {
                const { pageInfo } = response.payload;
                if (pageInfo) {
                    setTotalPages(pageInfo.totalPages);
                }
            });
            showHideToast("User deleted successfully!", "success");
        }
    };
    const handleBan = async (_id) => {
        await dispatch(banUser(_id));
        dispatch(fetchUsers({ page, limit })).then((response) => {
            const { pageInfo } = response.payload;
            if (pageInfo) {
                setTotalPages(pageInfo.totalPages);
            }
        });
        showHideToast("User banned successfully!", "success");
    };
    const handleUnban = async (_id) => {
        await dispatch(unbanUser(_id));
        dispatch(fetchUsers({ page, limit })).then((response) => {
            const { pageInfo } = response.payload;
            if (pageInfo) {
                setTotalPages(pageInfo.totalPages);
            }
        });
        showHideToast("User unbanned successfully!", "success");
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
    //             Error loading users!
    //           </Typography>
    //         </p>
    //       </Box>
    //     </Box>
    //   );
    if (!users)
        return (_jsxs(Box, { sx: { display: "flex" }, children: [_jsx(Box, { sx: { flexBasis: "300px" }, children: _jsx(AdminSideBar, {}) }), _jsx(Box, { sx: { flexGrow: 1, overflow: "auto" }, children: _jsx("p", { children: _jsx(Typography, { sx: {
                                height: "100vh",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }, variant: "h4", color: "error", gutterBottom: true, children: "No users found!" }) }) })] }));
    return (_jsxs(Box, { sx: { display: "flex" }, children: [_jsx(Box, { sx: { flexBasis: "200px" }, children: _jsx(AdminSideBar, {}) }), _jsxs(Box, { sx: { flexGrow: 1, overflow: "auto", p: 3 }, children: [_jsx(Typography, { variant: "h4", gutterBottom: true, children: "Users List" }), _jsx(List, { children: (users.payload ?? []).map((user) => (_jsx(ListItem, { alignItems: "flex-start", children: _jsx(Card, { sx: {
                                    display: "flex",
                                    width: "100%",
                                    "&:hover": {
                                        backgroundColor: "primary.light",
                                    },
                                }, children: _jsxs(Box, { sx: {
                                        display: "flex",
                                        flexDirection: "column",
                                        flexGrow: 1,
                                    }, children: [_jsxs(CardContent, { sx: { flex: "1 0 auto" }, children: [_jsxs(Typography, { gutterBottom: true, variant: "h6", component: "div", children: [user.first_name, " ", user.last_name] }), _jsx(Typography, { gutterBottom: true, variant: "text", component: "div", children: user.email }), _jsxs(Typography, { gutterBottom: true, variant: "text", component: "div", children: ["Role: ", user.isAdmin ? "Admin" : "User"] })] }), _jsxs(Stack, { direction: "row", spacing: 1, justifyContent: "flex-end", p: 2, children: [user.isBanned ? (_jsx(Button, { size: "small", variant: "contained", color: "primary", onClick: () => handleUnban(user._id), children: "Unblock" })) : (_jsx(Button, { size: "small", variant: "outlined", color: "primary", onClick: () => handleBan(user._id), children: "Block" })), _jsx(Button, { size: "small", variant: "contained", color: "secondary", onClick: () => handleOpenDelete(user._id), children: "Delete" })] })] }) }) }, user._id))) }), _jsx(Stack, { spacing: 2, alignItems: "center", children: _jsx(Pagination, { count: totalPages, page: page, variant: "outlined", shape: "rounded", color: "secondary", onChange: handlePageChange }) })] }), _jsxs(Dialog, { open: openDelete, onClose: handleCloseDelete, "aria-labelledby": "delete-dialog-title", "aria-describedby": "delete-dialog-description", children: [_jsx(DialogTitle, { id: "delete-dialog-title", children: "Confirm Delete" }), _jsx(DialogContent, { children: _jsx(DialogContentText, { id: "delete-dialog-description", children: "Are you sure you want to delete this product? This action cannot be undone." }) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: handleCloseDelete, children: "Cancel" }), _jsx(Button, { onClick: handleDeleteConfirm, autoFocus: true, children: "Confirm Delete" })] })] })] }));
};
export default AdminUserlist;
