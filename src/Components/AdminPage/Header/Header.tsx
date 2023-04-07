import React from "react";
import { Box, Typography, IconButton, Modal } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useState } from "react";

const Header = () => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <Box
            display="flex"
            gap="50px"
            alignItems="center"
            paddingLeft="50px"
            paddingBottom="70px"
        >
            <Box
                component="img"
                sx={{
                    height: "50px",
                }}
                alt="loading.."
                src={require("../../../assets/Images/logo.png")}
            />
            <Typography variant="h4">Meeting Rooms</Typography>
            <IconButton onClick={handleOpenModal}>
                <AddCircleOutlineIcon
                    className="iconButton"
                    fontSize="large"
                    sx={{ color: "black" }}
                />
            </IconButton>

            <IconButton
                onClick={handleOpenModal}
                sx={{ color: "black", marginLeft: "auto", marginRight: "20px" }}
            >
                <ExitToAppIcon className="iconExitButton" fontSize="large" />
            </IconButton>
            <Modal open={showModal} onClose={handleCloseModal}>
                <Box></Box>
            </Modal>
        </Box>
    );
};

export default Header;
