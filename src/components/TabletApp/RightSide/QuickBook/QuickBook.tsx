import React from "react";
import {
    Box,
    Button,
    Typography,
    Grid,
    TextField,
    Autocomplete,
} from "@mui/material";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { useState } from "react";
import axios from "axios";
import { getParticipants, getParticipant } from "../../../../api/getRequests";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { spawnToast } from "../../../../utils/Toast";

dayjs.extend(utc);
dayjs.extend(timezone);

//To be removed when global theme is done
const buttonStyle = { color: "#008435", border: "1px solid #008435" };

const Owner = {
    name: "",
    id: 0,
    available: true,
    image: "",
};
interface MeetTime {
    end_time: string;
    start_time: string;
}

const QuickBook = () => {
    const [timeButtonsVisible, setTimeButtonsVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [owner, setOwner] = useState(Owner);
    const [owners, setOwners] = useState([""]);
    const [autoComplete, setAutoComplete] = useState(false);
    const [time_val, setTime_val] = useState(0);
    const [closest_meet, setMeet] = useState(0);
    const [in_session, set_in_session] = useState(false);

    const handleQuickBook = async () => {
        set_in_session(false);
        setTimeButtonsVisible(!timeButtonsVisible);
        if (timeButtonsVisible) setOpen(false);

        let meetings_start_time: any[] = [];
        const response = await axios.get("http://localhost:3001/meetings");

        Object.values(response.data as MeetTime[]).map((value) => {
            if (dayjs(value.start_time).isSame(dayjs(), "day")) {
                meetings_start_time.push(
                    dayjs(value.start_time).diff(dayjs(), "minute")
                );
                if (dayjs(value.end_time).isAfter(dayjs())) {
                    set_in_session(true);
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
        setOwner(Owner);
    };

    const handleChange = async (e: any) => {
        const result = await getParticipant(e.target.innerHTML);
        setOwner(result.data[0]);
    };

    const handleSubmitOwner = async () => {
        let now = dayjs();
        let end_time = now.add(time_val, "minute");
        let latest_meetings_id = 0;

        const response = await axios.get("http://localhost:3001/meetings");
        response.data.forEach(
            ({ id }: { id: number }) => (latest_meetings_id = id)
        );

        const res = await axios.post("http://localhost:3001/meetings", {
            id: latest_meetings_id + 1,
            room_id: 1,
            owner_id: owner.id,
            participants_id: [],
            start_time: now,
            end_time: end_time,
        });

        // Toast for successful confirmation to be added
        spawnToast("You have succeded", "Your booking was made", true);
        handleQuickBook();
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

    const handleDisable = (val: any) => {
        return closest_meet > val || in_session === false ? false : true;
    };

    return (
        <Box>
            <Box display="flex" justifyContent="center">
                <Button
                    variant="contained"
                    color="success"
                    sx={{ textTransform: "none" }}
                    onClick={() => {
                        handleQuickBook();
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
                                    setTime_val(15);
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
                                    setTime_val(20);
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
                                    setTime_val(30);
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
                                    setTime_val(40);
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
                                    }}
                                    onClose={() => setAutoComplete(false)}
                                    onChange={handleChange}
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
                                onClick={handleSubmitOwner}
                                paddingTop="1vh"
                            >
                                <Button variant="outlined" color="success">
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
