import React, { useEffect, useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";

import LeftSide from "./LeftSide/LeftSide";
import AdvancedBook from "./RightSide/AdvancedBook/AdvancedBook";
import MeetingInfo from "./RightSide/MeetingInfo/MeetingInfo";
import QuickBook from "./RightSide/QuickBook/QuickBook";
import COLORS from "../../constants/CustomColors";
import { spawnToast } from "../../utils/Toast";

const TabletApp = () => {
    const colorStates = [COLORS.GREEN, COLORS.YELLOW, COLORS.RED];

    const [availability, setAvailability] = useState(1);
    const [roomName, setRoomName] = useState("Focus Room");
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
                            {availability === 2 ? null : (
                                <Route
                                    path="/quickbookglobal"
                                    element={<QuickBook isDurationOpen />}
                                />
                            )}
                        </Routes>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default TabletApp;
