import React from "react";
import "./App.css";
import GlobalTheme from "./context/GlobalThemes";
import { ThemeProvider } from "@mui/material/styles";
import MainRouter from "./router/router";
import { SnackbarProvider } from "notistack";
function App() {
    return (
        <ThemeProvider theme={GlobalTheme}>
            <SnackbarProvider
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                style={{ display: "flex", alignItems: "start" }}
                autoHideDuration={100000}
            >
                <MainRouter />
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default App;
