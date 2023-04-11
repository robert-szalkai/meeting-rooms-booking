import React from "react";
import { Box, TextField } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Participants = () => {
    return (
        <Box>
            <TextField
                variant="filled"
                placeholder="Search participants by name"
                sx={{ minWidth: "190% " }}
                InputProps={{ disableUnderline: true }}
                label="Participants"
            ></TextField>
            <Box display={"inline"}>
                <AccountCircleIcon />
                <AccountCircleIcon />
                <AccountCircleIcon />
                <AccountCircleIcon />
            </Box>
        </Box>
    );
};

export default Participants;
