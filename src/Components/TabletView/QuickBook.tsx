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
import { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));
const buttonStyle = { color: "#008435", border: "1px solid #008435" };

const QuickBook = (props: any) => {
    const [bookingIsOpen, setBookingIsOpen] = useState(false);
    const [flag, setFlag] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [flag2, setFlag2] = useState(false);
    const [ownerName, setOwnerName] = useState("");
    const [post, setPost] = useState([]);
    const [owners, setOwners] = useState([""]);
    const [autoComplete, setAutoComplete] = useState(false);

    const handleQuickBook = () => {
        if (!flag) setBookingIsOpen(true);
        else {
            setBookingIsOpen(false);
            setOpen(false);
            setFlag2(false);
        }
        setFlag(!flag);
    };

    const handleClickTime = () => {
        if (!flag2) setOpen(true);
        else setOpen(false);
        setOwnerName("");
    };

    const handleChange = (e: any) => {
        setOwnerName(e.target.value);
    };

    const handleSearchOwner = () => {
        console.log(ownerName);
    };

    useEffect(() => {
        let tempOwners: string[] = [];
        axios.get("http://localhost:3001/participants").then((request) => {
            setPost(request?.data);
            request.data.forEach((participant: { name: string }) => {
                tempOwners.push(participant.name);
            });
        });
        setOwners(tempOwners);
    }, []);

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
            {bookingIsOpen ? (
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
                            <Item sx={buttonStyle} onClick={handleClickTime}>
                                15 Min
                            </Item>
                        </Grid>
                        <Grid item xs={2}>
                            <Item sx={buttonStyle} onClick={handleClickTime}>
                                20 Min
                            </Item>
                        </Grid>
                        <Grid item xs={2}>
                            <Item sx={buttonStyle} onClick={handleClickTime}>
                                30 Min
                            </Item>
                        </Grid>
                        <Grid item xs={2}>
                            <Item sx={buttonStyle} onClick={handleClickTime}>
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
                                    disablePortal
                                    id="combo-box-demo"
                                    options={owners}
                                    sx={{ width: 300 }}
                                    value={ownerName}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Participants"
                                            value={ownerName}
                                            onChange={handleChange}
                                        />
                                    )}
                                />
                            </Box>
                            <Box
                                display="flex"
                                justifyContent="center"
                                onClick={handleSearchOwner}
                            >
                                <Button>Save</Button>
                            </Box>
                        </Box>
                    ) : null}
                </Box>
            ) : null}
        </Box>
    );
};

export default QuickBook;
