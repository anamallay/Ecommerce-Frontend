import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchBrainTreeToken, payWithBraintree, } from "../../reducer/actions/orders/ordersSlice";
import DropIn from "braintree-web-drop-in-react";
import { useToaster } from "../../contexts/ToasterProvider";
const Payment = ({ cartItems, amount, }) => {
    const [braintreeClientToken, setBraintreeClientToken] = useState(null);
    const [instance, setInstance] = useState(null);
    const [showDropIn, setShowDropIn] = useState(false);
    const dispatch = useDispatch();
    const { showHideToast } = useToaster();
    const getBraintreeClientToken = useCallback(async () => {
        try {
            const res = await dispatch(fetchBrainTreeToken());
            setBraintreeClientToken(res.payload.payload);
        }
        catch (error) {
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
            const response = await dispatch(payWithBraintree({ nonce, cartItems, amount }));
            showHideToast(response.payload.message, "success");
        }
        catch (error) {
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
    return (_jsxs("div", { children: [!showDropIn && (_jsx(Button, { variant: "contained", color: "primary", onClick: handlePaymentButtonClick, children: "Payment" })), showDropIn && braintreeClientToken && (_jsxs(_Fragment, { children: [_jsx(DropIn, { options: { authorization: braintreeClientToken }, onInstance: (instance) => setInstance(instance) }), _jsx(Button, { variant: "contained", color: "primary", onClick: buy, children: "Buy" })] }))] }));
};
export default Payment;
