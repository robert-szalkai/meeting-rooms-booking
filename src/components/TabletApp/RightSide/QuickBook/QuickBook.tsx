import React, { SyntheticEvent } from "react";
import { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import {
    Box,
    Button,
    Typography,
    Grid,
    TextField,
    Autocomplete,
} from "@mui/material";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";

import {
    getParticipants,
    getParticipant,
    getMeetings,
} from "../../../../api/getRequests";
import { spawnToast } from "../../../../utils/Toast";

const INITIALOWNER = {
    name: "",
    id: 0,
    available: true,
    image: "",
};

const QuickBook = () => {
    const [timeButtonsVisible, setTimeButtonsVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [owner, setOwner] = useState(INITIALOWNER);
    const [owners, setOwners] = useState([""]);
    const [autoComplete, setAutoComplete] = useState(false);
    const [timeVal, setTimeVal] = useState(0);
    const [closestMeet, setMeet] = useState(0);
    const [inSession, setInSession] = useState(false);

    const handleQuickBookButton = async () => {
        setInSession(false);
        setTimeButtonsVisible(!timeButtonsVisible);
        if (timeButtonsVisible) setOpen(false);

        let meetings_start_time: number[] = [];
        const response = await getMeetings();

        Object.values(response.data).map((value: any) => {
            if (dayjs(value.start_time).isSame(dayjs(), "day")) {
                meetings_start_time.push(
                    dayjs(value.start_time).diff(dayjs(), "minute")
                );
                if (dayjs(value.end_time).isAfter(dayjs())) {
                    setInSession(true);
                }
            }
        });

        meetings_start_time.sort((a, b) =>
            dayjs(a).isAfter(dayjs(b)) ? -1 : 1
        );

        setMeet(meetings_start_time[0]);
    };

    const handleClickTime = () => {
        if (!open) setOpen(true);
        setOwner(INITIALOWNER);
    };

    const handleChange = async (e: string) => {
        console.log(e);
        const result = await getParticipant(e);
        setOwner(result.data[0]);
    };

    const handleCreateMeeting = async () => {
        let now = dayjs();
        let end_time = now.add(timeVal, "minute");

        try {
            await axios.post("http://localhost:3001/meetings", {
                room_id: 1,
                owner_id: owner.id,
                participants_id: [],
                start_time: now,
                end_time: end_time,
            });
            spawnToast("You have succeded", "Your booking was made", true);
        } catch (error) {
            spawnToast(
                "Something went wrong",
                "Your booking has not been made",
                false
            );
            console.log(error);
        }

        handleQuickBookButton();
    };

    const populateOwners = async () => {
        let tempOwners: any[] = [];
        const response = await getParticipants();
        response.data.forEach(({ name }: { name: string }) =>
            tempOwners.push(name)
        );
        setOwners(tempOwners);
    };

    if (owners.length === 1) populateOwners();

    const handleDisable = (val: number) => {
        return closestMeet > val || inSession === false ? false : true;
    };

    return (
        <Box>
            <Box display="flex" justifyContent="center">
                <Button
                    variant="contained"
                    color="success"
                    sx={{ textTransform: "none" }}
                    onClick={() => {
                        handleQuickBookButton();
                    }}
                >
                    <EditCalendarIcon fontSize="small" />
                    <Typography variant="subtitle1">Quick Book</Typography>
                </Button>
            </Box>
            {timeButtonsVisible ? (
                <Box sx={{ flexGrow: 1 }}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        paddingTop="5vh"
                        paddingBottom="1vh"
                    >
                        <Grid item xs={8}>
                            <Typography sx={{ fontWeight: "bold" }}>
                                Select meeting duration
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        spacing={5}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        minHeight="0vh"
                    >
                        <Grid item xs={2}>
                            <Button
                                onClick={() => {
                                    handleClickTime();
                                    setTimeVal(15);
                                }}
                                variant="outlined"
                                color="success"
                                disabled={handleDisable(15)}
                            >
                                15 Min
                            </Button>
                        </Grid>
                        <Grid item xs={2}>
                            <Button
                                onClick={() => {
                                    handleClickTime();
                                    setTimeVal(20);
                                }}
                                variant="outlined"
                                color="success"
                                disabled={handleDisable(20)}
                            >
                                20 Min
                            </Button>
                        </Grid>
                        <Grid item xs={2}>
                            <Button
                                onClick={() => {
                                    handleClickTime();
                                    setTimeVal(30);
                                }}
                                variant="outlined"
                                color="success"
                                disabled={handleDisable(30)}
                                value={30}
                            >
                                30 Min
                            </Button>
                        </Grid>
                        <Grid item xs={2}>
                            <Button
                                onClick={() => {
                                    handleClickTime();
                                    setTimeVal(40);
                                }}
                                variant="outlined"
                                color="success"
                                disabled={handleDisable(40)}
                            >
                                40 Min
                            </Button>
                        </Grid>
                    </Grid>

                    {open ? (
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
                                        handleChange(value);
                                    }}
                                    onClose={() => setAutoComplete(false)}
                                    disablePortal
                                    id="combo-box-demo"
                                    options={owners}
                                    sx={{ width: 300 }}
                                    value={
                                        owner === undefined ? "" : owner.name
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
