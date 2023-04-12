import { Box } from "@mui/system";
import React, { useState } from "react";
import COLORS from "../../constants/CustomColors";
import LeftSide from "./LeftSide/LeftSide";
import RightSide from "./RightSide/RightSide";

const TabletApp = () => {
    const colorStates = [COLORS.GREEN, COLORS.YELLOW, COLORS.RED];

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
