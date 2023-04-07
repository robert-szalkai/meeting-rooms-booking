import React, { useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import axios from "axios";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    p: 4,
    borderRadius: "5px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
};

const DeleteRoomModal = ({
    display,
    handleClose,
    deleteCardHandler,
}: {
    display: boolean;
    handleClose: any;
    deleteCardHandler: any;
}) => {
    return (
        <Modal
            open={display}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            hideBackdrop
        >
            <Box sx={style}>
                <Box
                    sx={{
                        paddingBottom: "50px",
                    }}
                >
                    <Typography
                        id="modal-modal-title"
                        variant="h4"
                        component="h2"
                    >
                        Are you sure you want to delete this room?
                    </Typography>
                </Box>
                <Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            width: "100%",
                        }}
                    >
                        <Button
                            sx={{ marginRight: 2 }}
                            onClick={handleClose}
                            variant="contained"
                            color="error"
                        >
                            Cancel
                        </Button>
                        <Button variant="outlined" color="error"
                        onClick={()=>{
                            deleteCardHandler();
                            handleClose();
                        }}>
                            Delete
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default DeleteRoomModal;
