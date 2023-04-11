import React from "react";
import "./App.css";
import { Box } from "@mui/material";
import Admin from "./Components/Admin/Admin";
import GlobalTheme from "./GlobalThemes/GlobalThemes";
import { ThemeProvider } from "@mui/material/styles";
import TabletApp from "./Components/TabletApp/TabletApp";

function App() {
    return (
        <ThemeProvider theme={GlobalTheme}>
            {/* <TabletApp /> */}
            <Admin />
        </ThemeProvider>
    );
}

export default App;
