import { Box, IconButton, Modal } from "@mui/material";
import React from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import "./DeleteConfirmationModal.css";

type ConfirmationModalProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: () => void;
    roomTitle: string;
};

const DeleteConfirmationModal = ({
    open,
    onClose,
    onSubmit,
    roomTitle,
}: ConfirmationModalProps) => {
    return (
        <Modal data-testid='deletemodal' open={open} onClose={onClose}>
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
                <p>{`Please confirm that you want to remove meeting room ${roomTitle} from the list of available meeting rooms.`}</p>
                <p>This action will remove this meeting room forever.</p>
                <Box className="confirmation-modal-buttons-layout">
                    <button className="cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button data-testid='deleteelement' className="submit" onClick={onSubmit}>
                        Submit
                    </button>
                </Box>
            </Box>
        </Modal>
    );
};
export default DeleteConfirmationModal;
