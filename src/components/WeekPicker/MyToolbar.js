import React from "react";

import { createStyles } from "@material-ui/styles";
import { withStyles, Toolbar, Button } from "@material-ui/core";
import moment from "moment";

export const styles = theme =>
  createStyles({
    toolbar: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center",
      height: 100,
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.primary.main
          : theme.palette.background.default
    },
    label: {
      color:
        theme.palette.type === "light"
          ? theme.palette.primary.contrastText
          : theme.palette.background.default
    }
  });

const MyToolbar = ({ setOpenView, date }) => {
  const today = moment(date);

  var weeknumber = today.week();
  var year = today.year();
  var month = today.format("MMM");

  const fromDate = today.startOf("week").date();
  const toDate = today.endOf("week").date();

  return (
    <Toolbar className="MuiToolbar-root MuiToolbar-regular MuiPickersToolbar-toolbar MuiPickersDatePickerRoot-toolbar MuiToolbar-gutters">
      <Button onClick={e => setOpenView("year")}>
        <span className="MuiPickersToolbar-label">
          <h6 className="MuiTypography-root MuiPickersToolbarText-toolbarTxt MuiTypography-subtitle1">
            {year} Week {weeknumber}
          </h6>
        </span>
        <span className="MuiTouchRipple-root" />
      </Button>
      <Button onClick={e => setOpenView("date")}>
        <span className="MuiPickersToolbar-label">
          <h4 className="MuiTypography-root MuiPickersToolbarText-toolbarTxt MuiPickersToolbarText-toolbarBtnSelected MuiTypography-h4 MuiTypography-alignCenter">
            {month} {fromDate} to {toDate}
          </h4>
        </span>
        <span className="MuiTouchRipple-root" />
      </Button>
    </Toolbar>
  );
};

export default withStyles(styles, { name: "MuiPickersToolbar" })(MyToolbar);
