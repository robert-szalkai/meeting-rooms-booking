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
import { getParticipants } from "../../../../api/getRequests";
import COLORS from "../../../../constants/CustomColors";

//To be removed when globla theme is done
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

//To be removed when global theme is done
const buttonStyle = {
    color: COLORS.GREEN,
    border: `1px solid ${COLORS.GREEN}`,
};

interface iQuickBook {
    timeButtonsAvaible: boolean;
}

const QuickBook = ({ timeButtonsAvaible }: iQuickBook) => {
    const [timeButtonsVisible, setTimeButtonsVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [ownerName, setOwnerName] = useState("");
    const [owners, setOwners] = useState([""]);
    const [autoComplete, setAutoComplete] = useState(false);

    useEffect(() => {
        if (timeButtonsAvaible) setTimeButtonsVisible(true);
    }, [timeButtonsAvaible]);

    const handleQuickBook = () => {
        setTimeButtonsVisible(!timeButtonsVisible);
        if (timeButtonsVisible) setOpen(false);
    };

    const handleClickTime = () => {
        if (!open) setOpen(true);
        setOwnerName("");
    };

    const handleChange = (e: any) => {
        setOwnerName(e.target.value);
    };

    const handleSearchOwner = () => {
        console.log(ownerName);
        //To be implemented. Final step, needs to create meeting
    };

    const populateOwners = async () => {
        let tempOwners: any[] = [];
        const response = await getParticipants();
        response.data.forEach(({ name }: { name: string }) =>
            tempOwners.push(name)
        );
        setOwners(tempOwners);
    };

    if (owners.length == 1) populateOwners();

    return (
        <Box>
            <Box display="flex" justifyContent="center">
                <Button
                    variant="contained"
                    sx={{
                        "border-radius": "50px",
                        "text-transform": "none",
                        backgroundColor: COLORS.GREEN,
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
                            <Item sx={buttonStyle} onClick={handleClickTime}>
                                {" "}
                                {/* To be replaced when global theme is done*/}
                                15 Min
                            </Item>
                        </Grid>
                        <Grid item xs={2}>
                            <Item sx={buttonStyle} onClick={handleClickTime}>
                                {" "}
                                {/* To be replaced when global theme is done*/}
                                20 Min
                            </Item>
                        </Grid>
                        <Grid item xs={2}>
                            <Item sx={buttonStyle} onClick={handleClickTime}>
                                {" "}
                                {/* To be replaced when global theme is done*/}
                                30 Min
                            </Item>
                        </Grid>
                        <Grid item xs={2}>
                            <Item sx={buttonStyle} onClick={handleClickTime}>
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
