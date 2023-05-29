import React, { useEffect, useState } from "react";
import { Grid, Typography, Box, Avatar } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import dayjs, { Dayjs } from "dayjs";
import { useParams } from "react-router-dom";

import { getParticipantsIdName } from "../../../../api/participants";
import {
    iMeetingData,
    iMeetingInfo,
    participantsID,
} from "../../../../interfaces/interfaces";
import Error from "./NotFoundPage/NotFoundPage";
import COLORS from "../../../../constants/CustomColors";
import Cookies from "universal-cookie";

const MeetingInfo = ({ setSelectedCardId }: iMeetingInfo) => {
    const cookies = new Cookies();
    const meetid = cookies.get("meetId");
    const [participantsData, setParticipantsData] = useState<participantsID>();
    const [meetingParticipants, setMeetingParticipants] = useState<
        string[] | undefined
    >([]);

    const [meetingData, setMeetingData] = useState<iMeetingData>();

    const getMeetingById = async (meetid: string): Promise<iMeetingData> => {
        const result = await axios.get(
            `http://localhost:4000/msgraph/meetingroom/${cookies.get("roomId")}/event/${meetid}`
        );
        console.log(result)
        return result.data;
    };

    const getParticipantsData = async () => {
        const response = await getParticipantsIdName();
        setParticipantsData(response);
    };

    useEffect(() => {
        const _getParticipants = async () => {
            await getParticipantsData();
        };

        _getParticipants();
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
            marginTop={3}
            overflow={"none"}
        >
            <Grid item xs={12}>
                <Grid container direction={"row"} spacing={0}>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={12}>
                        <Typography variant="h4">{meetingData.subject}</Typography>
                        <Typography variant="h6">
                            Today,{" "}
                            {dayjs(meetingData.startTime).format("HH:MM")} -{" "}
                            {dayjs(meetingData.endTime).format("HH:MM")}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container direction={"row"} marginTop={-10}>
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
                    marginTop={-20}
                    marginLeft={-2.8}
                >
                    {mapersons()}
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container direction={"row"}>
                    <Grid item xs={3} marginTop={-10} marginLeft={1}>
                        <Typography variant="h5">Description</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid padding={0.5} container direction={"row"} marginTop={-20}>
                    <Grid item xs={12} marginLeft={1}>
                        <div dangerouslySetInnerHTML={{ __html: meetingData.body.content }} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    ) : (
        <Error />
    );
};

export default MeetingInfo;
