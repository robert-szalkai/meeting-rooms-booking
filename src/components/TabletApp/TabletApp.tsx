import React, { useEffect, useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";

import LeftSide from "./LeftSide/LeftSide";
import Menu from "./RightSide/Menu/Menu";
import AdvancedBook from "./RightSide/AdvancedBook/AdvancedBook";
import MeetingInfo from "./RightSide/MeetingInfo/MeetingInfo";
import COLORS from "../../constants/CustomColors";
import { getRoomById } from "../../api/getRequests";

const TabletApp = () => {
    const colorStates = [COLORS.GREEN, COLORS.YELLOW, COLORS.RED];

    const { id } = useParams();

    const [availability, setAvailability] = useState(0);
    const [roomName, setRoomName] = useState("");

    useEffect(() => {
        if (id !== undefined)
            getRoomById(parseInt(id)).then((response) => {
                setRoomName(response.data.name);
                setAvailability(response.data.state);
            });
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
                            <Route
                                path="/menu"
                                element={
                                    <Menu
                                        RoomName={roomName}
                                        RoomStatus={availability}
                                    />
                                }
                            />
                            <Route path="/form" element={<AdvancedBook />} />
                            <Route
                                path="/meetinginfo/:meetid"
                                element={<MeetingInfo />}
                            />
                        </Routes>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default TabletApp;
