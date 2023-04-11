import { Box } from "@mui/system";
import React, { useState } from "react";
import LeftSide from "./LeftSide/LeftSide";
import RightSide from "./RightSide/RightSide";

const TabletApp = () => {
    const colorStates = ["#008435", "#BCA900", "#DD6764"];

    const [availability, setAvailability] = useState(1);
    const [roomName, setRoomName] = useState("Focus Room");

    return (
        <Box
            sx={{
                display: "flex",
                background: `${colorStates[availability]}`,
                width: "100%",
                height: "100%",
            }}
        >
            <LeftSide roomName={roomName} />
            <RightSide roomName={roomName} availability={availability} />
        </Box>
    );
};

export default TabletApp;
