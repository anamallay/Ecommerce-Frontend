import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { RootState } from "../reducer/store/store";
import Login from "../components/auth/Login";

const ProtectedRoute = () => {
  const location = useLocation();
  const { isLoggedIn } = useSelector((state: RootState) => state.users);
  return isLoggedIn ? <Outlet /> : <Login pathName={location.pathname} />;
};
export default ProtectedRoute;
