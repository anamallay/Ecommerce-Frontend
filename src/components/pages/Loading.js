import { jsx as _jsx } from "react/jsx-runtime";
import CircularProgress from "@mui/material/CircularProgress";
export default function CircularColor() {
    return (_jsx("div", { style: {
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }, children: _jsx(CircularProgress, { color: "secondary" }) }));
}
