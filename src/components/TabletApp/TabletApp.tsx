import { Box, Container } from "@mui/system";
import React, { useState } from "react";
import COLORS from "../../constants/CustomColors";
import LeftSide from "./LeftSide/LeftSide";
import RightSide from "./RightSide/RightSide";
import Grid from "@mui/material/Grid";
import { Route, Routes, useParams } from "react-router-dom";
const TabletApp = () => {
    const colorStates = [COLORS.GREEN, COLORS.YELLOW, COLORS.RED];
    const { id } = useParams();
    const [availability, setAvailability] = useState(1);
    const [roomName, setRoomName] = useState("Focus Room");

    return (
        <Grid
            sx={{ backgroundColor: colorStates[availability] }}
            flexDirection="row"
            container
        >
            <Grid item xs={5}>
                <LeftSide roomName={roomName} />
            </Grid>
            <Routes>
                <Route
                    path="/form"
                    element={
                        <>
                            <Grid item xs={7}>
                                <RightSide
                                    componentToShow={2}
                                    roomName={roomName}
                                    availability={availability}
                                />{" "}
                            </Grid>
                        </>
                    }
                ></Route>
                <Route
                    path="/meetinginfo/:meetid"
                    element={
                        <>
                            <Grid item xs={7}>
                                <RightSide
                                    componentToShow={1}
                                    roomName={roomName}
                                    availability={availability}
                                />{" "}
                            </Grid>
                        </>
                    }
                ></Route>
            </Routes>
        </Grid>
    );
};

export default TabletApp;
