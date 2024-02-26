import { jsx as _jsx } from "react/jsx-runtime";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
// Add 'type' as a prop here
export default function SnakeBar({ open, message, type }) {
    return (_jsx("div", { children: _jsx(Stack, { sx: { width: "100%" }, spacing: 2, children: _jsx(Snackbar, { open: open, autoHideDuration: 100000, children: _jsx(Alert, { variant: "outlined", severity: type, sx: { width: "100%" }, children: message }) }) }) }));
}
