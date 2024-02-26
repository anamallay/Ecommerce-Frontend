import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ShopIcon from "@mui/icons-material/Shop";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, logoutUser } from "../../reducer/actions/users/usersSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useToaster } from "../../contexts/ToasterProvider";
import { AppDispatch, RootState } from "../../reducer/store/store";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Home from "./Home";
import Contact from "./Contact";
import AboutUs from "./AboutUs";
import { Link as ScrollLink, scroller } from "react-scroll";
import { Element } from "react-scroll";
import ShowProducts from "../products/ShowProducts";

const pages = ["Home", "Products", "Contact", "About Us"];

export default function Header() {
  const { userData, isLoggedIn } = useSelector(
    (state: RootState) => state.users
  );
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { showHideToast } = useToaster();

  console.log("location", location.pathname == "/");
  const handleNavigateAndScroll = (page: string) => {
    if (location.pathname !== "/") {
      navigate("/", { replace: true });
    } else {
      scrollToSection(page);
    }
  };

  const scrollToSection = (page: string) => {
    const scrollId = page.toLowerCase().replace(/\s+/g, "");
    setTimeout(() => {
      scroller.scrollTo(scrollId, {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
      });
    }, 100);
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      const resultAction = await dispatch(logoutUser());
      const user = unwrapResult(resultAction);
      navigate("/");
      showHideToast(user.message, "success");
    } catch (error) {
      if (error instanceof Error) {
        showHideToast(error.message, "warning");
      } else {
        showHideToast("An unexpected error occurred.", "warning");
      }
    }
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{ backgroundColor: "white", color: "black" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}>
              <img
                src="images/icon.png"
                alt="menu"
                style={{ width: 32, height: 32 }}
              />
            </IconButton>
            {pages.map((page) => (
              <Link to={page.toLowerCase().replace(/\s+/g, "")}>
                <ScrollLink
                  activeClass="active"
                  to={page.toLowerCase().replace(/\s+/g, "")}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  key={page}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    marginRight: 4,
                  }}>
                  <Button
                    onClick={() => handleNavigateAndScroll(page)}
                    sx={{ color: "black", marginRight: 4 }}
                    key={page}>
                    {page}
                  </Button>
                </ScrollLink>
              </Link>
            ))}
            <Box sx={{ flexGrow: 1 }} />
            {!isLoggedIn ? (
              <>
                <Link
                  to={"/cart"}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    marginRight: "10px",
                  }}>
                  <Badge badgeContent={cartItems.length} color="secondary">
                    <ShopIcon
                      sx={{ color: "primary.main", fontSize: "30px" }}
                    />
                  </Badge>
                </Link>
                <Link to={"/login"} style={{ textDecoration: "none" }}>
                  <Button
                    style={{ marginLeft: "10px" }}
                    color="secondary"
                    variant="contained">
                    Login
                  </Button>
                </Link>
                <Link to={"/register"} style={{ textDecoration: "none" }}>
                  <Button
                    style={{ marginLeft: "10px" }}
                    color="primary"
                    variant="contained">
                    Register
                  </Button>
                </Link>
              </>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Link
                  to={"/cart"}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    marginRight: "10px",
                  }}>
                  <Badge badgeContent={cartItems.length} color="secondary">
                    <ShopIcon
                      sx={{ color: "primary.main", fontSize: "30px" }}
                    />
                  </Badge>
                </Link>
                <Link
                  to={
                    userData?.isAdmin ? "/dashboard/admin" : "/dashboard/user"
                  }>
                  <Avatar src={userData?.image} />
                </Link>

                <Button
                  style={{ marginLeft: "10px" }}
                  color="secondary"
                  variant="contained"
                  onClick={handleLogout}>
                  Logout
                </Button>
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      {location.pathname === "/" && (
        <div className="element" style={{ marginTop: "10vh" }}>
          <Element name="home">
            <Home />
          </Element>
          <Element name="products">
            <ShowProducts />
          </Element>
          <Element name="contact">
            <Contact />
          </Element>
          <Element name="aboutus">
            <AboutUs />
          </Element>
        </div>
      )}
    </div>
  );
}
