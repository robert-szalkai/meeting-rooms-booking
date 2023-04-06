import { Box, Typography, IconButton, Modal } from "@mui/material";
import React from "react";
import Logo from "../../../assets/images/logo.png";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <Box
            display="flex"
            gap="60px"
            alignItems="center"
            sx={{ paddingBottom: "100px" }}
        >
            <Box
                component="img"
                sx={{
                    height: "50px",
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                    paddingLeft: "70px",
                }}
                src={Logo}
            />

            <Typography variant="h3"> Meeting Rooms</Typography>
            <IconButton onClick={handleOpenModal}>
                <AddCircleOutlineIcon fontSize="large" />
            </IconButton>
            <IconButton sx={{ marginLeft: "auto" }}>
                {""}
                <LogoutIcon fontSize="large" />
            </IconButton>
            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <Box>Modal Content Goes Here</Box>
            </Modal>
        </Box>
    );
};

export default Header;
