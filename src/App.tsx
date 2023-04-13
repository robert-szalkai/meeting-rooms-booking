import React from "react";
import "./App.css";
import { Box } from "@mui/material";
import Admin from "./components/Admin/Admin";
import GlobalTheme from "./context/GlobalThemes";
import { ThemeProvider } from "@mui/material/styles";
import TabletApp from "./components/TabletApp/TabletApp";

function App() {
    return (
        <ThemeProvider theme={GlobalTheme}>
            <TabletApp />
        </ThemeProvider>
    );
}

export default App;
