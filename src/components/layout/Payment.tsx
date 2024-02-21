import { Button } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchBrainTreeToken,
  payWithBraintree,
} from "../../reducer/actions/orders/ordersSlice";
import DropIn from "braintree-web-drop-in-react";
import { AppDispatch } from "../../reducer/store/store";
import { Product } from "../../types/types";
import { useToaster } from "../../contexts/ToasterProvider";

interface BraintreeInstance {
  requestPaymentMethod(): Promise<{ nonce: string }>;
}

const Payment = ({
  cartItems,
  amount,
}: {
  cartItems: Product[];
  amount: number;
}) => {
  const [braintreeClientToken, setBraintreeClientToken] = useState(null);
  const [instance, setInstance] = useState<BraintreeInstance | null>(null);
  const [showDropIn, setShowDropIn] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { showHideToast } = useToaster();

  const getBraintreeClientToken = useCallback(async () => {
    try {
      const res = await dispatch(fetchBrainTreeToken());
      setBraintreeClientToken(res.payload.payload);
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]); // Include any dependencies here
  console.log("ppcartItems", cartItems, "amount", amount);

useEffect(() => {
  getBraintreeClientToken();
}, [getBraintreeClientToken]);

  const buy = async () => {
    if (!instance) {
      console.error("Braintree instance is not initialized.");
      return;
    }
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const response = await dispatch(
        payWithBraintree({ nonce, cartItems, amount })
      );
      showHideToast(response.payload.message, "success");
    } catch (error) {
      console.error("Error processing payment:", error);
      showHideToast("Payment processing failed.", "error");
    }
  };

  const handlePaymentButtonClick = () => {
    if (!braintreeClientToken) {
      getBraintreeClientToken();
    }
    setShowDropIn(true);
  };

  return (
    <div>
      {!showDropIn && (
        <Button
          variant="contained"
          color="primary"
          onClick={handlePaymentButtonClick}>
          Payment
        </Button>
      )}
      {showDropIn && braintreeClientToken && (
        <>
          <DropIn
            options={{ authorization: braintreeClientToken }}
            onInstance={(instance) => setInstance(instance)}
          />
          <Button variant="contained" color="primary" onClick={buy}>
            Buy
          </Button>
        </>
      )}
    </div>
  );
};

export default Payment;
