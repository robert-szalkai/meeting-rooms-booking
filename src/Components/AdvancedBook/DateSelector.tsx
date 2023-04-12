import React from "react";
import { Grid, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimeField } from "@mui/x-date-pickers";
import InputField from "./InputField";
const DateSelector = () => {
    return (
        <Grid container columnSpacing={2}>
            <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                <Grid item xs={4}>
                    <DatePicker
                        label="Day"
                        slotProps={{
                            textField: {
                                variant: "filled",
                                sx: { minWidth: "100%", paddingTop: 0.8 },
                                size: "small",
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TimeField
                        variant="filled"
                        format="hh:mm"
                        InputProps={{ disableUnderline: true }}
                        hiddenLabel
                    >
                        <InputField
                            inputLabelText="Start"
                            placeholderText="HH:MM"
                        />
                    </TimeField>
                </Grid>
                <Grid item xs={4}>
                    <TimeField
                        format="HH:mm"
                        variant="filled"
                        sx={{ minWidth: "100%", paddingTop: 0.8 }}
                        label="End"
                        size="small"
                    />
                </Grid>
            </LocalizationProvider>
        </Grid>
    );
};

export default DateSelector;
