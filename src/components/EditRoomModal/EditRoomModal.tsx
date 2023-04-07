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

const EditRoomModal = ({
    display,
    handleClose,
    handleNameChange,
    handleDescriptionChange,
    updateEntry,
    oldName,
    oldDescription
}: {
    display: boolean;
    handleClose: any;
    handleNameChange: any;
    handleDescriptionChange: any;
    updateEntry: any;
    oldName: string;
    oldDescription: string;
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
                        Create Meeting Room
                    </Typography>
                </Box>
                <Box>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Name
                    </Typography>
                    <TextField
                        id="outlined-basic"
                        label="Please type meeting room name."
                        onChange={handleNameChange}
                        value={oldName}
                        variant="filled"
                        sx={{
                            width: 500,
                            paddingBottom: 5,
                        }}
                        InputProps={{
                            disableUnderline: true,
                        }}
                    />
                </Box>
                <Box>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Description
                    </Typography>
                    <TextField
                        id="outlined-basic"
                        label="Please type meeting room description."
                        variant="filled"
                        value={oldDescription}
                        onChange={handleDescriptionChange}
                        sx={{
                            width: 500,
                            paddingBottom: 5,
                        }}
                        InputProps={{
                            disableUnderline: true,
                        }}
                    />
                </Box>{" "}
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
                    <Button variant="outlined" color="error" onClick={() =>{
                        updateEntry();
                        handleClose();
                    }}>
                        Submit
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditRoomModal;
