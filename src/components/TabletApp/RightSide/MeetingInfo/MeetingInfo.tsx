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
    participants_id: string[] | undefined;
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
            `http://localhost:3003/meetingInfo/${meetid}`
        );

        return result.data;
    };

    // useEffect(() => {
    //     const _getMeetingById = async () => {
    //         if (meetid) await getMeetingById(meetid);
    //     };

    //     if (meetid) console.log("duhfiuehdwifue", getMeetingById(meetid));

    //     // setMeetingData(_getMeetingById)
    // }, [meetid]);

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

    const getNames = (ids: string[] | undefined) => {
        return (
            participantsData?.participants
                .filter((participants) => ids?.includes(participants.id))
                .map((value) => value.name) || []
        );
    };

    const persons = meetingsData?.meetings
        .filter((meeting) => meeting.id === meetid)
        .map((meeting) => getNames(meeting.participants_id));

    const personsById = getNames(meetingData?.participants_id);

    // aici e ce trebuie  AICIIIIIIIIIIII

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
    }, []);

    useEffect(() => {
        console.log("sasasasas", meetingData);
    }, [meetingData]);

    //pana aici

    const getInitilas = () => {
        console.log("data persons", persons);
       
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
                        <Typography variant="h4">
                            {/* {meetingsData?.meetings
                                .filter((meeting) => meeting.id === meetid)
                                .map((meeting) => meeting.name)} */}
                            {meetingData.name}
                        </Typography>
                        <Typography variant="h4">
                            Today,
                            {/* {meetingsData?.meetings
                                .filter((meeting) => meeting.id === meetid)
                                .map((meeting) =>
                                    dayjs(meeting.start_time).format("HH:MM")
                                )} */}
                            {dayjs(meetingData.start_time).format("HH:MM")}-
                            {/* {meetingsData?.meetings
                                .filter((meeting) => meeting.id === meetid)
                                .map((meeting) =>
                                    dayjs(meeting.end_time).format("HH:MM")
                                )} */}
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
                            The Terno is a modular light and sound system
                            designed for stage and recording applications,
                            providing an intuitive on-stage
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    ) : (
        <Typography variant="h4">Loading...</Typography>
    );
};

export default MeetingInfo;
