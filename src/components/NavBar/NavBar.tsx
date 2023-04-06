import React from "react";
import Box from "@mui/material/Box";
import { blue } from "@mui/material/colors";
import Logo from "./../../assets/images/DoctariGroup-Logo.png";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const NavBar = ({handleAdd}: {handleAdd:Function}) => {
    return (
        <Box
            sx={{
                padding: "50px",
                width: "95%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "50px",
                }}
            >
                <Box
                    component="img"
                    src={Logo}
                    sx={{
                        height: "75px",
                    }}
                />
                <h1>Meeting Rooms</h1>
                <AddBoxOutlinedIcon
                    sx={{
                        width: "50px",
                        height: "50px",
                    }}

					onMouseDown={event => handleAdd()}
                />
            </Box>
            <LogoutOutlinedIcon
			 sx={{
				width: "50px",
				height: "50px",
			}} />
        </Box>
    );
};

export default NavBar;
