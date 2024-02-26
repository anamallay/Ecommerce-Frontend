import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Grid, Typography, TextField, Button } from "@mui/material";
import { sendContactForm } from "../../reducer/actions/contactus/contactusSlice";
import { useToaster } from "../../contexts/ToasterProvider";
import { fetchProductByLimit } from "../../reducer/actions/products/productSlice";
import CircularColor from "../pages/Loading";
const Contact = () => {
    const dispatch = useDispatch();
    const { isLoading, isSuccess } = useSelector((state) => state.contactus);
    // Pagination
    const limit = 4;
    const page = 1;
    useEffect(() => {
        dispatch(fetchProductByLimit({ page, limit }));
    }, [dispatch, isSuccess, page, limit]);
    const [formData, setFormData] = useState({
        subject: "",
        email: "",
        message: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const { showHideToast } = useToaster();
    const handleSubmit = () => {
        dispatch(sendContactForm(formData))
            .then((res) => {
            showHideToast(res.payload.message, "success");
        })
            .catch((error) => {
            showHideToast(error.payload.message, "error");
        });
        setFormData({ subject: "", email: "", message: "" });
    };
    if (isLoading)
        return _jsx(CircularColor, {});
    return (_jsx(Container, { sx: { mt: 5 }, children: _jsx(Grid, { container: true, justifyContent: "center", children: _jsxs(Grid, { item: true, md: 6, children: [_jsx(Typography, { variant: "h5", align: "center", color: "#3D0071", gutterBottom: true, children: "Contact Us" }), _jsx(TextField, { fullWidth: true, id: "subject", name: "subject", label: "Subject", variant: "outlined", placeholder: "Subject", margin: "normal", value: formData.subject, onChange: handleChange }), _jsx(TextField, { fullWidth: true, id: "email", name: "email", label: "Email", variant: "outlined", type: "email", placeholder: "Your email", margin: "normal", value: formData.email, onChange: handleChange }), _jsx(TextField, { fullWidth: true, id: "message", name: "message", label: "Message", variant: "outlined", multiline: true, rows: 4, placeholder: "Your message", margin: "normal", value: formData.message, onChange: handleChange }), _jsx(Button, { variant: "contained", onClick: handleSubmit, sx: {
                            backgroundColor: "#97014C",
                            color: "white",
                            "&:hover": { backgroundColor: "#86013E" },
                            mt: 1,
                        }, children: "Send" })] }) }) }));
};
export default Contact;
