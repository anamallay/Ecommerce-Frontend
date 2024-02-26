import { jsx as _jsx } from "react/jsx-runtime";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import Login from "../components/auth/Login";
const AdminRoute = () => {
    const location = useLocation();
    const { userData } = useSelector((state) => state.users);
    if (userData && userData.isAdmin) {
        return _jsx(Outlet, {});
    }
    else {
        return _jsx(Login, { pathName: location.pathname });
    }
};
export default AdminRoute;
