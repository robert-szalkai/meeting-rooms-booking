import React from "react";
import {
    Box,
    Button,
    Typography,
    Grid,
    Paper,
    TextField,
    Autocomplete,
} from "@mui/material";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { getParticipants, getParticipant } from "../../HandleRequests/RoomApi";
import dayjs from "dayjs";

//To be removed when globla theme is done
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

//To be removed when global theme is done
const buttonStyle = { color: "#008435", border: "1px solid #008435" };

const Owner = {
    name: "",
    id: 0,
    available: true,
    image: "",
};

const QuickBook = () => {
    const [timeButtonsVisible, setTimeButtonsVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [owner, setOwner] = useState(Owner);
    const [owners, setOwners] = useState([""]);
    const [autoComplete, setAutoComplete] = useState(false);
    const [time_val, setTime_val] = useState(0);

    const handleQuickBook = () => {
        setTimeButtonsVisible(!timeButtonsVisible);
        if (timeButtonsVisible) setOpen(false);
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
            owner: owner.id,
            participants_id: [],
            start_time: now,
            end_time: end_time,
            duration: time_val,
        });
        console.log(res.status);
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
                            <Item
                                sx={buttonStyle}
                                onClick={() => {
                                    handleClickTime();
                                    setTime_val(15);
                                }}
                            >
                                {" "}
                                {/* To be replaced when global theme is done*/}
                                15 Min
                            </Item>
                        </Grid>
                        <Grid item xs={2}>
                            <Item
                                sx={buttonStyle}
                                onClick={() => {
                                    handleClickTime();
                                    setTime_val(20);
                                }}
                            >
                                {" "}
                                {/* To be replaced when global theme is done*/}
                                20 Min
                            </Item>
                        </Grid>
                        <Grid item xs={2}>
                            <Item
                                sx={buttonStyle}
                                onClick={() => {
                                    handleClickTime();
                                    setTime_val(30);
                                }}
                            >
                                {" "}
                                {/* To be replaced when global theme is done*/}
                                30 Min
                            </Item>
                        </Grid>
                        <Grid item xs={2}>
                            <Item
                                sx={buttonStyle}
                                onClick={() => {
                                    handleClickTime();
                                    setTime_val(40);
                                }}
                            >
                                {" "}
                                {/* To be replaced when global theme is done*/}
                                40 Min
                            </Item>
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
