import React, { useEffect, useState } from "react";

import COLORS from "../../constants/CustomColors";
import LeftSide from "./LeftSide/LeftSide";
import { Box, Grid } from "@mui/material";
import dayjs from "dayjs";

import { Navigate, Route, Routes, useParams } from "react-router-dom";

import AdvancedBook from "./RightSide/AdvancedBook/AdvancedBook";
import MeetingInfo from "./RightSide/MeetingInfo/MeetingInfo";
import { spawnToast } from "../../utils/Toast";
import { Typography } from "@mui/material";
import QuickBook from "./RightSide/QuickBook/QuickBook";

import { getMeetings, getMeetingsData } from "../../api/getRequests";
import Menu from "./RightSide/Menu/Menu";

import CONSTANTS from "../../constants/Constants";

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

    const [meetName, setMeetName] = useState("alabala");
    const [startTime, setStartTime] = useState("15:30");
    const [endTime, setEndTime] = useState("16:30");
    const [participantsName, setParticipantsName] = useState<string[]>([]);

    const [selectedCardId, setSelectedCardId] = useState<string>();

    const [availability, setAvailability] = useState<number>(
        CONSTANTS.ROOM_AVAILABLE
    );
    const [time, setTime] = useState<number>(0);
    const [quickBookDone, setQuickBookDone] = useState<boolean>(false);

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
        const isMeetingRightNow = async () => {
            const allMeetings = await getMeetings();
            let inMeetingRightNow = false;
            let willFollow = false;

            Object.values(allMeetings).forEach((meeting) => {
                const diffInMinutesStartTime = dayjs(meeting.start_time).diff(
                    dayjs(),
                    "minute",
                    true
                );

                const diffInMinutesEndTime = dayjs(meeting.end_time).diff(
                    dayjs(),
                    "minute",
                    true
                );

                if (diffInMinutesStartTime < 0 && diffInMinutesEndTime > 0) {
                    inMeetingRightNow = true;
                }

                if (
                    diffInMinutesStartTime > 0 &&
                    diffInMinutesStartTime <= CONSTANTS.MAX_QUICKBOOK_DURATION
                ) {
                    willFollow = true;
                }
            });
            if (inMeetingRightNow) {
                setAvailability(CONSTANTS.MEETING_IN_PROGRESS);
                return;
            }
            if (willFollow) {
                setAvailability(CONSTANTS.MEETING_WILL_FOLLOW);
                return;
            }
            setAvailability(CONSTANTS.ROOM_AVAILABLE);
        };
        isMeetingRightNow();

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
                                path="/menu"
                                element={
                                    <Menu
                                        roomId={id ? id : ""}
                                        roomName={roomName}
                                        roomStatus={availability}
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
                            {availability === 2 ? null : (
                                <Route
                                    path="/quickbookglobal"
                                    element={
                                        <QuickBook
                                            isDurationOpen
                                            handleQuickBookDone={
                                                handleQuickBookDone
                                            }
                                        />
                                    }
                                />
                            )}
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
