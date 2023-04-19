import React from "react";
import { Grid, Typography, Box, Avatar } from "@mui/material";
interface iMettingInfo{
    persons:string;
    descriptin:string;
    start_time:string;
    end_time:string;
}

const MeetingInfo = () => {
    const meetingPersons = [
        "Stefan Rudareanu",
        "Andrei Cineva",
        "Cosmin Liuba",
        "Andrei Toba Daniel",
        "Andrei Cineva",
        "Cosmin Liuba",
        "Stefan Rudareanu",
        "Andrei Cineva",
        "Cosmin Liuba",
        "Andrei Cineva",
        "Cosmin Liuba",
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
        return getInitilas().map((person, index) => (
            <Grid item xs={4}>
                <Box
                    sx={{
                        gap: "20px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                    }}
                >
                    <Avatar>{person}</Avatar>
                    <Typography variant="body1">
                        {meetingPersons[index]}
                    </Typography>
                </Box>
            </Grid>
        ));
    };
    return (
        <Grid height={"100%"}  padding={1} container direction={"row"} spacing={1}>
            <Grid item xs={12}>
                <Grid container direction={"row"} spacing={5}>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={12}>
                        <Typography variant="h4">Upcoming Meeting</Typography>
                        <Typography variant="h4">Today,15:30-16:30</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container direction={"row"}>
                    <Grid item xs={3}>
                        <Typography variant="h5">Participants</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid
                    padding={1}
                    flexWrap={"wrap"}
                    container
                    direction={"row"}
                    spacing={2.3}
                >
                    {mapersons()}
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container direction={"row"}>
                    <Grid item xs={3}>
                        <Typography variant="h5">Description</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid padding={0.5} container direction={"row"}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">
                            The Terno is a modular light and sound system
                            designed for stage and recording applications,
                            providing an intuitive on-stage interface for both
                            technical and non-technical personnel. With features
                            such as redundant power supply for maximum
                            reliability, easy transportability, and dozens of
                            mounting options, the Terno is perfect for any live
                            event. Product Features: - Modular design makes
                            setup quick and simple. - 60 W amplifier delivers
                            quality sound with clear, defined mid frequencies. -
                            8 channels (2 each of omni/ambient/speaker 1/2)
                            provide ample sound coverage for larger venues. -
                            Front panel aux input lets you link music or audio
                            from other sources. - Portable, lightweight design
                            makes set up quick and easy. - Durable aluminum
                            housing with PVC trim frame provides years of use. -
                            RoHS compliant.
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default MeetingInfo;
