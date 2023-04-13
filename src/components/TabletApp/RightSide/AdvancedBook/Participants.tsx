import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Participants = () => {
    return (
        <Box>
            <Typography paddingTop={2}>Participants</Typography>
            <TextField
                variant="filled"
                placeholder="Search participants by name"
                sx={{ minWidth: "190% " }}
                InputProps={{ disableUnderline: true }}
                hiddenLabel
                size="small"
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
