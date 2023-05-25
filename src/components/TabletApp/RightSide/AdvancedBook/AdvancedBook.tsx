import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import dayjs, { Dayjs } from "dayjs";
import { useNavigate, useParams } from "react-router-dom";

import DateSelector from "./DateSelector";
import Participants from "./Participants";
import InputField from "./InputField";
import { getMeetingsByRoomId, addMeeting } from "../../../../api/meetings";
import { getParticipants } from "../../../../api/participants";
import { spawnToast } from "../../../../utils/Toast";
import {
    FormValidity,
    Meeting,
    Participant,
} from "../../../../interfaces/interfaces";
import CONSTANTS from "../../../../constants/Constants";
import { iAdvancedBook } from "../../../../interfaces/interfaces";

const AdvancedBook = ({ availability }: iAdvancedBook) => {
    const [validForm, setValidForm] = useState<FormValidity>({
        isNameValid: false,
        isDateValid: false,
        isStartValid: false,
        isEndValid: false,
        isOwnerValid: false,
    });
    const [meetingName, setMeetingName] = useState<string>("");
    const [meetingDescription, setMeetingDescription] = useState<string>("");
    const [dateSelectorDate, setDateSelectorDate] = useState<Dayjs>(dayjs());
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [allEmployees, setAllEmployees] = useState<Participant[]>([]);
    const [meetingParticipants, setMeetingParticipants] = useState<
        string[]
    >([]);
    const [meetingOwner, setMeetingOwner] = useState<Participant[]>([]);
    const [bookedMeetings, setBookedMeetings] = useState<Meeting[]>([]);
    const navigate = useNavigate();
    const roomId = window.location.pathname.split("/")[2];
    useEffect(() => {
        getParticipants().then((res) => {
            setAllEmployees(res);
        });
        getMeetingsByRoomId(Number.parseInt(roomId)).then((res: any[]) => {
            const meetings = res.map((re) => {
                return {
                    name: re.name,
                    description: re.description,
                    startTime: re.startTime,
                    endTime: re.endTime,
                    participants: re.participants,
                    id: re.id,
                };
            });
            console.log(meetings);
            setBookedMeetings(meetings);
        });
    }, []);

    const handleMeetingDate = (meetingDate: Dayjs) => {
        setDateSelectorDate(meetingDate);
    };

    const handleStartTime = (start_time: Dayjs) => {
        setStartTime(start_time.toString());
    };

    const handleEndTime = (end_time: Dayjs) => {
        setEndTime(end_time.toString());
    };

    const handleClickCancel = () => {
        navigate("../menu");
    };

    const handleValid = (propertyValue: boolean, key: string) => {
        setValidForm({ ...validForm, [key]: propertyValue });
    };

    const checkFormValid = (validForm: FormValidity) => {
        const values: boolean[] = Object.values(validForm);
        const valid = values.filter((val) => val === false);
        if (valid.length === 0) {
            return false;
        }
        return true;
    };

    const handleFormSubmit = (
        name: string,
        description: string,
        date: Dayjs,
        start: string,
        end: string,
        participants: Participant[],
        id: number
    ) => {
        const dateObj = dayjs(date);
        const startTime = dayjs(start);
        const endTime = dayjs(end);
        const meetingStartDate = dateObj
            .set("hour", startTime.get("hour"))
            .set("minute", startTime.get("minute"))
            .toString();

        const meetingEndDate = dateObj
            .set("hour", endTime.get("hour"))
            .set("minute", endTime.get("minute"))
            .toString();

        const participants_id = participants.map((participant) => {
            return participant.id;
        });
        try {
            alert(typeof roomId);
            addMeeting({
                name: name,
                description: description,
                startTime: meetingStartDate,
                endTime: meetingEndDate,
                participants: participants_id,
                roomId: Number.parseInt(roomId),
            });
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

    const { meetid } = useParams<string>();
    const id = Number(meetid);

    console.log("param meetid: ", meetid);
    return (
        <form
            onSubmit={() =>
                handleFormSubmit(
                    meetingName,
                    meetingDescription,
                    dateSelectorDate,
                    startTime,
                    endTime,
                    meetingOwner.concat(meetingParticipants),
                    id
                )
            }
        >
            <Grid
                container
                display="flex"
                flexDirection="row"
                rowGap={1}
                boxSizing="border-box"
                data-testid="advancedbook-container"
                paddingLeft={3}
                paddingRight={7}
                paddingTop={2}
            >
                <Grid item xs={12}>
                    <Typography variant="h5" fontWeight={"bold"}>
                        New meeting
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <InputField
                        inputLabelText="Meeting Name*"
                        placeholderText="Provide meeting name. Ex. Meet new people"
                        handleMeetingName={setMeetingName}
                        handleMeetingDescription={setMeetingDescription}
                        fieldTextValid={meetingName}
                        formValidationSetter={handleValid}
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputField
                        inputLabelText="Meeting Description"
                        placeholderText="Please provide a description of the meeting."
                        multilineSelect
                        handleMeetingName={setMeetingName}
                        handleMeetingDescription={setMeetingDescription}
                        formValidationSetter={handleValid}
                    />
                </Grid>
                <Grid item xs={12}>
                    <DateSelector
                        handleMeetingDate={handleMeetingDate}
                        handleStartTime={handleStartTime}
                        handleEndTime={handleEndTime}
                        fieldTextValid={{
                            dateValid: dateSelectorDate.toString(),
                            startValid: startTime,
                            endValid: endTime,
                        }}
                        formValidationDateSetter={handleValid}
                        formValidationStartSetter={handleValid}
                        formValidationEndSetter={handleValid}
                        bookedMeetings={bookedMeetings}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Participants
                        meetingParticipants={meetingParticipants}
                        allEmployees={allEmployees}
                        meetingOwner={meetingOwner}
                        handleMeetingParticipants={setMeetingParticipants}
                        handleMeetingOwner={setMeetingOwner}
                        fieldTextValid={{
                            meetingOwnerValid: meetingOwner,
                        }}
                        formValidationOwnerSetter={handleValid}
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
                                onClick={handleClickCancel}
                                variant="outlined"
                                color="inherit"
                                sx={{ maxWidth: 140 }}
                            >
                                Cancel
                            </Button>
                            <Button
                                sx={{ maxWidth: 140 }}
                                type="submit"
                                variant="contained"
                                color={
                                    CONSTANTS.BUTTON_COLOR[availability] as
                                        | "success"
                                        | "warning"
                                        | "error"
                                }
                                disabled={checkFormValid(validForm)}
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
