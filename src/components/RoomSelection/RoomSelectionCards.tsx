import React, { useEffect, useState } from "react";
import { Box, Typography, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";

import COLORS from "../../constants/CustomColors";
import { iRoomCards } from "../../interfaces/interfaces";

export const RoomSelectionCards = ({
    availability,
    description,
    id,
    name,
    capacity,
}: iRoomCards) => {
    const colors = {
        free: COLORS.SUCCESS,
        booked: COLORS.ERROR,
        coming: COLORS.WARNING,
    };
    const navigate = useNavigate();
    const [color, setColor] = useState<string>();
    const handleClick = (id: number) => {
        navigate(`/rooms/${id}`);
    };
    useEffect(() => {
        setColor(colors[availability]);
    });
    return (
        <Card
            onClick={() => {
                if (id) handleClick(id);
            }}
            sx={{
                height: "200px",
                width: "400px",
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
                <Typography variant="h4" sx={{ color: "white" }}>
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
                    flexDirection: "column",
                }}
            >
                <Box sx={{ width: "100%", height: "30px" }}>
                    <Typography paddingLeft={2} variant="subtitle1">
                        Capacity: {capacity}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        maxHeight: "50px",
                        overflow: "hidden",
                    }}
                >
                    <Typography paddingLeft={2} variant="subtitle1">
                        Description:{" "}
                        {description && description.length > 68
                            ? description.slice(0, 68) + "..."
                            : description}
                    </Typography>
                </Box>
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
