import React, { useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CircularColor from "../../pages/Loading";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../reducer/store/store";
import {
  fetchOrdersByUser,
} from "../../../reducer/actions/orders/ordersSlice";
import UserSideBar from "./UserSideBar";

const MyOrder = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, isLoading, error } = useSelector(
    (state: RootState) => state.order
  );
  const { userData } = useSelector((state) => state.users);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    dispatch(fetchOrdersByUser(userData._id));
  }, [dispatch]);
  console.log("orders::", orders);

  if (isLoading) return <CircularColor />;

  return (
    <Box sx={{ display: "flex", flexDirection: matches ? "row" : "column" }}>
      <UserSideBar />
      <Box sx={{ flexGrow: 1, overflow: "auto", p: 3 }}>
        <List>
          {orders && orders.map((order) => (
            <ListItem key={order._id} alignItems="flex-start">
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  "&:hover": {
                    backgroundColor: "primary.light",
                  },
                }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography gutterBottom variant="h6" component="div">
                        Order ID: {order._id}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Buyer Name:{" "}
                        {order.buyer.first_name + " " + order.buyer.last_name}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ArrowDownwardIcon />}
                          aria-controls="panel1-content"
                          id="panel1-header">
                          <Typography>Products</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {order.products.map((product) => (
                            <Grid container key={product._id}>
                              <Grid item xs={6}>
                                <Typography
                                  variant="body2"
                                  color="text.secondary">
                                  Product: {product._id}
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography
                                  variant="body2"
                                  color="text.secondary">
                                  Quantity: {product.quantity}
                                </Typography>
                              </Grid>
                            </Grid>
                          ))}
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        Payment amount: {order.payment.amount}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Payment method: {order.payment.method}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
                  <Button size="small" color="secondary">
                    {order.status}
                  </Button>
                </Box>
              </Card>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default MyOrder;
