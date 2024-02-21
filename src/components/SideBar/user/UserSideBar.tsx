import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

const UserSideBar = () => {
  const { userData, isLoggedIn } = useSelector((state) => state.users);

  return (
    <div style={{ display: "flex", height: "80vh" }}>
      <div>
        <Box
          sx={{
            width: "300px",
            bgcolor: "primary.light",
            padding: "10px",
            marginTop: "50px",
            borderRadius: "0px 10px 10px 0px",
          }}>
          {isLoggedIn && (
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                {userData?.isAdmin ? "Admin" : "User"} Profile
              </Typography>
              <Typography variant="body1">
                Name: {userData?.first_name} {userData?.last_name}
              </Typography>
              <Typography variant="body1">Email: {userData?.email}</Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  component={RouterLink}
                  to="/dashboard/user/myprofile"
                  style={{ textDecoration: "none" }}>
                  My Profile
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  component={RouterLink}
                  to="/dashboard/user/myorder"
                  style={{ textDecoration: "none" }}>
                  My Order
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </div>
    </div>
  );
};

export default UserSideBar;
