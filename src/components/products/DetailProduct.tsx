import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia
} from "@mui/material";
import { AppDispatch } from "../../reducer/store/store";
import { findProductById } from "../../reducer/actions/products/productSlice";
import { addToCart } from "../../reducer/actions/cart/cartSlice";

const DetailProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
//   const theme = useTheme();

  useEffect(() => {
    if (id) {
      dispatch(findProductById(id));
    }
  }, [id]);

  const singleProduct = useSelector((state) =>
    state.products.products.find((product) => product._id === id)
  );

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container justifyContent="center" spacing={4}>
        {singleProduct && (
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                image={singleProduct.image}
                alt={singleProduct.title}
                sx={{ height: 300 }} // Set a specific height
              />

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {singleProduct.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {singleProduct.description}
                </Typography>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Price: ${singleProduct.price}
                </Typography>
                <Typography variant="body2">
                  Quantity: {singleProduct.quantity}
                </Typography>
                <Typography variant="body2">
                  Shipping: {singleProduct.shipping}
                </Typography>
                <Typography variant="body2">
                  Sold: {singleProduct.sold}
                </Typography>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item>
                    <Button
                      size="small"
                      sx={{ color: "secondary.main" }}
                      onClick={() => navigate("/")}>
                      Back
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAddToCart(singleProduct)}>
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default DetailProduct;
