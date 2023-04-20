import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

interface iToastMessage {
    title: string;
    message: string;
}

const ToastMessage = ({ title, message }: iToastMessage) => {
    return (
        <Box>
            <Typography sx={{ fontWeight: "bold" }}>{title}</Typography>
            <Typography>{message}</Typography>
        </Box>
    );
};

export default ToastMessage;
