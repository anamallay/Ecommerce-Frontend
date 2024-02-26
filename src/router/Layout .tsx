import Header from "../components/layout/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Header />
      <div style={{ marginTop: "60px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
