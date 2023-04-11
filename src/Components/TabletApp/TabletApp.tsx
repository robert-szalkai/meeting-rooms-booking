import { Box } from "@mui/system";
import React, { useState } from "react";
import LeftSide from "./LeftSide/LeftSide";
import RightSide from "./RightSide/RightSide";

const TabletApp = () => {
    const colorStates = ["#008435", "#BCA900", "#DD6764"];

    const [availability, setAvailability] = useState(0);
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
            <LeftSide
                roomName={roomName}
                availability={availability}
                quickBookAvaible={1}
            />
            <RightSide
                roomName={roomName}
                availability={availability}
                quickBookAvaible={0}
            />
        </Box>
    );
};

export default TabletApp;
