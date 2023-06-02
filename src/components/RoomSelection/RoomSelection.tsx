import React, { useState, useEffect } from "react";
import {Container, Box, Typography, Skeleton} from "@mui/material";

import RoomSelectionCards from "./RoomSelectionCards";
import { Meeting } from "../../interfaces/interfaces";
import { getRooms } from "../../api/rooms";
import COLORS from "../../constants/CustomColors";
import { MeetingRoomsData } from "../../interfaces/interfaces";
import getRoomStatus from "../../functions/GetRoomStatus";
import {getMeetings} from "../../api/meetings";
import dayjs from "dayjs";

export const RoomSelection = () => {
    const [roomSelectionData, setRoomSelection] =
        useState<MeetingRoomsData[]>();
    const getData = async () => {
        try {
            const result = await getRooms();
            for(let room of result) {
                if (room.id != undefined) {
                    const roomMeetings = await getMeetings(room.id);
                    const fixedMeetings: any[] = [];
                    roomMeetings.data.forEach((meeting: any) => {
                        meeting.start.dateTime = dayjs(meeting.start.dateTime).format();
                        meeting.end.dateTime = dayjs(meeting.end.dateTime).format();
                        fixedMeetings.push(meeting)
                    })
                    room.meetings = fixedMeetings;
                }
            }
            setRoomSelection(result)
        } catch (error) {
            console.log(error);
        }
    };
    const mapElements = () => {
        return roomSelectionData?.map((e, index) => (
            <RoomSelectionCards
                name={e.displayName}
                key={e.id}
                availability={
                    getRoomStatus(e.meetings as unknown as Meeting[]) as
                        | 0
                        | 1
                        | 2
                }
                capacity={Number(e.capacity)}
                description={e.description}
                id={e.id}
            />
        ));
    };
    useEffect(() => {
        getData();
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
                    {roomSelectionData ? mapElements() : (
                        <Box>
                        <Skeleton
                        sx={{ marginBottom: "30px" }}
                    variant="rectangular"
                    width={500}
                />
                <Skeleton variant="rectangular" width={300} height={300} />
        </Box>
    )}
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
