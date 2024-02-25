import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducer/store/store";
import {
  clearCart,
  removeFromCart,
} from "../../reducer/actions/cart/cartSlice";
import Payment from "./Payment";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const { isLoggedIn } = useSelector((state: RootState) => state.users);

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const calculateTotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {cartItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <img
                  src={item.image || "public/images/default.png"}
                  alt={item.title}
                  style={{ width: "50px", height: "50px" }}
                />
              </TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>${item.price}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleRemoveFromCart(item._id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {cartItems.length > 0 && (
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClearCart}>
              Clear Cart
            </Button>
            <Box sx={{ flexGrow: 1 }} />{" "}
            <Typography variant="h5">
              Total: ${calculateTotal().toFixed(2)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}>
            {isLoggedIn ? (
              <Payment
                cartItems={cartItems}
                amount={parseFloat(calculateTotal().toFixed(2))}
              />
            ) : (
              <Typography
                variant="h4"
                align="center"
                // color="#3D0071"
                gutterBottom>
                Please Login First
              </Typography>
            )}
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Cart;
