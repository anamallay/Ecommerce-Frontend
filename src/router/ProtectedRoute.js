import { jsx as _jsx } from "react/jsx-runtime";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import Login from "../components/auth/Login";
const ProtectedRoute = () => {
    const location = useLocation();
    const { isLoggedIn } = useSelector((state) => state.users);
    return isLoggedIn ? _jsx(Outlet, {}) : _jsx(Login, { pathName: location.pathname });
};
export default ProtectedRoute;
