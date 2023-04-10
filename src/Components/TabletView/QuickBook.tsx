import React from "react";
import { Box, Button, Typography, Container, Grid, Paper } from "@mui/material";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { useState } from "react";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

const QuickBook = () => {
    const [bookingIsOpen, setBookingIsOpen] = useState(false);
    const [flag, setFlag] = useState(false);

    const handleQuickBook = () => {
        if (!flag) setBookingIsOpen(true);
        else setBookingIsOpen(false);
        setFlag(!flag);
    };
    const buttonStyle = { color: "#008435", border: "1px solid #008435" };
    return (
        <Container>
            <Box>
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
                    Select Meeting Duration
                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <Item sx={buttonStyle}>15 Min</Item>
                        </Grid>
                        <Grid item xs={2}>
                            <Item sx={buttonStyle}>20 Min</Item>
                        </Grid>
                        <Grid item xs={2}>
                            <Item sx={buttonStyle}>30 Min</Item>
                        </Grid>
                        <Grid item xs={2}>
                            <Item sx={buttonStyle}>40 Min</Item>
                        </Grid>
                    </Grid>
                </Box>
            ) : null}
        </Container>
    );
};

export default QuickBook;
