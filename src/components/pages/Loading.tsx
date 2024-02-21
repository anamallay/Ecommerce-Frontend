import CircularProgress from "@mui/material/CircularProgress";

export default function CircularColor() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <CircularProgress color="secondary" />
    </div>
  );
}
