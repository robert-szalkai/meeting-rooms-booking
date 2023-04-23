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

const TabletApp = () => {
    const colorStates = [COLORS.GREEN, COLORS.YELLOW, COLORS.RED];

    const [availability, setAvailability] = useState<number>(0);
    const [roomName, setRoomName] = useState("Focus Room");

    useEffect(() => {
        const isMeetingRightNow = async () => {
            const allMeetings = await getMeetings();
            let inMeetingRightNow = false;
            let willFollow = false;

            Object.values(allMeetings).map((meeting) => {
                const diffInMinutesStartTime =
                    dayjs(meeting.start_time).diff(dayjs()) / 60000;

                const diffInMinutesEndTime =
                    dayjs(meeting.end_time).diff(dayjs()) / 60000;

                if (diffInMinutesStartTime < 0 && diffInMinutesEndTime > 0) {
                    console.log("finish in: ", diffInMinutesEndTime);
                    inMeetingRightNow = true;
                    setAvailability(2);
                } else if (!inMeetingRightNow) {
                    if (
                        diffInMinutesStartTime > 0 &&
                        diffInMinutesStartTime <= 45
                    ) {
                        console.log("start in: ", diffInMinutesStartTime);
                        willFollow = true;
                        setAvailability(1);
                    } else if (!willFollow) {
                        setAvailability(0);
                    }
                }
            });
        };

        isMeetingRightNow();
    }, []);

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
                        </Routes>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default TabletApp;
