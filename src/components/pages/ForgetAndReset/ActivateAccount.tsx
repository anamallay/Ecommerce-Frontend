import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Button, Container, Typography } from "@mui/material";
import { useToaster } from "../../../contexts/ToasterProvider";
import { baseURl } from "../../../reducer/actions/baseURl";

interface DecodedToken {
  first_name: string;
}
const ActivateAccount = () => {
  const navigate = useNavigate();
  const params = useParams<{ token?: string }>();
  const token = params.token;

  if (!token) {
    console.error("Token is missing");
    return <div>Token is missing</div>;
  }

  const decoded: DecodedToken = jwtDecode(token as string); 

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { showHideToast } = useToaster();

  // todo: mode this to redux action slice
  const handleActivation = () => {
    axios
      .post(`${baseURl}/api/users/activate-account/${token}`)
      .then(() => {
        navigate("/login", { state: { fromActivation: true } });
        showHideToast(
          "Your account has been activated successfully. You can now log in.",
          "success"
        );
      })
      .catch((error) => {
        console.error("Error activating account:", error.response.data);
      });
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Typography variant="h4" gutterBottom>
        Hello {decoded.first_name} Activate Account
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleActivation}
        sx={{ backgroundColor: "primary" }}>
        Activate My Account
      </Button>
    </Container>
  );
};

export default ActivateAccount;
