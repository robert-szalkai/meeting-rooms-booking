import { Modal } from "@mui/material";
import React from "react";
import "./DeleteConfirmationModal.css";

type ConfirmationModalProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: () => void;
    roomTitle: string;
};

export const DeleteConfirmationModal = ({
    open,
    onClose,
    onSubmit,
    roomTitle,
}: ConfirmationModalProps) => {
    return (
        <Modal open={open} onClose={onClose}>
            <div className="confirmation-modal">
                <h2>Confirm Action</h2>
                <p>{`Please confirm that you want to remove meeting room ${roomTitle} from the list of available meeting rooms.`}</p>
                <p>This action will remove this meeting room forever.</p>
                <div className="confirmation-modal-buttons-layout">
                    <button className="cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="submit" onClick={onSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </Modal>
    );
};
