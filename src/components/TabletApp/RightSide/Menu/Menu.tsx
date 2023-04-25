import { Button, Box, Typography, Skeleton } from "@mui/material";
import React from "react";
import COLORS from "../../../../constants/CustomColors";

import QuickBook from "../QuickBook/QuickBook";
import { Link } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

interface iMenu {
    roomId: string;
    roomName: string;
    roomStatus: number;
}

const Menu = ({ roomId, roomName, roomStatus }: iMenu) => {
    const advancedBookLink = `/rooms/${roomId}/form`;

    const RoomStatusMessage = [
        "currently available",
        "Going to be in use soon",
        "Ocupied",
    ];
    const subText = [
        "Feel free to book a meeting",
        "Maybe you have enough time for a quick meeting",
        "A meeting is already in progress, please wait",
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
        >   <Box
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
                    <Typography variant="h6">{subText[roomStatus]}</Typography>
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
                    sx={{
                        borderRadius: "50px",
                        width: "200px",
                        textTransform: "none",
                        backgroundColor: COLORS.GREEN,
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        marginBottom: "50px",
                    }}
                >
                    {" "}
                    <CalendarMonthIcon />
                    <Typography fontWeight="bold">Advanced Book</Typography>
                </Button>
            </Link>
        </Box>
    );
};

export default Menu;
