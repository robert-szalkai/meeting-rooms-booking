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
import { getMeetings, getMeetingsData } from "../../api/meetings";
import COLORS from "../../constants/CustomColors";
import getRoomStatus from "../../functions/GetRoomStatus";
import ChangeRoomModal from "./ChangeRoomModal";
import {iLeftSide, Meeting} from "../../interfaces/interfaces";
import Cookies from 'universal-cookie';
import Logo from "../../assets/images/DoctariLogo.png"
const TabletApp = () => {
    const cookies = new Cookies();
    const colorStates = [COLORS.GREEN, COLORS.YELLOW, COLORS.RED];
    const [meetingsData, setMeetingsData] = useState<iLeftSide>();
    const [meetings,setMeetings] = useState<Meeting[]>([])

    const { id } = useParams();

    const [selectedCardId, setSelectedCardId] = useState<string>();

    const [availability, setAvailability] = useState<number>(
        CONSTANTS.ROOM_AVAILABLE
    );
    const [time, setTime] = useState<number>(0);
    const [quickBookDone, setQuickBookDone] = useState<boolean>(false);
    const [isDurationOpen, setIsDurationOpen] = useState<boolean>(false);

    const [logoutModalOpen, setLogoutModalOpen] = useState<boolean>(false);

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
        const responseForRoomData = await getMeetingsData(cookies.get("roomId"));
        const responseForMeetings = await getMeetings(cookies.get("roomId"));
        if (responseForRoomData.status === 200) {
            setMeetingsData(responseForRoomData.data);
            setMeetings(responseForMeetings.data);
        }
    };
    useEffect(() => {
        meetData();
    }, []);

    useEffect(() => {
        const setRoomStatus = async () => {
            const allMeetings = await getMeetings(cookies.get("roomId"));
            const roomStatus = await getRoomStatus(allMeetings.data);
            setAvailability(roomStatus);
        };
        setRoomStatus();

        const interval = setInterval(() => {
            setTime(Date.now());
        }, CONSTANTS.INTERVAL_BACKGROUND_RESET);

        return () => clearInterval(interval);
    }, []);

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
                <Box
                    component="img"
                    sx={{ height: "50px", position:"absolute", marginTop:"10px", marginLeft:"10px" }}
                    src={Logo}
                ></Box>  {meetingsData && (
                    <LeftSide
                        meetings={meetings}
                        displayName={meetingsData?.displayName}
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
                            <ChangeRoomModal
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
                                        roomName={meetingsData?.displayName ? meetingsData?.displayName : ""}
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
