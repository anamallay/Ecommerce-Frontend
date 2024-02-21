import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { resetPassword } from "../../../reducer/actions/users/usersSlice";
import { AppDispatch } from "../../../reducer/store/store";
import { useToaster } from "../../../contexts/ToasterProvider";

function ResetPassword() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const { showHideToast } = useToaster();

  const decode = token ? jwtDecode(token) : null;

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!token) {
      showHideToast("No reset token provided.", "error");
      return;
    }

    try {
      dispatch(resetPassword({ password, token }));
      showHideToast("Password reset successfully", "success");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 1, width: "100%" }}>
        <Typography component="h3" variant="h6" textAlign="center" mb={3}>
          Reset Password
        </Typography>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="newPassword"
          label="New Password"
          name="password"
          type="password"
          autoComplete="new-password"
          autoFocus
          value={password}
          onChange={handlePasswordChange}
        />

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
          Reset Password
        </Button>
      </Box>
    </Container>
  );
}

export default ResetPassword;
