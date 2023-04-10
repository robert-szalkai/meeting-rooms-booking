import React, { useState } from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

interface iLeftSide {
    roomName: string;
}

const LeftSide = ({ roomName }: iLeftSide) => {
    let currDate = new Date();
    let hoursMin;

    if (currDate.getMinutes() < 10) {
        hoursMin = currDate.getHours() + ":0" + currDate.getMinutes();
    } else {
        hoursMin = currDate.getHours() + ":" + currDate.getMinutes();
    }

    const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "short",
        year: "numeric",
    };

    const formattedDate: string = currDate.toLocaleDateString("en-US", options);
    const [time, setTime] = useState(hoursMin);

    return (
        <Box sx={{ width: "40%", height: "100%" }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    color: "white",
                    paddingLeft: 10,
                    paddingTop: 10,
                }}
            >
                <Box>
                    <Typography variant="h3">{roomName}</Typography>
                    <Typography variant="h2">{time}</Typography>
                    <Typography variant="h3">{formattedDate}</Typography>
                </Box>
            </Box>

            <Box></Box>
        </Box>
    );
};

export default LeftSide;
