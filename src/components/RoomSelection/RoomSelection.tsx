import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Card, Divider } from "@mui/material";
import RoomSelectionCards from "./RoomSelectionCards";
import { iRoomCards } from "../../interfaces/interfaces";
import { getAllRooms } from "../../api/RoomAPI";
import COLORS from "../../constants/CustomColors";
export const RoomSelection = () => {
    const [roomSelectionData, setRoomSelection] = useState<iRoomCards[]>();
    const getRooms = async () => {
        try {
            const data = await getAllRooms();
            setRoomSelection(data);
        } catch (error) {
            console.log(error);
        }
    };
    const mapElements = () => {
        return roomSelectionData?.map((e) => (
            <RoomSelectionCards
                name={e.name}
                key={e.id}
                availability={e.availability}
                capacity={e.capacity}
                description={e.description}
                id={e.id}
            />
        ));
    };
    useEffect(() => {
        getRooms();
    }, []);
    return (
        <Box>
            <Box
                component="img"
                sx={{
                    width: "100%",
                    height: "100vh",
                    position: "absolute",
                    zIndex: "-1000",
                }}
                src={require("../../assets/images/doctarigorup.png")}
            />
            <Container
                maxWidth="xl"
                sx={{
                    paddingTop: "60px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    height: "100vh",
                    alignItems: "center",
                    overflowY: "auto",
                }}
            >
                <Box
                    sx={{
                        width: "80%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        flexWrap: "wrap",
                        height: "100%",
                        gap: "30px",
                    }}
                >
                    {roomSelectionData && mapElements()}
                </Box>
                <Box
                    sx={{
                        width: "20%",
                        height: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "flex-start",
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            gap: "2px",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                        }}
                    >
                        <Box
                            sx={{
                                backgroundColor: COLORS.SUCCESS,
                                clipPath: "circle(15.0% at 50% 54%)",
                                height: "80px",
                                width: "50px",
                            }}
                        />
                        <Box sx={{ width: "200px" }}>
                            <Typography variant="h6">Room free</Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                        }}
                    >
                        <Box
                            sx={{
                                backgroundColor: COLORS.WARNING,
                                clipPath: "circle(15.0% at 50% 54%)",
                                height: "80px",
                                width: "50px",
                            }}
                        />
                        <Box sx={{ width: "200px" }}>
                            <Typography variant="h6">
                                Meeting incoming
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                        }}
                    >
                        <Box
                            sx={{
                                backgroundColor: COLORS.ERROR,
                                clipPath: "circle(15.0% at 50% 54%)",
                                height: "80px",
                                width: "50px",
                            }}
                        />
                        <Box sx={{ width: "200px" }}>
                            <Typography variant="h6">
                                Ongoing meeting
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};
export default RoomSelection;
