import { Box, Container } from "@mui/system";

import React, { useEffect, useState } from "react";

import COLORS from "../../constants/CustomColors";
import LeftSide from "./LeftSide/LeftSide";
import Grid from "@mui/material/Grid";

import { Route, Routes, useParams } from "react-router-dom";
import AdvancedBook from "./RightSide/AdvancedBook/AdvancedBook";
import MeetingInfo from "./RightSide/MeetingInfo/MeetingInfo";
import { spawnToast } from "../../utils/Toast";
import { Typography } from "@mui/material";

import { getMeetingsData } from "../../api/getRequests";

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
    const [availability, setAvailability] = useState(1);
    const [roomName, setRoomName] = useState("Focus Room");
    const { id } = useParams();

    const [meetName, setMeetName] = useState("alabala");
    const [startTime, setStartTime] = useState("15:30");
    const [endTime, setEndTime] = useState("16:30");
    const [participantsName, setParticipantsName] = useState<string[]>([]);

    function onChangeMeetData(
        name: string,
        start: string,
        end: string,
        participants: (string | undefined)[]
    ) {
        setMeetName(name);
        setStartTime(start);
        setEndTime(end);
        setParticipantsName(
            participants.filter((p) => p !== undefined) as string[]
        );
    }

    useEffect(() => {
        spawnToast("You have succeded", "Your booking was made", true);
        spawnToast(
            "Something went wrong",
            "Your booking has not been made",
            false
        );
    }, []);

    const meetData = async () => {
        const response = await getMeetingsData();
        if (response.status === 200) {
            setMeetingsData(response.data);
        }
    };
    useEffect(() => {
        meetData();
    }, []);

    return (
        <Grid
            sx={{ backgroundColor: colorStates[availability] }}
            flexDirection="row"
            container
        >
            <Grid item xs={5}>
                {meetingsData && (
                    <LeftSide
                        meetings={meetingsData?.meetings}
                        name={meetingsData?.name}
                        onChangeMeetData={onChangeMeetData}
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
                            <Route path="/form" element={<AdvancedBook />} />
                            <Route
                                path="/meetinginfo/:meetid"
                                element={
                                    <MeetingInfo
                                        name={meetName}
                                        start_time={startTime}
                                        end_time={endTime}
                                        participants_names={participantsName}
                                        meetings={[]}
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
