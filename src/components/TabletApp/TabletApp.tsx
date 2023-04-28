import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import dayjs from "dayjs";

import LeftSide from "./LeftSide/LeftSide";
import AdvancedBook from "./RightSide/AdvancedBook/AdvancedBook";
import MeetingInfo from "./RightSide/MeetingInfo/MeetingInfo";
import Menu from "./RightSide/Menu/Menu";
import CONSTANTS from "../../constants/Constants";
import { getMeetings, getMeetingsData } from "../../api/meetings";
import COLORS from "../../constants/CustomColors";
import getRoomStatus from "../../functions/GetRoomStatus";

interface iLeftSide {
    name: string | undefined;
    meetings: {
        name: string;
        id: string;
        start_time: string;
        end_time: string;
        participants_id: [];
    }[];
}

const TabletApp = () => {
    const colorStates = [COLORS.GREEN, COLORS.YELLOW, COLORS.RED];
    const [meetingsData, setMeetingsData] = useState<iLeftSide>();

    const [roomName, setRoomName] = useState("Focus Room");
    const { id } = useParams();

    const [selectedCardId, setSelectedCardId] = useState<string>();

    const [availability, setAvailability] = useState<number>(
        CONSTANTS.ROOM_AVAILABLE
    );
    const [time, setTime] = useState<number>(0);
    const [quickBookDone, setQuickBookDone] = useState<boolean>(false);
    const [isDurationOpen, setIsDurationOpen] = useState<boolean>(false);

    const onClickQuickBookGlobal = () => {
        setIsDurationOpen(true);
    };

    const handleSetSelectedCardId = (cardId: string) => {
        setSelectedCardId(cardId);
    };

    const handleQuickBookDone = () => {
        setQuickBookDone(true);
    };

    const meetData = async () => {
        const response = await getMeetingsData();
        if (response.status === 200) {
            setMeetingsData(response.data);
        }
    };
    useEffect(() => {
        meetData();
    }, []);

    useEffect(() => {
        const setRoomStatus = async () => {
            const allMeetings = await getMeetings();
            const roomStatus = await getRoomStatus(allMeetings);
            setAvailability(roomStatus);
        };
        setRoomStatus();

        const interval = setInterval(() => {
            setTime(Date.now());
        }, CONSTANTS.INTERVAL_BACKGROUND_RESET);

        return () => clearInterval(interval);
    }, [time, quickBookDone]);

    return (
        <Grid
            sx={{
                backgroundColor: colorStates[availability],
                transition: "background-color 1s ease",
            }}
            flexDirection="row"
            container
        >
            <Grid item xs={5}>
                {meetingsData && (
                    <LeftSide
                        meetings={meetingsData?.meetings}
                        name={meetingsData?.name}
                        availability={availability}
                        selectedCardId={selectedCardId as string}
                        onClickQuickBookGlobal={onClickQuickBookGlobal}
                    />
                )}
            </Grid>
            <Grid item xs={7}>
                <Box
                    sx={{
                        paddingTop: 10,
                        height: "100vh",
                        boxSizing: "border-box",
                    }}
                >
                    <Box
                        overflow={"auto"}
                        sx={{
                            paddingTop: 1,
                            paddingLeft: 4,
                            background: "white",
                            height: "100%",
                            borderRadius: "36px 0px 0px 0px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            boxSizing: "border-box",
                        }}
                    >
                        <Routes>
                            <Route
                                path="/:menu"
                                element={
                                    <Menu
                                        roomId={id ? id : ""}
                                        roomName={roomName}
                                        roomStatus={availability}
                                        handleQuickBookDone={
                                            handleQuickBookDone
                                        }
                                        isDurationOpen={isDurationOpen}
                                    />
                                }
                            />
                            <Route path="/form" element={<AdvancedBook />} />
                            <Route
                                path="/meetinginfo/:meetid"
                                element={
                                    <MeetingInfo
                                        setSelectedCardId={
                                            handleSetSelectedCardId
                                        }
                                    />
                                }
                            />
                            <Route
                                path="*"
                                element={<Navigate to="/selection" />}
                            />
                        </Routes>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default TabletApp;
