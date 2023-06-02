import React, {useMemo} from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import {
    Box,
    Button,
    Typography,
    TextField,
    Autocomplete,
} from "@mui/material";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";

import { getParticipants, getParticipant } from "../../../../api/participants";
import { getMeetings } from "../../../../api/meetings";
import { spawnToast } from "../../../../utils/Toast";
import CONSTANTS from "../../../../constants/Constants";
import { Participant, iQuickBook } from "../../../../interfaces/interfaces";
import Cookies from 'universal-cookie';
const QuickBook = ({
                       isDurationOpen = false,
                       handleQuickBookDone,
                       availability,
                   }: iQuickBook) => {
    const [timeButtonsVisible, setTimeButtonsVisible] =
        useState<boolean>(isDurationOpen);
    const [openQuickButtonMenu, setOpenQuickButtonMenu] =
        useState<boolean>(false);
    const [owner, setOwner] = useState<Participant>({
        displayName: "",
        givenName: "",
        mail: "",
        surname: "",
        id: "",
    });
    const [possibleOwners, setPossibleOwners] = useState<string[]>([""]);
    const [autoComplete, setAutoComplete] = useState<boolean>(false);
    const [timeVal, setTimeVal] = useState<number>(0);
    const [closestMeet, setClosestMeet] = useState<number>(0);
    const [submitButton, setSubmitButton] = useState<boolean>(false);
    const roomId : string = useMemo(()=>{return new Cookies().get("roomId")},[possibleOwners]);

    useEffect(() => {
        const fetchData = async () => {
            let meetingsStartTime: number[] = [];
            let tempOwners: string[] = [];

            try {
                const owners_response = await getParticipants();
                Object.values(owners_response).forEach((value: any) =>
                    tempOwners.push(value.displayName)
                );
                setPossibleOwners(tempOwners);
            } catch (error) {
                spawnToast({
                    title: "Something went wrong",
                    message: "Could not get list of possible owners!",
                    toastType: "error",
                });
                console.log(error);
            }

            try {
                const meetingsResponse = await getMeetings(roomId);
                meetingsResponse.data.forEach((value: any) => {
                    if (dayjs(value.start.dateTime).isSame(dayjs(), "day")) {
                        meetingsStartTime.push(
                            dayjs(value.start.dateTime).diff(dayjs(), "minute")
                        );
                    }
                });
            } catch (error) {
                spawnToast({
                    title: "Something went wrong",
                    message: "Could not get list of meetings for today!",
                    toastType: "error",
                });
                console.log(error);
            }

            meetingsStartTime.sort((a, b) =>
                dayjs(a).isAfter(dayjs(b)) ? -1 : 1
            );

            setClosestMeet(meetingsStartTime[0]);
        };
        fetchData();
    },[]);

    const handleDisable = (val: number) => {
        return closestMeet < val;
    };

    const handleQuickBookButton = async () => {
        setTimeButtonsVisible(!timeButtonsVisible);
        if (timeButtonsVisible) setOpenQuickButtonMenu(false);
    };

    const handleClickTime = () => {
        if (!openQuickButtonMenu) setOpenQuickButtonMenu(true);
        setOwner({
            displayName: "",
            id: "0",
            givenName: "",
            mail: "",
            surname: "",
        });
    };

    const handleChange = async (e: string) => {
        try {
            const result = await getParticipant(e);
            setOwner({
                displayName: result.displayName,
                id: result.id.toString(),
                givenName: result.givenName,
                mail: result.mail,
                surname: result.surname,
            });
            setSubmitButton(true);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCreateMeeting = async () => {
        let now : dayjs.Dayjs | string = dayjs();
        let endTime : dayjs.Dayjs | string = now.add(timeVal, "minute");
        now = dayjs(now).format();
        endTime = dayjs(endTime).format();
        try {
            await axios.post("http://10.152.20.113:4000/msgraph/events", {
                id: roomId,
                attendees: [{"emailAddress": {"name": owner?.displayName, "address": `${owner?.displayName.toLowerCase().replace(" ",".")}@doctarigroup.com`}}],
                start: {"dateTime":now, "timeZone":"UTC"},
                end: {"dateTime":endTime, "timeZone":"UTC"},
                body:{"contentType":"HTML", content:`This is a quick meeting made by ${owner?.displayName}.`},
                subject:`A quick meeting made by ${owner?.displayName}`,
            });
            spawnToast({
                title: "You have succeded",
                message: "Your booking was made",
                toastType: "success",
            });

            handleQuickBookDone();
        } catch (error) {
            spawnToast({
                title: "Something went wrong",
                message: "Your booking has not been made",
                toastType: "error",
            });
            console.log(error);
        }
        window.location.reload()
        handleQuickBookButton();
    };

    return (
        <Box
            sx={{
                display: "flex",
                width: "100%",
                height: "100vh",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
            }}
            gap={3}
        >
            <Button
                disabled={availability === CONSTANTS.MEETING_IN_PROGRESS}
                variant="contained"
                color={
                    CONSTANTS.BUTTON_COLOR[availability] as
                        | "success"
                        | "warning"
                        | "error"
                }
                sx={{ textTransform: "none" }}
                onClick={() => {
                    handleQuickBookButton();
                }}
            >
                <EditCalendarIcon
                    fontSize="small"
                    sx={{ marginRight: "10px" }}
                />
                <Typography variant="subtitle1">Quick Book</Typography>
            </Button>
            {timeButtonsVisible ? (
                <Box
                    sx={{
                        width: "100%",
                        gap: "30px",
                        boxSizing: "border-box",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            mt: 4,
                            ml: "5%",
                            mr: "5%",
                        }}
                    >
                        <Typography sx={{ fontWeight: "bold", mb: 2 }}>
                            Select meeting duration
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%",
                                gap: "32px",
                            }}
                        >
                            <Button
                                onClick={() => {
                                    handleClickTime();
                                    setTimeVal(15);
                                }}
                                variant="outlined"
                                color="success"
                                disabled={handleDisable(15)}
                                sx={{ flexGrow: 1 }}
                            >
                                15 Min
                            </Button>

                            <Button
                                onClick={() => {
                                    handleClickTime();
                                    setTimeVal(20);
                                }}
                                variant="outlined"
                                color="success"
                                disabled={handleDisable(20)}
                                sx={{ flexGrow: 1 }}
                            >
                                20 Min
                            </Button>

                            <Button
                                onClick={() => {
                                    handleClickTime();
                                    setTimeVal(30);
                                }}
                                variant="outlined"
                                color="success"
                                disabled={handleDisable(30)}
                                sx={{ flexGrow: 1 }}
                            >
                                30 Min
                            </Button>

                            <Button
                                onClick={() => {
                                    handleClickTime();
                                    setTimeVal(40);
                                }}
                                variant="outlined"
                                color="success"
                                disabled={handleDisable(40)}
                                sx={{ flexGrow: 1 }}
                            >
                                40 Min
                            </Button>
                        </Box>
                    </Box>

                    {openQuickButtonMenu ? (
                        <Box paddingTop="5vh">
                            <Box display="flex" justifyContent="center">
                                <Autocomplete
                                    open={autoComplete}
                                    onInputChange={(_, value) => {
                                        if (value.length === 0) {
                                            if (autoComplete)
                                                setAutoComplete(false);
                                        } else {
                                            if (!autoComplete)
                                                setAutoComplete(true);
                                        }
                                    }}
                                    onChange={(e, value) => {
                                        if (value) handleChange(value);
                                    }}
                                    onClose={() => setAutoComplete(false)}
                                    disablePortal
                                    id="combo-box-demo"
                                    options={possibleOwners}
                                    sx={{ width: 300 }}
                                    value={
                                        owner === undefined
                                            ? ""
                                            : owner.displayName
                                    }
                                    renderInput={(params) => (
                                        <TextField {...params} label="Owner" />
                                    )}
                                />
                            </Box>
                            <Box
                                display="flex"
                                justifyContent="center"
                                paddingTop="1vh"
                            >
                                <Button
                                    variant="outlined"
                                    color="success"
                                    onClick={handleCreateMeeting}
                                    disabled={!submitButton}
                                >
                                    Submit
                                </Button>
                            </Box>
                        </Box>
                    ) : null}
                </Box>
            ) : null}
        </Box>
    );
};

export default QuickBook;