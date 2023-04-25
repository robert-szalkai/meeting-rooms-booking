import React, { useEffect, useState } from "react";
import { Grid, Typography, Box, Avatar } from "@mui/material";
import {
    getMeetingsData,
    getParticipantsIdName,
} from "../../../../api/getRequests";
import { useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import dayjs, { Dayjs } from "dayjs";

interface participantsID {
    participants: {
        id: string;
        name: string;
    }[];
}

interface iMeetingData {
    name: string;
    id: string;
    start_time: string;
    end_time: string;
    participants_id: string[] | undefined;
    description: string;
}

interface iMeetingInfo {
    setSelectedCardId: (meetid: string) => void;
}

const MeetingInfo = ({ setSelectedCardId }: iMeetingInfo) => {
    const [participantsData, setParticipantsData] = useState<participantsID>();
    const [meetingParticipants, setMeetingParticipants] = useState<
        string[] | undefined
    >([]);

    const [meetingData, setMeetingData] = useState<iMeetingData>();
    const { meetid } = useParams<string>();
    const [meetId, setMeetId] = useState<string>();

    const getMeetingById = async (meetid: string): Promise<iMeetingData> => {
        const result = await axios.get(
            `http://localhost:3003/meetingInfo/${meetid}`
        );

        return result.data;
    };

    const getParticipantsData = async () => {
        const response = await getParticipantsIdName();
        if (response.status === 200) {
            setParticipantsData(response.data);
        }
    };

    useEffect(() => {
        const _getParticipants = async () => {
            await getParticipantsData();
        };

        _getParticipants();
    }, []);

    useEffect(() => {
        console.log("param: ", meetid);

        setSelectedCardId(meetid as string);
    }, [meetid]);

    const getNames = (ids: string[] | undefined) => {
        return (
            participantsData?.participants
                .filter((participants) => ids?.includes(participants.id))
                .map((value) => value.name) || []
        );
    };

    const personsById = getNames(meetingData?.participants_id);

    const getMeetingData = async () => {
        if (meetid) {
            const response = await getMeetingById(meetid);
            setMeetingData(response);
            console.log("duhfiuehdwifue", response);
        }
    };

    useEffect(() => {
        const _getMeetingData = async () => {
            getMeetingData();
        };

        _getMeetingData();
    }, [meetid]);

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
                    <Avatar>{person}</Avatar>
                    <Typography variant="body1">
                        {personsById?.[index]}
                    </Typography>
                </Box>
            </Grid>
        ));
    };

    return meetingData ? (
        <Grid
            height={"100%"}
            padding={1}
            container
            direction={"row"}
            spacing={1}
        >
            <Grid item xs={12}>
                <Grid container direction={"row"} spacing={5}>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={12}>
                        <Typography variant="h4">{meetingData.name}</Typography>
                        <Typography variant="h4">
                            Today,
                            {dayjs(meetingData.start_time).format("HH:MM")}-
                            {dayjs(meetingData.end_time).format("HH:MM")}
                        </Typography>
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
                            {meetingData.description}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    ) : (
        <Typography variant="h4">Meeting not found...</Typography>
    );
};

export default MeetingInfo;
