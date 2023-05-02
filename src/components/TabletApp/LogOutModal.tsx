import React, { FC } from "react";
import { Box, Typography, Modal, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ModalProps } from "../../interfaces/interfaces";

const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
};

const LogOutModal: FC<ModalProps> = ({ openModal, handleClose }) => {
    const navigate = useNavigate();
    return (
        <Box>
            <Modal open={openModal} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Log Out
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Are you sure you want to log out?
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            paddingRight: 5,
                        }}
                    >
                        <Button
                            onClick={() => {
                                navigate("/login");
                            }}
                            sx={{ marginTop: 5, maxWidth: "40%" }}
                            variant="outlined"
                            color="inherit"
                        >
                            Log Out
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default LogOutModal;
