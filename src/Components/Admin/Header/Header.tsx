import React from "react";
import { Typography, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
import Cards from "../MettingRoom/Cards";
interface iHeader {
    handleClickForm: () => void;
}
const Header = ({ handleClickForm }: iHeader) => {
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
            <LogoutIcon fontSize="large" sx={{ marginLeft: "auto" }} />
        </Box>
    );
};

export default Header;
