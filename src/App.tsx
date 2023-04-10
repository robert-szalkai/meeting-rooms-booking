import React from "react";
import "./App.css";
import { Box } from "@mui/material";
import Admin from "./Components/Admin/Admin";
import GlobalTheme from "./GlobalThemes/GlobalThemes";
import { ThemeProvider } from "@mui/material/styles";
import QuickBook from "./Components/TabletView/QuickBook";

function App() {
    return (
        <ThemeProvider theme={GlobalTheme}>
            <Box>
                <QuickBook />
            </Box>
        </ThemeProvider>
    );
}

export default App;
