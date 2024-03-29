import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { store } from "./reducer/store/store";
import './css/index.css'
import * as React from "react";
import App from "./App";
import * as ReactDOM from "react-dom/client";

const theme = createTheme({
  typography: {
    fontFamily: ["Nunito"].join(","),
  },
  palette: {
    primary: {
      main: "#6E00DD",
      light: "#f3e5f5", 
      dark: "#4a148c", 
    },
    secondary: {
      main: "#FF0C65",
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
