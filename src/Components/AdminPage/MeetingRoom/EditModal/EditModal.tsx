import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const EditModal: React.FC<{}> = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const modalContent = (
        <Box
            sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
            }}
        >
            <Typography variant="h6" component="h2">
                Modal Title
            </Typography>
            <Typography variant="body2" component="p">
                Modal content goes here...
            </Typography>
        </Box>
    );

    return (
        <>
            <Button variant="contained" onClick={handleOpen}>
                wjdnke
            </Button>
            <Modal open={open} onClose={handleClose}>
                {modalContent}
            </Modal>
        </>
    );
};

export default EditModal;
