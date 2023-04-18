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
import { getParticipants, getParticipant } from "../../HandleRequests/RoomApi";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

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
    const [overlapped15, setOverlapped15] = useState(false);
    const [overlapped20, setOverlapped20] = useState(false);
    const [overlapped30, setOverlapped30] = useState(false);
    const [overlapped40, setOverlapped40] = useState(false);

    const handleQuickBook = async () => {
        setTimeButtonsVisible(!timeButtonsVisible);
        if (timeButtonsVisible) setOpen(false);

        let meetings_start_time: any[] = [];
        const response = await axios.get("http://localhost:3001/meetings");

        Object.values(response.data as MeetTime[]).map((value) => {
            console.log(value.start_time);

            if (dayjs(value.start_time).isSame(dayjs(), "day"))
                meetings_start_time.push(
                    dayjs(dayjs()).diff(value.start_time, "minute")
                );
        });

        const sorted_meets = meetings_start_time.sort((a, b) =>
            dayjs(a).isAfter(dayjs(b)) ? 1 : -1
        );

        const closest_meet = sorted_meets[0];

        if (sorted_meets[0] > 15 && sorted_meets[0] < 20) {
            setOverlapped15(false);
            setOverlapped20(true);
            setOverlapped30(true);
            setOverlapped40(true);
        } else if (sorted_meets[0] > 20 && sorted_meets[0] < 30) {
            setOverlapped15(false);
            setOverlapped20(false);
            setOverlapped30(true);
            setOverlapped40(true);
        } else if (sorted_meets[0] > 30 && sorted_meets[0] < 40) {
            setOverlapped15(false);
            setOverlapped20(false);
            setOverlapped30(false);
            setOverlapped40(true);
        } else if (sorted_meets[0] > 40) {
            setOverlapped15(false);
            setOverlapped20(false);
            setOverlapped30(false);
            setOverlapped40(false);
        } else if (sorted_meets[0] < 15) {
            setOverlapped15(true);
            setOverlapped20(true);
            setOverlapped30(true);
            setOverlapped40(true);
            console.log("meetings cannot take place");
        }
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

    return (
        <Box>
            <Box display="flex" justifyContent="center">
                <Button
                    variant="contained"
                    sx={{
                        "border-radius": "50px",
                        "text-transform": "none",
                        backgroundColor: "#008435",
                    }}
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
                        spacing={5}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        minHeight="25vh"
                    >
                        <Grid item xs={2}>
                            <Button
                                onClick={() => {
                                    handleClickTime();
                                    setTime_val(15);
                                }}
                                sx={buttonStyle}
                                disabled={overlapped15}
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
                                sx={buttonStyle}
                                disabled={overlapped20}
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
                                sx={buttonStyle}
                                disabled={overlapped30}
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
                                sx={buttonStyle}
                                disabled={overlapped40}
                            >
                                40 Min
                            </Button>
                        </Grid>
                    </Grid>

                    {open ? (
                        <Box>
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
                            >
                                <Button>Submit</Button>
                            </Box>
                        </Box>
                    ) : null}
                </Box>
            ) : null}
        </Box>
    );
};

export default QuickBook;
