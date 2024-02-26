import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useContext, useState, } from "react";
import Snackbar from "../components/pages/SnakeBar"; // Note: Ensure the file name is correct. It might be Snackbar instead of SnakeBar.
const ToasterContext = createContext(undefined);
export const ToasterProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("success");
    const showHideToast = (message, type) => {
        setOpen(true);
        setMessage(message);
        setType(type); // Set the alert type
        setTimeout(() => {
            setOpen(false);
        }, 2000);
    };
    return (_jsxs(ToasterContext.Provider, { value: { showHideToast }, children: [_jsx(Snackbar, { open: open, message: message, type: type }), children] }));
};
// eslint-disable-next-line react-refresh/only-export-components
export const useToaster = () => {
    const context = useContext(ToasterContext);
    if (context === undefined) {
        throw new Error("useToaster must be used within a ToasterProvider");
    }
    return context;
};
