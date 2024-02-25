import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProductByLimit } from "../../reducer/actions/products/productSlice";
import { Product } from "../../types/types";
import { AppDispatch, RootState } from "../../reducer/store/store";
import CircularColor from "../pages/Loading";
import { addToCart } from "../../reducer/actions/cart/cartSlice";
import { Box, Pagination, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const ShowProducts = () => {
  const { products, isLoading, error } = useSelector(
    (state: RootState) => state.products
  );
  const dispatch: AppDispatch = useDispatch();
  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };
  // Pagination
  const [page, setPage] = useState(1);
  const limit = 4;
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    dispatch(fetchProductByLimit({ page, limit })).then((response) => {
      console.log("fetchUsers response:", response);
      const { pagination } = response.payload;

      if (pagination) {
        setTotalPages(pagination.totalPages);
      }
    });
  }, [dispatch, page, limit]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  if (isLoading) return <CircularColor />;
  console.log("error", error);

  // if (error)
  //   return (
  //     <div
  //       style={{
  //         height: "100vh",
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //       }}>
  //       <Typography
  //         sx={{
  //           height: "100vh",
  //           display: "flex",
  //           justifyContent: "center",
  //           alignItems: "center",
  //         }}
  //         variant="h4"
  //         color="error"
  //         gutterBottom>
  //         {error}
  //       </Typography>
  //     </div>
  //   );
  if (!products)
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <p>No products found!</p>
      </div>
    );

  return (
    <div id="showProducts">
      <Box sx={{ padding: { xs: "20px", sm: "40px", md: "80px" } }}>
        <Grid container spacing={2} justifyContent="center">
          {products.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  maxWidth: 345,
                  boxShadow: 3,
                  "&:hover": { boxShadow: 5 },
                  transition: "box-shadow 0.3s",
                }}>
                <CardMedia
                  sx={{ height: 200, objectFit: "cover" }}
                  image={product.image || "public/images/default.png"}
                  title={product.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    Price: ${product.price}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    {product.quantity - product.sold === 0
                      ? "Out of Stock"
                      : `In Stock: ${product.quantity - product.sold}`}
                  </Typography>
                </CardContent>
                <CardActions>
                  <ShoppingCartIcon
                    onClick={() => handleAddToCart(product)}
                    sx={{
                      color: "primary.main",
                      cursor: "pointer",
                    }}
                  />
                  <Link to={`/showProducts/${product._id}`}>
                    <Button size="small" sx={{ color: "secondary.main" }}>
                      Learn More
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Stack spacing={2} alignItems="center" sx={{ marginTop: "20px" }}>
          <Pagination
            count={totalPages}
            page={page}
            variant="outlined"
            shape="rounded"
            color="secondary"
            onChange={handlePageChange}
          />
        </Stack>
      </Box>
    </div>
  );
};

export default ShowProducts;
