import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrder,
  fetchOrders,
  updateOrderStatus,
} from "../../../reducer/actions/orders/ordersSlice";
import { RootState, AppDispatch } from "../../../reducer/store/store";
import AdminSideBar from "./AdminSideBar";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  Typography,
  useMediaQuery,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CircularColor from "../../pages/Loading";
import { useToaster } from "../../../contexts/ToasterProvider";

const AdminOrders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, isLoading } = useSelector(
    (state: RootState) => state.order
  );
  const { showHideToast } = useToaster();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(
      updateOrderStatus({ orderId: orderId.toString(), status: newStatus })
    )
      .then(() => {
        dispatch(fetchOrders())
          .then(() => {
            showHideToast("Order status updated successfully", "success");
          })
          .catch(() => {
            console.error("Failed to fetch orders after updating status");
            showHideToast(
              "Failed to fetch orders after updating status",
              "error"
            );
          });
      })
      .catch((error) => {
        console.error("Failed to update order status:", error);
        showHideToast("Failed to update order status", "error");
      });
  };

const handleDeleteOrder = (orderId) => {
  dispatch(deleteOrder(orderId))
    .then(() => {
      dispatch(fetchOrders()).then(() => {
        showHideToast("Order deleted successfully", "success");
      });
    })
    .catch((error) => {
      showHideToast("Failed to delete order", "error");
    });
};

  if (isLoading) return <CircularColor />;

  return (
    <Box sx={{ display: "flex", flexDirection: matches ? "row" : "column" }}>
      <AdminSideBar />
      <Box sx={{ flexGrow: 1, overflow: "auto", p: 3 }}>
        <List>
          {Array.isArray(orders) &&
            orders.map((order) => (
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
                          Buyer Email: {order.buyer.email}
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
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
                    <FormControl
                      variant="outlined"
                      size="small"
                      sx={{ minWidth: 120 }}>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        label="Status">
                        <MenuItem value="Not processed">Not processed</MenuItem>
                        <MenuItem value="Processing">Processing</MenuItem>
                        <MenuItem value="Shipped">Shipped</MenuItem>
                        <MenuItem value="Delivered">Delivered</MenuItem>
                        <MenuItem value="Cancelled">Cancelled</MenuItem>
                      </Select>
                    </FormControl>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      sx={{ marginLeft: "10px" }}
                      onClick={() => handleDeleteOrder(order._id)}>
                      Delete
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

export default AdminOrders;
