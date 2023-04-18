import { Box,Container} from "@mui/system";
import React, { useEffect, useState } from "react";
import COLORS from "../../constants/CustomColors";
import LeftSide from "./LeftSide/LeftSide";
import RightSide from "./RightSide/RightSide";
import Grid from "@mui/material/Grid";
import {spawnToast} from "../../utils/Toast";
import {Typography} from "@mui/material";
const TabletApp = () => {
    const colorStates = [COLORS.GREEN, COLORS.YELLOW, COLORS.RED];

    const [availability, setAvailability] = useState(1);
    const [roomName, setRoomName] = useState("Focus Room");

  useEffect(() => {
    spawnToast("You have succeded","Your booking was made",true)
    spawnToast("Something went wrong","Your booking has not been made",false)
    }, [])
   
    return (
        <Grid sx={{backgroundColor:colorStates[availability]}} flexDirection="row"  container>
            <Grid  item xs={5}>
                <LeftSide roomName={roomName} />
            </Grid>
            <Grid  item xs={7}  >
            <RightSide  roomName={roomName} availability={availability} />
            </Grid>
        </Grid>
 
        
    );
};

export default TabletApp;
