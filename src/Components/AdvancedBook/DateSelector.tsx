import React from "react";
import { Grid, TextField, MenuItem } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const hours = [
    { value: 8, label: "08:00" },
    { value: 9, label: "09:00" },
    { value: 10, label: "10:00" },
    { value: 11, label: "11:00" },
    { value: 12, label: "12:00" },
    { value: 13, label: "13:00" },
    { value: 14, label: "14:00" },
    { value: 15, label: "15:00" },
    { value: 16, label: "16:00" },
    { value: 17, label: "17:00" },
    { value: 18, label: "18:00" },
];

const DateSelector = () => {
    const date = new Date();
    let currentHour = date.getHours();
    return (
        <Grid container columnSpacing={1}>
            <Grid item xs={4}>
                <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Day"
                        slotProps={{
                            textField: {
                                variant: "filled",
                                InputProps: { disableUnderline: true },
                                sx: { minWidth: "100%", paddingTop: 0.8 },
                            },
                        }}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={4}>
                <TextField
                    required
                    type="time"
                    variant="filled"
                    sx={{ minWidth: "100%", paddingTop: 0.8 }}
                    InputProps={{ disableUnderline: true }}
                    label="Start"
                >
                    {hours
                        .filter((crHour) => {
                            return crHour.value >= currentHour;
                        })
                        .map((hour) => (
                            <MenuItem key={hour.value} value={hour.value}>
                                {hour.label}
                            </MenuItem>
                        ))}
                </TextField>
            </Grid>
            <Grid item xs={4}>
                <TextField
                    type="time"
                    variant="filled"
                    sx={{ minWidth: "100%", paddingTop: 0.8 }}
                    InputProps={{ disableUnderline: true }}
                    label="End"
                    size="medium"
                >
                    {hours
                        .filter((crHour) => {
                            return crHour.value > currentHour;
                        })
                        .map((hour) => (
                            <MenuItem key={hour.value} value={hour.value}>
                                {hour.label}
                            </MenuItem>
                        ))}
                </TextField>
            </Grid>
        </Grid>
    );
};

export default DateSelector;
