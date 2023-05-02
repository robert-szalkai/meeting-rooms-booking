import { Box, IconButton, Modal } from "@mui/material";
import React from "react";

import "../DeleteConfirmationModal/DeleteConfirmationModal.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { ConfirmationModalProps } from "../../../interfaces/interfaces";

const LogoutConfirmationModal = ({
    open,
    onClose,
    onSubmit,
}: ConfirmationModalProps) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box className="confirmation-modal">
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        //alignItems: "left",
                        width: "100%",
                    }}
                >
                    <h2>Confirm Action</h2>

                    <IconButton sx={{ marginLeft: "auto" }} onClick={onClose}>
                        <HighlightOffIcon />
                    </IconButton>
                </Box>
                <p>{"Are you sure you want to log out?"}</p>
                <Box className="confirmation-modal-buttons-layout">
                    <button className="cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="submit" onClick={onSubmit}>
                        Log out
                    </button>
                </Box>
            </Box>
        </Modal>
    );
};
export default LogoutConfirmationModal;
