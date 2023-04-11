import React from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import DateSelector from "./DateSelector";
import Participants from "./Participants";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const AdvancedBook = () => {
    return (
        <Box
            sx={{
                minWidth: 600,
                maxWidth: 600,
                minHeight: 500,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                backgroundColor: "white",
                marginLeft: "auto",
                borderTopLeftRadius: "10%",
                padding: 5,
                border: 2,
                borderColor: "gray",
                rowGap: 2,
            }}
        >
            <Typography variant="h5" fontWeight={"bold"}>
                New meeting
            </Typography>
            <TextField
                placeholder="Provide meeting name"
                variant="filled"
                label="Meeting name"
                sx={{ minWidth: "100%" }}
                InputProps={{ disableUnderline: true }}
            />
            <TextField
                placeholder="Provide meeting description"
                variant="filled"
                multiline
                rows={4}
                sx={{ minWidth: "100%" }}
                InputProps={{ disableUnderline: true }}
                label="Meeting description"
            />
            <DateSelector />
            <TextField
                placeholder="An employee from doctari group"
                variant="filled"
                sx={{ minWidth: "100%" }}
                InputProps={{ disableUnderline: true }}
                label="Meeting description"
            ></TextField>
            <Participants />
            <Box sx={{ display: "flex", marginLeft: "auto", gap: 2 }}>
                <Button variant="outlined" color="success">
                    Cancel
                </Button>
                <Button variant="contained" color="success">
                    <CalendarMonthIcon fontSize="small" />
                    Book
                </Button>
            </Box>
        </Box>
    );
};

export default AdvancedBook;
