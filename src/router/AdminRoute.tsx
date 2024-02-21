import { RootState } from "../reducer/store/store";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import Login from "../components/auth/Login";

const AdminRoute = () => {
  const location = useLocation();
    const { userData } = useSelector((state: RootState) => state.users);

  if (userData && userData.isAdmin) {
    return <Outlet />;
  } else {
    return <Login pathName={location.pathname} />;
  }
};

export default AdminRoute;
