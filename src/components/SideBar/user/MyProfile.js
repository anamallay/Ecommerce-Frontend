import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button, TextField, Modal, Box, Typography, FormControl, } from "@mui/material";
import UserSideBar from "./UserSideBar";
import { useDispatch, useSelector } from "react-redux";
import { Updateusers } from "../../../reducer/actions/users/usersSlice";
import { useToaster } from "../../../contexts/ToasterProvider";
const MyProfile = () => {
    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.users);
    const { showHideToast } = useToaster();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formUserData, setFormUserData] = useState({
        first_name: userData?.first_name || "",
        last_name: userData?.last_name || "",
    });
    console.log("userData", userData);
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormUserData((prevState) => ({ ...prevState, [name]: value }));
    };
    const handleUpdateNameClick = () => {
        setIsFormOpen(true);
    };
    const handleCloseModal = () => {
        setIsFormOpen(false);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userData && userData._id) {
            const updateUserDate = { _id: userData._id, ...formUserData };
            console.log("updateUserDate", updateUserDate);
            await dispatch(Updateusers(updateUserDate));
            showHideToast("Profile Updated successfully!", "success");
            setIsFormOpen(false);
        }
        else {
            console.error("User data is undefined or missing an ID.");
        }
    };
    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
    };
    return (_jsxs("div", { style: { display: "flex" }, children: [_jsx("div", { style: { flexBasis: "300px" }, children: _jsx(UserSideBar, {}) }), _jsxs("div", { style: {
                    flexGrow: 1,
                    display: "flex",
                    height: "90vh",
                    alignItems: "center",
                    justifyContent: "center",
                }, children: [_jsxs(Box, { sx: {
                            bgcolor: "primary.light",
                            p: 6, // shorthand for padding, equivalent to '60px'
                            borderRadius: 2, // default theme spacing, consider adjusting for your theme or using raw values like '10px'
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }, children: [_jsx(Typography, { variant: "h3", component: "h2", gutterBottom: true, children: "Your Profile" }), _jsxs(Box, { sx: { width: "100%" }, children: [_jsx(Typography, { variant: "h5", gutterBottom: true, children: "Profile Information" }), _jsxs(Box, { sx: { mb: 2 }, children: [_jsxs(Typography, { variant: "h6", component: "p", sx: { fontWeight: "bold", mb: 1 }, children: ["First Name:", " ", _jsx(Box, { component: "span", sx: { fontWeight: "normal" }, children: formUserData.first_name })] }), _jsxs(Typography, { variant: "h6", component: "p", sx: { fontWeight: "bold", mb: 1 }, children: ["Last Name:", " ", _jsx(Box, { component: "span", sx: { fontWeight: "normal" }, children: formUserData.last_name })] }), _jsxs(Typography, { variant: "h6", component: "p", sx: { fontWeight: "bold", mb: 1 }, children: ["Email:", " ", _jsx(Box, { component: "span", sx: { fontWeight: "normal" }, children: userData.email })] }), _jsxs(Typography, { variant: "h6", component: "p", sx: { fontWeight: "bold" }, children: ["Role:", " ", _jsx(Box, { component: "span", sx: { fontWeight: "normal" }, children: userData.isAdmin ? "Admin" : "User" })] })] }), _jsx(Button, { variant: "contained", onClick: handleUpdateNameClick, sx: { mt: 3 }, children: "Update Name" })] })] }), _jsx(Modal, { open: isFormOpen, onClose: handleCloseModal, children: _jsxs(Box, { sx: modalStyle, children: [_jsx(Typography, { id: "modal-modal-title", variant: "h6", component: "h2", children: "Edit Profile" }), _jsxs(Box, { component: "form", onSubmit: handleSubmit, noValidate: true, sx: { mt: 2 }, children: [_jsx(FormControl, { fullWidth: true, margin: "normal", children: _jsx(TextField, { margin: "normal", required: true, fullWidth: true, id: "first_name", label: "First Name", name: "first_name", autoComplete: "fname", autoFocus: true, value: formUserData.first_name, onChange: handleFormChange }) }), _jsx(FormControl, { fullWidth: true, margin: "normal", children: _jsx(TextField, { margin: "normal", required: true, fullWidth: true, id: "last_name", label: "Last Name", name: "last_name", autoComplete: "lname", value: formUserData.last_name, onChange: handleFormChange }) }), _jsxs(Box, { sx: { display: "flex", justifyContent: "flex-end", mt: 3 }, children: [_jsx(Button, { onClick: handleCloseModal, sx: { mr: 1 }, children: "Close" }), _jsx(Button, { variant: "contained", type: "submit", children: "Save Changes" })] })] })] }) })] })] }));
};
export default MyProfile;
