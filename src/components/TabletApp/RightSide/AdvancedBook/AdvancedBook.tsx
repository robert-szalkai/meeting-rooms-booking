import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import dayjs, { Dayjs } from "dayjs";

import DateSelector from "./DateSelector";
import Participants from "./Participants";
import InputField from "./InputField";
import { getParticipants } from "../../../../api/getRequests";
import { addMeeting } from "../../../../api/MeetingApi";
import { spawnToast } from "../../../../utils/Toast";

interface Participant {
    name: string;
    id: number;
    available: boolean;
    image: string;
}

const getHour = (time: Dayjs) => {
    return time.hour();
};
const getMinute = (time: Dayjs) => {
    return time.minute();
};

const AdvancedBook = () => {
    const [meetingName, setMeetingName] = useState<string>("");
    const [meetingDescription, setMeetingDescription] = useState<string>("");
    const [dateSelectorDate, setDateSelectorDate] = useState<string>("");
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [allEmployees, setAllEmployees] = useState<Participant[]>([]);
    const [meetingParticipants, setMeetingParticipants] = useState<
        Participant[]
    >([]);
    const [meetingOwner, setMeetingOwner] = useState<Participant[]>([]);

    useEffect(() => {
        getParticipants().then((res) => {
            setAllEmployees(res);
        });
    }, []);

    const handleMeetingDate = (meetingDate: Dayjs) => {
        setDateSelectorDate(meetingDate.toString());
    };

    const handleStartTime = (start_time: Dayjs) => {
        setStartTime(start_time.toString());
    };

    const handleEndTime = (end_time: Dayjs) => {
        setEndTime(end_time.toString());
    };

    const handleFormSubmit = (
        name: string,
        description: string,
        date: string,
        start: string,
        end: string,
        participants: Participant[]
    ) => {
        const dateObj = dayjs(date);
        const startDate = dayjs(start);
        const endDate = dayjs(end);
        console.log(endDate);
        const meetingStartDate = dateObj
            .set("hour", getHour(startDate))
            .set("minute", getMinute(startDate));

        const meetingEndDate = dateObj
            .set("hour", getHour(endDate))
            .set("minute", getMinute(endDate));

        const participants_id = participants.map((participant) => {
            return participant.id;
        });
        try {
            addMeeting(
                name,
                description,
                meetingStartDate,
                meetingEndDate,
                participants_id
            );
            spawnToast({
                title: "You have succeded",
                message: "Your booking was made",
                toastType: "success",
            });
        } catch (error) {
            spawnToast({
                title: "Something went wrong",
                message: "Your booking has not been made",
                toastType: "error",
            });
        }
    };

    return (
        <form
            onSubmit={() =>
                handleFormSubmit(
                    meetingName,
                    meetingDescription,
                    dateSelectorDate,
                    startTime,
                    endTime,
                    meetingOwner.concat(meetingParticipants)
                )
            }
        >
            <Grid
                container
                display="flex"
                flexDirection="row"
                rowGap={3}
                boxSizing="border-box"
                data-testid="advancedbook-container"
                paddingLeft={2}
                paddingRight={5}
                paddingTop={2}
            >
                <Grid item xs={12}>
                    <Typography variant="h5" fontWeight={"bold"}>
                        New meeting
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <InputField
                        inputLabelText="Meeting Name"
                        placeholderText="Provide meeting name"
                        handleMeetingName={setMeetingName}
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputField
                        inputLabelText="Meeting Description"
                        placeholderText="Provide meeting description"
                        multilineSelect
                        handleMeetingDescription={setMeetingDescription}
                    />
                </Grid>
                <Grid item xs={12}>
                    <DateSelector
                        handleMeetingDate={handleMeetingDate}
                        handleStartTime={handleStartTime}
                        handleEndTime={handleEndTime}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Participants
                        meetingParticipants={meetingParticipants}
                        allEmployees={allEmployees}
                        meetingOwner={meetingOwner}
                        handleMeetingParticipants={setMeetingParticipants}
                        handleMeetingOwner={setMeetingOwner}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Grid
                        container
                        sx={{
                            display: "flex",
                            marginLeft: "auto",
                        }}
                    >
                        <Box
                            marginLeft={"auto"}
                            display="flex"
                            gap={2}
                            paddingBottom={2}
                        >
                            <Button
                                variant="contained"
                                color="success"
                                sx={{ maxWidth: 140 }}
                            >
                                Cancel
                            </Button>
                            <Button
                                sx={{ maxWidth: 140 }}
                                type="submit"
                                variant="contained"
                                color="success"
                            >
                                <CalendarMonthIcon fontSize="small" />
                                Book
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
};

export default AdvancedBook;
