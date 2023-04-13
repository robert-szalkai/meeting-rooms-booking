import React from "react";
import "./App.css";
import { Box } from "@mui/material";
import Admin from "./Components/Admin/Admin";
import GlobalTheme from "./GlobalThemes/GlobalThemes";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";

function App() {
    return (
        <ThemeProvider theme={GlobalTheme}>
            <SnackbarProvider
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                autoHideDuration={1000}
            >
                <Box>
                    <Admin />
                </Box>
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default App;
