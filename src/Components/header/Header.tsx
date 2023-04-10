import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import Logo from "../../assets/images/MicrosoftTeams-image.png";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import AddIcon from "@mui/icons-material/Add";
const Header = () => {
    return (
        <Box
            display={"flex"} 
            flexDirection={"row"}
            gap="50px"
            maxHeight="100px"
            width={"100%"}
        >
            <Box sx={{ display: "flex", flexDirection: "row", gap: "20px" }}>
                <Box component="img" src={Logo} height="50px" />

                <Typography variant="h4">Meeting Rooms</Typography>
                <IconButton>
                    <AddIcon />
                </IconButton>
            </Box>
            <Box flexGrow={1} />
            <Box>
                <IconButton>
                    <DoDisturbIcon />
                </IconButton>
            </Box>
        </Box>
    );
};
export default Header;
