import React from "react";
import { enqueueSnackbar } from "notistack";
import { Box } from "@mui/material";

interface ToastProps {
    message: string;
    errorCode: number;
}
export default function SimpleSnackbar({ message, errorCode }: ToastProps) {
    const computeType = () => {
        if (errorCode >= 200 && errorCode < 300) return "success";
        if (errorCode >= 400 && errorCode < 600) return "error";
    };
    enqueueSnackbar(message, {
        variant: computeType(),
        preventDuplicate: true,
    });
    return <Box></Box>;
}
 {/* 
            This is and exaple of implementation for the Toast
            <Toast message="no" errorCode={400} />
            <Toast message="yes" errorCode={200} /> */}