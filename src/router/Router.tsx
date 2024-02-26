import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Header from "../components/layout/Header";
// import Home from "../components/layout/Home";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
// import AboutUs from "../components/layout/AboutUs";
// import Contact from "../components/layout/Contact";
import Error from "../components/layout/Error";
import ResetPassword from "../components/pages/ForgetAndReset/ResetPassword";
import ActivateAccount from "../components/pages/ForgetAndReset/ActivateAccount";
import ForgetPassword from "../components/pages/ForgetAndReset/ForgetPassword";
import Cart from "../components/layout/Cart";
import MyProfile from "../components/SideBar/user/MyProfile";
import ProtectedRoute from "./ProtectedRoute";
import UserSideBar from "../components/SideBar/user/UserSideBar";
import AdminRoute from "./AdminRoute";
import AdminSideBar from "../components/SideBar/admin/AdminSideBar";
import AdminProduct from "../components/SideBar/admin/AdminProduct";
import AdminCategory from "../components/SideBar/admin/AdminCategory";
import AdminUserlist from "../components/SideBar/admin/AdminUserlist";
import AdminOrders from "../components/SideBar/admin/AdminOrders";
import DetailProduct from "../components/products/DetailProduct";
// import ShowProducts from "../components/products/showProducts";
import MyOrder from "../components/SideBar/user/MyOrder";
import Layout from "./Layout ";

function Index() {
  return (
    <div>
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="forgetPassword" element={<ForgetPassword />} />
            <Route path="resetpassword/:token" element={<ResetPassword />} />
            {/* <Route path="showProducts" element={<ShowProducts />} /> */}
            <Route path="showProducts/:id" element={<DetailProduct />} />
            <Route path="cart" element={<Cart />} />

            <Route path="/dashboard" element={<ProtectedRoute />}>
              <Route path="user" element={<UserSideBar />} />
              <Route path="user/myprofile" element={<MyProfile />} />
              <Route path="user/myorder" element={<MyOrder />} />
            </Route>
            <Route path="/dashboard" element={<AdminRoute />}>
              <Route path="admin" element={<AdminSideBar />} />
              <Route path="admin/products" element={<AdminProduct />} />
              <Route path="admin/category" element={<AdminCategory />} />
              <Route path="admin/userlist" element={<AdminUserlist />} />
              <Route path="admin/orders" element={<AdminOrders />} />
            </Route>

            <Route
              path="users/activate-account/:token"
              element={<ActivateAccount />}
            />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Index;
