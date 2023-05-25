import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import { IconButton } from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import LeftSide from "./LeftSide/LeftSide";
import AdvancedBook from "./RightSide/AdvancedBook/AdvancedBook";
import MeetingInfo from "./RightSide/MeetingInfo/MeetingInfo";
import Menu from "./RightSide/Menu/Menu";
import CONSTANTS from "../../constants/Constants";
import {
    getMeetings,
    getMeetingsByRoomId,
    getMeetingsData,
} from "../../api/meetings";
import COLORS from "../../constants/CustomColors";
import getRoomStatus from "../../functions/GetRoomStatus";
import LogOutModal from "./LogOutModal";
import { iLeftSide } from "../../interfaces/interfaces";
import { getRoomById } from "../../api/rooms";

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

    const [logoutModalOpen, setLogoutModalOpen] = useState<boolean>(false);
    const roomId = window.location.pathname.split("/")[2];

    const handleClose = () => {
        setLogoutModalOpen(false);
    };
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
        const room = await getRoomById(Number.parseInt(roomId));
        const response = await getMeetingsData(Number.parseInt(roomId));
        if (response.status === 200) {
            setMeetingsData(response.data);
        }
        setRoomName(room.data.name);
    };

    useEffect(() => {
        meetData();
    }, []);

    useEffect(() => {
        const setRoomStatus = async () => {
            const allMeetings = await getMeetingsByRoomId(
                Number.parseInt(roomId)
            );
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
                        name={roomName}
                        availability={availability}
                        selectedCardId={selectedCardId as string}
                        onClickQuickBookGlobal={onClickQuickBookGlobal}
                    />
                )}
            </Grid>
            <Grid item xs={7}>
                <Box
                    display={"flex"}
                    justifyContent={"flex-end"}
                    paddingTop={2}
                    paddingRight={2}
                ></Box>
                <Box
                    sx={{
                        paddingTop: 5,
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
                        <Box marginLeft="auto" sx={{ paddingRight: 2 }}>
                            <IconButton
                                onClick={() => setLogoutModalOpen(true)}
                            >
                                <LogoutRoundedIcon sx={{ color: "black" }} />
                            </IconButton>
                            <LogOutModal
                                openModal={logoutModalOpen}
                                handleClose={handleClose}
                            />
                        </Box>
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
                                        availability={availability}
                                    />
                                }
                            />
                            <Route
                                path="/form"
                                element={
                                    <AdvancedBook availability={availability} />
                                }
                            />
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
                        </Routes>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default TabletApp;
