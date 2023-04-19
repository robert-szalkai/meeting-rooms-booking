import { enqueueSnackbar } from "notistack";
import ToastMessage from "./ToastMessage/ToastMessage";
import React from "react";

export const spawnToast = (
    title: string,
    message: string,
    successful: boolean
) => {
    if (successful)
        enqueueSnackbar(<ToastMessage title={title} message={message} />, {
            variant: "success",
        });
    else
        enqueueSnackbar(<ToastMessage title={title} message={message} />, {
            variant: "error",
        });
};
