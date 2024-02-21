import { Typography, Box, Container } from "@mui/material";

const Error = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
        }}>
        <Box
          sx={{
            display: "flex",
            fontSize: "4rem",
            fontWeight: "bold",
            mb: 2,
          }}>
          <Typography color={"primary"} variant="h1" component="span">
            4
          </Typography>
          <Typography
            variant="h1"
            component="span"
            color={"secondary"}
            sx={{
              mx: 1,
              transform: "rotate(90deg)",
              fontSize: "3rem",
            }}>
            :(
          </Typography>
          <Typography color={"primary"} variant="h1" component="span">
            4
          </Typography>
        </Box>
        <Typography color={"primary"} variant="h4" component="div">
          Page Not Found
        </Typography>
      </Box>
    </Container>
  );
};

export default Error;
