import React from "react";
import "./App.css";
import GlobalTheme from "./context/GlobalThemes";
import { ThemeProvider } from "@mui/material/styles";
import MainRouter from "./router/router";

function App() {
    return (
        <ThemeProvider theme={GlobalTheme}>
          <MainRouter/>
        </ThemeProvider>
    );
}

export default App;
