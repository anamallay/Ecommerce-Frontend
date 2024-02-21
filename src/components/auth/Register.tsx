import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import { AppDispatch } from "../../reducer/store/store";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../reducer/actions/users/usersSlice";
import { useToaster } from "../../contexts/ToasterProvider";
import CircularColor from "../pages/Loading";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: "1px",
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
  width: "1px",
});
interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
  image: File | null;
}
export default function Register() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { users, isLoggedIn, isLoading, error } = useSelector(
    (state) => state.users
  );
  const { showHideToast } = useToaster();
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    image: null,
  });

  const handleInputChange = (event) => {
    if (event.target.type === "file") {
      const fileInput = event.target as HTMLInputElement;
      if (fileInput.files && fileInput.files.length > 0) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [event.target.name]: fileInput.files[0],
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [event.target.name]: null,
        }));
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [event.target.name]: event.target.value,
      }));
    }
  };
  console.log("formData reg", formData);
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      if (formData.password !== formData.confirmPassword) {
        console.error("Passwords do not match");
        return;
      }

      if (formData.password.length < 8) {
        console.error("Password must be at least 8 characters");
        return;
      }
      const formdata = new FormData();
      formdata.append("first_name", formData.first_name);
      formdata.append("last_name", formData.last_name);
      formdata.append("email", formData.email);
      formdata.append("phone", formData.phone);
      formdata.append("address", formData.address);
      formdata.append("password", formData.password);
      console.log("formData.image", formData.image);
      if (formData.image) {
        formdata.append("image", formData.image);
      }
      try {
        const response = await dispatch(createUser(formdata));

        if (response.type === "users/createUser/fulfilled") {
          showHideToast(response.payload.message, "success");
          navigate("/login");
        } else if (response.type === "users/createUser/rejected") {
          showHideToast(response.error.message, "warning");
        }
      } catch (error) {
        console.error("Failed to create user", error);
      }

      navigate("/login");
    }
    // setValidated(true);
  };
  if (isLoading) return <CircularColor />;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="first_name"
            label="first_name"
            name="first_name"
            autoComplete="given-name"
            autoFocus
            value={formData.first_name}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="last_name"
            label="last_name"
            name="last_name"
            autoComplete="family-name"
            value={formData.last_name}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone Number"
            name="phone"
            autoComplete="tel"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="address"
            label="Address"
            name="address"
            autoComplete="street-address"
            value={formData.address}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          <Button
            component="label"
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ mt: 2, mb: 2 }}>
            Upload Profile Image
            <VisuallyHiddenInput
              accept="image/*"
              type="file"
              name="image"
              onChange={handleInputChange}
            />
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
