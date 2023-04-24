import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import dayjs from "dayjs";

import LeftSide from "./LeftSide/LeftSide";
import AdvancedBook from "./RightSide/AdvancedBook/AdvancedBook";
import MeetingInfo from "./RightSide/MeetingInfo/MeetingInfo";
import QuickBook from "./RightSide/QuickBook/QuickBook";
import COLORS from "../../constants/CustomColors";
import { getMeetings } from "../../api/getRequests";
import CONSTANTS from "../../constants/Constants";

const TabletApp = () => {
    const colorStates = [COLORS.GREEN, COLORS.YELLOW, COLORS.RED];

    const [availability, setAvailability] = useState<number>(0);
    const [roomName, setRoomName] = useState("Focus Room");
    const [time, setTime] = useState<number>(0);

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
    }, [time]);

    return (
        <Grid
            sx={{ backgroundColor: colorStates[availability] }}
            flexDirection="row"
            container
        >
            <Grid item xs={5}>
                <LeftSide roomName={roomName} availability={availability} />
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
                            <Route path="/form" element={<AdvancedBook />} />
                            <Route
                                path="/meetinginfo/:meetid"
                                element={<MeetingInfo />}
                            />
                            <Route
                                path="/quickbookglobal"
                                element={<QuickBook isDurationOpen />}
                            />
                            {/* {availability === 2 ? null : (
                                <Route
                                    path="/quickbookglobal"
                                    element={<QuickBook isDurationOpen />}
                                />
                            )} */}
                        </Routes>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default TabletApp;
