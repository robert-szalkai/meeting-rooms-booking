import React, { useEffect, useState } from "react";
import {Grid, Typography, Box, Avatar, Skeleton} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";

import {
    iMeetingData,
    iMeetingInfo,
} from "../../../../interfaces/interfaces";
import COLORS from "../../../../constants/CustomColors";
import Cookies from "universal-cookie";

const MeetingInfo = ({ setSelectedCardId }: iMeetingInfo) => {
    const cookies = new Cookies();
    const meetid = cookies.get("meetId");
    const roomId = cookies.get("roomId")
    const [meetingData, setMeetingData] = useState<iMeetingData>();

    const getMeetingById = async (meetid: string): Promise<iMeetingData> => {
        const result = await axios.get(
            `http://10.152.20.113:4000/msgraph/meetingroom/${roomId}/event/${meetid}`
        );
        console.log(result)
        return result.data;
    };



    useEffect(() => {

    }, []);
    useEffect(() => {
        const _getMeetingData = async () => {
            getMeetingData();
        };

        _getMeetingData();
    }, [meetid]);

    useEffect(() => {
        setSelectedCardId(meetid as string);
    }, [meetid]);

    const getNames = (participants: { emailAddress: { name: string; address: string } }[] | undefined) => {
        let names: string[] = [];
        if(participants!== undefined)
        for(const participant of participants){
            names.push(participant.emailAddress.name)
        }
        return names;
    };

    const personsById = getNames(meetingData?.attendees);

    const getMeetingData = async () => {
        if (meetid) {
            const response = await getMeetingById(meetid);
            setMeetingData(response);
        }
    };


    const getInitilas = () => {
        const filteredata = personsById.map((e) => {
            return e
                .match(/(\b\S)?/g)
                ?.join("")
                .toUpperCase();
        });

        return filteredata;
    };

    const mapersons = () => {
        return getInitilas()?.map((person, index) => (
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
                    <Avatar
                        sx={{
                            backgroundColor: COLORS.PURPLE,
                            height: 35,
                            width: 35,
                        }}
                    >
                        <Typography fontSize={17}>{person}</Typography>
                    </Avatar>
                    <Typography variant="body1">
                        {personsById?.[index]}
                    </Typography>
                </Box>
            </Grid>
        ));
    };

    return meetingData ? (
        <Grid
            height={"100vh"}
            padding={2}
            container
            direction={"row"}
            spacing={1}
            paddingLeft={6}
            overflow={"none"}
        >
            <Grid item xs={12}>
                <Grid container direction={"row"} spacing={0}>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={12}>
                        <Typography variant="h4">{meetingData.subject}</Typography>
                        <Typography variant="h6">
                            Today,{" "}
                            {dayjs(meetingData.start.dateTime).add(3,"h").format("HH:mm")} -{" "}
                            {dayjs(meetingData.end.dateTime).add(3,"h").format("HH:mm")}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container direction={"row"} >
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
                    spacing={2}
                    marginTop={-5}
                    marginLeft={-2.8}
                >
                    {mapersons()}
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container direction={"row"}>
                    <Grid item xs={3}  marginLeft={1}>
                        <Typography variant="h5">Description</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid padding={0.5} container direction={"row"} marginTop={-5}>
                    <Grid item xs={12} marginLeft={1}>
                        <div dangerouslySetInnerHTML={{ __html: meetingData.body.content }} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    ) : (
        <Skeleton variant="rectangular" width={300} height={300} />
    );
};

export default MeetingInfo;
