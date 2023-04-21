import { enqueueSnackbar } from "notistack";
import ToastMessage from "./ToastMessage/ToastMessage";
import React from "react";

export const spawnToast = (
    title: string,
    message: string,
    toastType: "success" | "error"
) => {
        enqueueSnackbar(<ToastMessage title={title} message={message} />, {
            variant: toastType})
};
