import React, { useState } from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import QuickBookGlobal from "../../TabletView/QuickBook/QuickBookGlobal";

interface iLeftSide {
    roomName: string;
    availability: number;
    quickBookAvaible?: number;
}

const LeftSide = ({ roomName, availability, quickBookAvaible }: iLeftSide) => {
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
    const [showQuickBookButton, setShowQuickBookButton] = useState(true);

    if (availability === 2 || quickBookAvaible === 0)
        setShowQuickBookButton(false);

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
                {showQuickBookButton ? (
                    <QuickBookGlobal
                        roomName={roomName}
                        availability={availability}
                        quickBookAvaible={1}
                    />
                ) : null}
            </Box>

            <Box></Box>
        </Box>
    );
};

export default LeftSide;
