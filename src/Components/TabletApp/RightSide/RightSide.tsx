import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

const availabilityMessages = [
    "currently available",
    "going to be in use soon",
    "being used",
];

interface iRightSide {
    roomName: string;
    availability: number;
}

const RightSide = ({ roomName, availability }: iRightSide) => {
    return (
        <Box
            sx={{
                paddingTop: 10,
                height:"100vh",
                boxSizing:"border-box"
            }}
        >
            <Box
                sx={{
                    background: "white",
                    height: "100%",
                    borderRadius: "36px 0px 0px 0px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Box>
                    <Typography variant="h4">
                        {roomName} is {availabilityMessages[availability]}.
                    </Typography>
                </Box>
               
            </Box>
        </Box>
    );
};

export default RightSide;
