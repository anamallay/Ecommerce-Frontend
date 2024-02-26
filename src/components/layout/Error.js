import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Typography, Box, Container } from "@mui/material";
const Error = () => {
    return (_jsx(Container, { maxWidth: "sm", children: _jsxs(Box, { sx: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                textAlign: "center",
            }, children: [_jsxs(Box, { sx: {
                        display: "flex",
                        fontSize: "4rem",
                        fontWeight: "bold",
                        mb: 2,
                    }, children: [_jsx(Typography, { color: "primary", variant: "h1", component: "span", children: "4" }), _jsx(Typography, { variant: "h1", component: "span", color: "secondary", sx: {
                                mx: 1,
                                transform: "rotate(90deg)",
                                fontSize: "3rem",
                            }, children: ":(" }), _jsx(Typography, { color: "primary", variant: "h1", component: "span", children: "4" })] }), _jsx(Typography, { color: "primary", variant: "h4", component: "div", children: "Page Not Found" })] }) }));
};
export default Error;
