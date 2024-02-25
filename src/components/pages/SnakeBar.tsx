import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";

interface SnackBarProps {
  open: boolean;
  message: string;
  type: "error" | "warning" | "info" | "success";
}
// Add 'type' as a prop here
export default function SnakeBar({ open, message, type }: SnackBarProps) {
  return (
    <div>
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Snackbar open={open} autoHideDuration={100000}>
          {/* Use the 'type' prop to set the severity of the Alert */}
          <Alert variant="outlined" severity={type} sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}
