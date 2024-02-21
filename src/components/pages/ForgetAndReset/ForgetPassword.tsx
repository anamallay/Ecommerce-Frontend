import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
// import { forgetPassword } from "../../redux/slices/users/usersSlice";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { AppDispatch } from "../../../reducer/store/store";
import { forgetPassword } from "../../../reducer/actions/users/usersSlice";
import { useToaster } from "../../../contexts/ToasterProvider";

function ForgetPassword() {
  const dispatch: AppDispatch = useDispatch();
  const [email, setEmail] = useState("");
  const { showHideToast } = useToaster();

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    try {
      dispatch(forgetPassword(email));
      showHideToast("please check your email to reset your password", "info");
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
        <Typography component="h1" variant="h5" textAlign="center" mb={4}>
          Reset Password
        </Typography>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={handleEmailChange}
          sx={{
            borderColor: "#230034",
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#230034" },
            },
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
          }}>
          Send
        </Button>
      </Box>
    </Container>
  );
}

export default ForgetPassword;
