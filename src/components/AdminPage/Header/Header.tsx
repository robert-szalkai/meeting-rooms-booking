import { Box, Container, IconButton, Typography, Modal } from "@mui/material";
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Logo from "../../../assets/logo-doctari.png";
import { useState } from "react";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const Header = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleOpenModal = () => {
        setModalIsOpen(true);
    };

    const handleClose = () => {
        setModalIsOpen(false);
    };

    return (
        <Box
            display="flex"
            gap="50px"
            alignItems="center"
            marginBottom={20}
            marginTop={5}
        >
            <Box
                component="img"
                src={Logo}
                sx={{
                    height: "50px",
                }}
            />
            <Typography variant="h4">Meeting Rooms</Typography>
            <IconButton onClick={handleOpenModal}>
                <AddCircleOutlineIcon fontSize="large" />
            </IconButton>

            <Modal
                open={modalIsOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor
                        ligula.
                    </Typography>
                </Box>
            </Modal>
        </Box>
    );
};

export default Header;
