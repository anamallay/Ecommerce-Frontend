import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Header from "../components/layout/Header";
import { Outlet } from "react-router-dom";
const Layout = () => {
    return (_jsxs("div", { children: [_jsx(Header, {}), _jsx("div", { style: { marginTop: "60px" }, children: _jsx(Outlet, {}) })] }));
};
export default Layout;
