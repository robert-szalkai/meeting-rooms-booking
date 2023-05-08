import React from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import WeekPicker from "./weekPicker";
import MomentUtils from "@date-io/moment";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme();

function App() {
  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils} locale="en">
          <WeekPicker />
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
