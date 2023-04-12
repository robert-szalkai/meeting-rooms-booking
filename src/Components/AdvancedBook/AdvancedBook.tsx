import React from "react";
import { Box, TextField, Typography, Button, InputLabel } from "@mui/material";
import DateSelector from "./DateSelector";
import Participants from "./Participants";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InputField from "./InputField";
const AdvancedBook = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            rowGap={2}
            boxSizing="border-box"
            data-testid="advancedbook-container"
        >
            <Typography variant="h5" fontWeight={"bold"}>
                New meeting
            </Typography>
            <InputField
                inputLabelText="Meeting Name"
                placeholderText="Provide meeting name"
            />
            <InputField
                inputLabelText="Meeting Description"
                placeholderText="Provide meeting description"
                multilineSelect
            />
            <DateSelector />
            <InputField
                inputLabelText="Meeting Owner"
                placeholderText="An employee from doctari group "
            />
            <Participants />
            <Box
                sx={{
                    display: "flex",
                    marginLeft: "auto",
                    gap: 2,
                }}
            >
                <Button variant="contained" color="success">
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
