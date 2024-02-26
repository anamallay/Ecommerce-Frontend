import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
export function Copyright(props) {
    return (_jsxs(Typography, { variant: "body2", color: "text.secondary", align: "center", ...props, children: ["Copyright © ", _jsx(Link, { color: "inherit", to: "/", children: "Your Website" }), " ", new Date().getFullYear(), "."] }));
}
