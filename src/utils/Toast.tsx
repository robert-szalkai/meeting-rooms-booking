import { enqueueSnackbar } from "notistack";
import ToastMessage from "./ToastMessage/ToastMessage";
import React from "react";

export const spawnToast = (toastData: {
    title: string;
    message: string;
    toastType: "success" | "error";
}) => {
    enqueueSnackbar(
        <ToastMessage title={toastData.title} message={toastData.message} />,
        {
            variant: toastData.toastType,
        }
    );
};
