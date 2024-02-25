import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Grid, Typography, TextField, Button } from "@mui/material";
import { sendContactForm } from "../../reducer/actions/contactus/contactusSlice";
import { AppDispatch, RootState } from "../../reducer/store/store";
import { useToaster } from "../../contexts/ToasterProvider";
import { fetchProductByLimit } from "../../reducer/actions/products/productSlice";
import CircularColor from "../pages/Loading";

const Contact = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isLoading, isSuccess } = useSelector(
    (state: RootState) => state.contactus
  );
  // Pagination
  const limit = 4;
  const page = 1;

  useEffect(() => {
    dispatch(fetchProductByLimit({ page, limit }));
  }, [dispatch, isSuccess, page, limit]);

  const [formData, setFormData] = useState({
    subject: "",
    email: "",
    message: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const { showHideToast } = useToaster();

  const handleSubmit = () => {
    dispatch(sendContactForm(formData))
      .then((res) => {
        showHideToast(res.payload.message, "success");
      })
      .catch((error) => {
        showHideToast(error.payload.message, "error");
      });
    setFormData({ subject: "", email: "", message: "" });
  };

  if (isLoading) return <CircularColor />;

  return (
    <Container sx={{ mt: 5 }}>
      <Grid container justifyContent="center">
        <Grid item md={6}>
          <Typography variant="h5" align="center" color="#3D0071" gutterBottom>
            Contact Us
          </Typography>
          <TextField
            fullWidth
            id="subject"
            name="subject"
            label="Subject"
            variant="outlined"
            placeholder="Subject"
            margin="normal"
            value={formData.subject}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            type="email"
            placeholder="Your email"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            id="message"
            name="message"
            label="Message"
            variant="outlined"
            multiline
            rows={4}
            placeholder="Your message"
            margin="normal"
            value={formData.message}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#97014C",
              color: "white",
              "&:hover": { backgroundColor: "#86013E" },
              mt: 1,
            }}>
            Send
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;
