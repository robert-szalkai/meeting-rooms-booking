import React from "react";
import { Typography, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";

import { iHeader } from "../../../interfaces/interfaces";

const Header = ({ handleClickForm, handleLogoutModal }: iHeader) => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "108px",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "60px",
            }}
        >
            {" "}
            <Box
                component="img"
                sx={{ height: "70px" }}
                src={require("../../../assets/images/DoctariLogo.png")}
            ></Box>
            <Typography variant="h4">Meeting Rooms</Typography>
            <IconButton
                onClick={() => {
                    handleClickForm();
                }}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1.5px solid black",
                }}
            >
                <AddIcon fontSize="large" />
            </IconButton>
            <IconButton
                sx={{ marginLeft: "auto" }}
                onClick={() => {
                    handleLogoutModal();
                }}
            >
                <LogoutIcon fontSize="large" />
            </IconButton>
        </Box>
    );
};

export default Header;
