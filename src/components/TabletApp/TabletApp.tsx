import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import COLORS from "../../constants/CustomColors";
import LeftSide from "./LeftSide/LeftSide";
import Grid from "@mui/material/Grid";
import { Route, Routes, useParams } from "react-router-dom";
import AdvancedBook from "./RightSide/AdvancedBook/AdvancedBook";
import MeetingInfo from "./RightSide/MeetingInfo/MeetingInfo";
import {spawnToast} from "../../utils/Toast";
import {Typography} from "@mui/material";
const TabletApp = () => {
    const colorStates = [COLORS.GREEN, COLORS.YELLOW, COLORS.RED];
    const { id } = useParams();
    const [availability, setAvailability] = useState(1);
    const [roomName, setRoomName] = useState("Focus Room");
  useEffect(() => {
    spawnToast("You have succeded","Your booking was made",true)
    spawnToast("Something went wrong","Your booking has not been made",false)
    }, [])
    return (
        <Grid
            sx={{ backgroundColor: colorStates[availability] }}
            flexDirection="row"
            container
        >
            <Grid item xs={5}>
                <LeftSide roomName={roomName} />
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
                        overflow={'auto'}
                        sx={{
                            paddingTop:1,
                            paddingLeft:4,
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
                                element={<MeetingInfo />} />
                        </Routes>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default TabletApp;
