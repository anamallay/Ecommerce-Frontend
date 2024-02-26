import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { store } from "./reducer/store/store.ts";
import './css/index.css';
const theme = createTheme({
    typography: {
        fontFamily: ["Nunito"].join(","),
    },
    palette: {
        primary: {
            main: "#6E00DD",
            light: "#f3e5f5",
            dark: "#4a148c",
        },
        secondary: {
            main: "#FF0C65",
        },
    },
});
ReactDOM.createRoot(document.getElementById("root")).render(_jsx(React.StrictMode, { children: _jsx(ThemeProvider, { theme: theme, children: _jsx(Provider, { store: store, children: _jsx(App, {}) }) }) }));
