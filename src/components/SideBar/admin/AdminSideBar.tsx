import React from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Box,
  Typography,
  Drawer,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AdminPanelSettingsTwoToneIcon from "@mui/icons-material/AdminPanelSettingsTwoTone";
import { Link as RouterLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const AdminSideBar = () => {
  const { userData, isLoggedIn } = useSelector((state) => state.users);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerWidth = Math.min(300, window.innerWidth - theme.spacing(4));

  const drawerContent = (
    <Box
      sx={{
        width: drawerWidth, // Responsive width
        height: "100vh",
        // width: "300px",
        bgcolor: "primary.light",
        padding: "10px",
        borderRadius: "0px 10px 10px 0px",
      }}>
      {isLoggedIn && (
        <Box sx={{ p: 2 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{ mb: 2, fontSize: { xs: "1.5rem", sm: "2rem" } }}>
            <AdminPanelSettingsTwoToneIcon
              color="primary"
              sx={{ fontSize: { xs: "30px", sm: "40px" } }}
            />
            {userData?.isAdmin ? "Admin" : "User"} Profile
          </Typography>
          <Typography variant="body1">
            Name: {userData?.first_name} {userData?.last_name}
          </Typography>
          <Typography variant="body1">Email: {userData?.email}</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Button
              component={RouterLink}
              to="/dashboard/admin/products"
              variant="outlined"
              fullWidth>
              Products
            </Button>
            <Button
              component={RouterLink}
              to="/dashboard/admin/category"
              variant="outlined"
              fullWidth>
              Category
            </Button>
            <Button
              component={RouterLink}
              to="/dashboard/admin/userlist"
              variant="outlined"
              fullWidth>
              User List
            </Button>
            <Button
              component={RouterLink}
              to="/dashboard/admin/orders"
              variant="outlined"
              fullWidth>
              All the Orders
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );

  return (
    <div>
      {isMobile ? (
        <>
          <IconButton
            color="secondary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                // width: "80vh",
              },
            }}>
            {drawerContent}
          </Drawer>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            width: drawerWidth,
          }}>
          <Box
            sx={{
              width: "300px",
              marginTop: "30px",
              bgcolor: "primary.light",
              padding: "10px",
              borderRadius: "0px 10px 10px 0px",
            }}>
            {isLoggedIn && (
              <Box sx={{ p: 2 }}>
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{ mb: 2, fontSize: { xs: "1.5rem", sm: "2rem" } }}>
                  <AdminPanelSettingsTwoToneIcon
                    color="primary"
                    sx={{ fontSize: { xs: "30px", sm: "40px" } }}
                  />
                  {userData?.isAdmin ? "Admin" : "User"} Profile
                </Typography>
                <Typography variant="body1">
                  Name: {userData?.first_name} {userData?.last_name}
                </Typography>
                <Typography variant="body1">
                  Email: {userData?.email}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Button
                    component={RouterLink}
                    to="/dashboard/admin/products"
                    variant="outlined"
                    fullWidth>
                    Products
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/dashboard/admin/category"
                    variant="outlined"
                    fullWidth>
                    Category
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/dashboard/admin/userlist"
                    variant="outlined"
                    fullWidth>
                    User List
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/dashboard/admin/orders"
                    variant="outlined"
                    fullWidth>
                    All the Orders
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AdminSideBar;
