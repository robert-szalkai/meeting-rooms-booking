import React, { useEffect, useState } from "react";
import { Box, Typography, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";

import COLORS from "../../constants/CustomColors";
import { iRoomCards } from "../../interfaces/interfaces";
import Cookies from "universal-cookie";
export const RoomSelectionCards = ({
    availability,
    description,
    id,
    name,
    capacity,
}: iRoomCards) => {
    const cookies = new Cookies();
    const colors = { 0: COLORS.SUCCESS, 1: COLORS.WARNING, 2: COLORS.ERROR };
    const navigate = useNavigate();
    const [color, setColor] = useState<string>();
    const handleClick = (id: string) => {
        cookies.set('roomId', id.toString());
        navigate(`/rooms/${id}/menu`);
    };
    useEffect(() => {
        setColor(colors[availability]);
    });
    const RoomStatusMessage = [
        "Ready for booking",
        "Meeting starting soon",
        "Meeting in session",
    ];
    return (
        <Card
            onClick={() => {
                if (id) handleClick(id);
            }}
            sx={{
                height: "140px",
                width: "300px",
                borderRadius: "10px",
                boxShadow:
                    " rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: "100px",
                    backgroundColor: "#5C4AE6",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Typography variant="h6" sx={{ color: "white" }}>
                    {name}
                </Typography>
            </Box>

            <Box
                sx={{
                    width: "100%",
                    height: "100px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <Typography>
                    {RoomStatusMessage[availability]}
                </Typography>
            </Box>

            <Box
                sx={{
                    width: "100%",
                    height: "100px",
                    display: "flex",
                    marginTop: "-30%",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                }}
            >
            </Box>
            <Box
                sx={{
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        clipPath: "circle(25.0% at 49% 91%)",
                        height: "100%",
                        backgroundColor: `${color}`,
                        width: "40px",
                    }}
                ></Box>
            </Box>
        </Card>
    );
};
export default RoomSelectionCards;
