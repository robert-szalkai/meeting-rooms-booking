import React, {useState, useEffect} from "react";
import {Box, Typography, Button, Grid} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import dayjs, {Dayjs} from "dayjs";
import {useNavigate, useParams} from "react-router-dom";

import DateSelector from "./DateSelector";
import Participants from "./Participants";
import InputField from "./InputField";
import {getMeetings, addMeeting} from "../../../../api/meetings";
import {getParticipants} from "../../../../api/participants";
import {spawnToast} from "../../../../utils/Toast";
import {
    FormValidity,
    Meeting,
    Participant,
} from "../../../../interfaces/interfaces";
import CONSTANTS from "../../../../constants/Constants";
import {iAdvancedBook} from "../../../../interfaces/interfaces";
import Cookies from "universal-cookie";

const AdvancedBook = ({availability}: iAdvancedBook) => {
    const [validForm, setValidForm] = useState<FormValidity>({
        isNameValid: false,
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
        Participant[]
    >([]);
    const [meetingOwner, setMeetingOwner] = useState<Participant[]>([]);
    const [bookedMeetings, setBookedMeetings] = useState<Meeting[]>([]);
    const navigate = useNavigate();

    const cookies = new Cookies();
    useEffect(() => {
        try {
            getParticipants().then((res) => {
                setAllEmployees(res);
            });
        } catch (error) {
            spawnToast({
                title: "Something went wrong",
                message: "Could not get list of participants!",
                toastType: "error",
            });
            console.log(error);
        }

        try {
            getMeetings(cookies.get("roomId")).then((res) => {
                setBookedMeetings(res.data);
            });
        } catch (error) {
            spawnToast({
                title: "Something went wrong",
                message: "Could not get list of meetings!",
                toastType: "error",
            });
            console.log(error);
        }
    }, []);

    const handleMeetingDate = (meetingDate: Dayjs) => {
        setDateSelectorDate(meetingDate);
    };

    const handleStartTime = (startTime: Dayjs) => {
        setStartTime(startTime.toString());
    };

    const handleEndTime = (endTime: Dayjs) => {
        setEndTime(endTime.toString());
    };

    const handleClickCancel = () => {
        navigate("../menu");
    };

    const handleValid = (propertyValue: boolean, key: string) => {
        setValidForm({...validForm, [key]: propertyValue});
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
        // @ts-ignore
        let attendess: [{ emailAddress: { name: string, address: string } }] = [];
        participants.forEach((participant) => {
            attendess.push({emailAddress: {name: participant.displayName, address: participant.mail}})
        })

        try {
            addMeeting({
                subject: name,
                body: {contentType: "HTML", content: description},
                start: {dateTime: meetingStartDate, timeZone: "UTC"},
                end: {dateTime: meetingEndDate, timeZone: "UTC"},
                attendees: attendess,
                id: cookies.get("roomId"),
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

    const test = () => {
        console.log("ASDASD")
    }

    const {meetID} = useParams<string>();
    const id = Number(meetID);

    console.log("param meetid: ", meetID);
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
                                sx={{maxWidth: 140}}
                            >
                                Cancel
                            </Button>
                            <Button
                                sx={{maxWidth: 140}}
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
                                <CalendarMonthIcon fontSize="small"/>
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
