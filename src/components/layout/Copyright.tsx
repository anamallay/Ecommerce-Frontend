import Typography, { TypographyProps } from "@mui/material/Typography";
import { Link } from "react-router-dom";

interface CopyrightProps extends TypographyProps {}

export function Copyright(props: CopyrightProps) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}>
      {"Copyright © "}
      <Link color="inherit" to="/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
