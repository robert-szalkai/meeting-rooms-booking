import React, { useEffect, useState } from "react";
import { Grid, Typography, Box, Avatar } from "@mui/material";
import { getMeetingsData, getParticipants } from "../../../../api/getRequests";
import { useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import dayjs, { Dayjs } from "dayjs";

interface iMettingInfo {
    name: string;
    //description: string;
    start_time: string;
    end_time: string;
    participants_names: (string | undefined)[];
    meetings: {
        name: string;
        id: string;
        start_time: string;
        end_time: string;
        participants_id: [];
    }[];
}
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
    participants_id: [];
}

const MeetingInfo = ({
    name,
    start_time,
    end_time,
    participants_names,
    meetings,
}: iMettingInfo) => {
    const [participantsData, setParticipantsData] = useState<participantsID>();
    const [meetingsData, setMeetingsData] = useState<iMettingInfo>();
    const [meetingParticipants, setMeetingParticipants] = useState<
        string[] | undefined
    >([]);

    const [meetingData, setMeetingData] = useState<iMeetingData>();

    const { meetid } = useParams<string>();

    const getMeetingById = async (meetid: string): Promise<iMeetingData> => {
        const result = await axios.get(
            `http://localhost:3003/meetingInfo?id=${meetid}`
        );

        return result.data;
    };

    useEffect(() => {
        const _getMeetingById = async () => {
            if (meetid) await getMeetingById(meetid);
        };

        if (meetid) console.log("duhfiuehdwifue", getMeetingById(meetid));

        // setMeetingData(_getMeetingById)
    }, [meetid]);

    const getParticipantsData = async () => {
        const response = await getParticipants();
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

    const getMeetingsRoomData = async (): Promise<AxiosResponse> => {
        const response = await getMeetingsData();

        return response;
    };

    useEffect(() => {
        getMeetingsRoomData().then((response) => {
            setMeetingsData(response.data);
        });
    }, []);

    useEffect(() => {
        if (meetingsData) {
            const id = parseInt(meetid as string);
            console.log("meet data: ", meetingsData);
            setMeetingParticipants(meetingsData?.meetings[id]?.participants_id);
        }
    }, [meetingsData]);

    const getNames = (ids: string[]) => {
        return (
            participantsData?.participants
                .filter((participants) => ids.includes(participants.id))
                .map((value) => value.name) || []
        );
    };

    const persons = meetingsData?.meetings
        .filter((meeting) => meeting.id === meetid)
        .map((meeting) => getNames(meeting.participants_id));

    const getInitilas = () => {
        console.log("data persons", persons);
        const filteredata =
            // meetingsData?.meetings
            // .filter((meeting) => meeting.id === meetid)
            // .map((meeting) => getNames(meeting.participants_id))
            participantsData?.participants.map((e) => {
                return e.name
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
                    <Typography variant="body1">{persons?.[index]}</Typography>
                </Box>
            </Grid>
        ));
    };

    return (
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
                        <Typography variant="h4">
                            {meetingsData?.meetings
                                .filter((meeting) => meeting.id === meetid)
                                .map((meeting) => meeting.name)}
                        </Typography>
                        <Typography variant="h4">
                            Today,
                            {meetingsData?.meetings
                                .filter((meeting) => meeting.id === meetid)
                                .map((meeting) =>
                                    dayjs(meeting.start_time).format("HH:MM")
                                )}
                            -
                            {meetingsData?.meetings
                                .filter((meeting) => meeting.id === meetid)
                                .map((meeting) =>
                                    dayjs(meeting.end_time).format("HH:MM")
                                )}
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
