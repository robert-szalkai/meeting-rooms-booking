import { Button, Box, Typography, Skeleton, colors } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import QuickBook from "../QuickBook/QuickBook";
import CONSTANTS from "../../../../constants/Constants";
import COLORS from "../../../../constants/CustomColors";

interface iMenu {
    roomId: string;
    roomName: string;
    roomStatus: number;
    handleQuickBookDone: () => void;
    isDurationOpen?: boolean;
    availability: number;
}

const Menu = ({
    roomId,
    roomName,
    roomStatus,
    handleQuickBookDone,
    isDurationOpen = false,
    availability,
}: iMenu) => {
    const advancedBookLink = `/rooms/${roomId}/form`;

    const RoomStatusMessage = [
        "currently available.",
        "going to be in use soon.",
        "ocupied.",
    ];
    const subText = [
        "Feel free to book a meeting.",
        "Maybe you have enough time for a quick meeting.",
        "A meeting is already in progress, please wait.",
    ];

    return (
        <Box
            sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "20%",
            }}
        >
            {" "}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingBottom: "30px",
                }}
            >
                {roomName ? (
                    <Box>
                        <Typography variant="h4">
                            {roomName} is {RoomStatusMessage[roomStatus]}
                        </Typography>
                        <Typography variant="h6">
                            {subText[roomStatus]}
                        </Typography>
                    </Box>
                ) : (
                    <Box>
                        <Skeleton
                            sx={{ marginBottom: "30px" }}
                            variant="rectangular"
                            width={500}
                        />
                        <Skeleton variant="rectangular" width={300} />
                    </Box>
                )}
            </Box>
            <Link to={advancedBookLink} style={{ textDecoration: "none" }}>
                <Button
                    variant="contained"
                    color={
                        CONSTANTS.BUTTON_COLOR[availability] as
                            | "success"
                            | "warning"
                            | "error"
                    }
                    sx={{ textTransform: "none", marginBottom: 3 }}
                >
                    <CalendarMonthIcon />
                    <Typography>Advanced Book</Typography>
                </Button>
            </Link>
            <QuickBook
                availability={availability}
                isDurationOpen={isDurationOpen}
                handleQuickBookDone={handleQuickBookDone}
            />
        </Box>
    );
};

export default Menu;
