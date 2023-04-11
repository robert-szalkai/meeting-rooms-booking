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
            }}
        >
            <Typography variant="h5" fontWeight={"bold"}>
                New meeting
            </Typography>
            <Typography paddingTop={2}>Meeting Name</Typography>
            <TextField
                placeholder="Provide meeting name"
                variant="filled"
                hiddenLabel
                size="small"
                sx={{ minWidth: "100%" }}
                InputProps={{ disableUnderline: true }}
            />
            <Typography paddingTop={2}>Meeting Description</Typography>
            <TextField
                placeholder="Provide meeting description"
                variant="filled"
                size="small"
                multiline
                rows={4}
                sx={{ minWidth: "100%" }}
                InputProps={{ disableUnderline: true }}
                hiddenLabel
            />
            <DateSelector />
            <Typography paddingTop={2}>Meeting owner</Typography>
            <TextField
                placeholder="An employee from doctari group"
                variant="filled"
                sx={{ minWidth: "100%" }}
                InputProps={{ disableUnderline: true }}
                hiddenLabel
                size="small"
            ></TextField>
            <Participants />
            <Box sx={{ display: "flex", marginLeft: "auto", gap: 2 }}>
                <Button
                    variant="outlined"
                    sx={{
                        height: 30,
                        borderRadius: 10,
                        color: "green",
                        borderColor: "green",
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        height: 30,
                        borderRadius: 10,
                        backgroundColor: "green",
                    }}
                >
                    <CalendarMonthIcon fontSize="small" />
                    Book
                </Button>
            </Box>
        </Box>
    );
};

export default AdvancedBook;
