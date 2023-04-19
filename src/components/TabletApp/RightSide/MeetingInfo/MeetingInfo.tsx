import React from "react";
import { Grid, Typography, Box, Avatar } from "@mui/material";

const MeetingInfo = () => {
    const meetingPersons = [
        "Stefan Rudareanu",
        "Andrei Cineva",
        "Cosmin Liuba",
        "Stefan Rudareanu",
        "Andrei Cineva",
        "Cosmin Liuba",
        "Stefan Rudareanu",
        "Andrei Cineva",
        "Cosmin Liuba",
        "Andrei Cineva",
        "Cosmin Liuba",
    ];
    const getInitilas = () => {
        const filteredata = meetingPersons.map((e) => {
            return e
                .match(/(\b\S)?/g)
                ?.join("")
                .toUpperCase();
        });

        return filteredata;
    };
    const mapersons = () => {
        return getInitilas().map((person,index) => (
            <Grid item xs={6}>
                <Box
                    sx={{
                        gap:"20px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                    }}
                >
                    <Avatar>{person}</Avatar>
                    <Typography variant="h6">{meetingPersons[index]}</Typography>
                </Box>
            </Grid>
        ));
    };
    return (
        <Grid padding={2} container direction={"row"} spacing={3}>
            <Grid item  xs={12}>
                <Grid container  direction={"row"} spacing={5}>
                    <Grid item xs={12}>
                       
                    </Grid>
                    <Grid item xs={12}>
                    <Typography variant="h4">Upcoming Meeting</Typography>
                        <Typography variant="h4">Today,15:30-16:30</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container direction={"row"} spacing={5}>
                    <Grid item xs={3}>
                        <Typography variant="h5">Participants</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid padding={1} overflow={"auto"} container height={"300px"} direction={"row"} spacing={2.3}>
            {mapersons()}
            </Grid>
            </Grid>
        </Grid>
    );
};

export default MeetingInfo;
