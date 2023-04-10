import React from "react";
import {
    Box,
    Button,
    Typography,
    Grid,
    Paper,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";
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
const buttonStyle = { color: "#008435", border: "1px solid #008435" };

const QuickBook = (props: any) => {
    const [bookingIsOpen, setBookingIsOpen] = useState(false);
    const [flag, setFlag] = useState(false);

    const handleQuickBook = () => {
        if (!flag) setBookingIsOpen(true);
        else setBookingIsOpen(false);
        setFlag(!flag);
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                <Grid
                    container
                    spacing={5}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="25vh"
                >
                    {/* <Typography>Select meeting duration</Typography> */}

                    <Grid item xs={2}>
                        <Item sx={buttonStyle} onClick={handleClickOpen}>
                            15 Min
                        </Item>
                        {/* <Button sx={buttonStyle} onClick={handleClickOpen}>
                            15 min
                        </Button> */}
                    </Grid>
                    <Grid item xs={2}>
                        <Item sx={buttonStyle} onClick={handleClickOpen}>
                            20 Min
                        </Item>
                    </Grid>
                    <Grid item xs={2}>
                        <Item sx={buttonStyle} onClick={handleClickOpen}>
                            30 Min
                        </Item>
                    </Grid>
                    <Grid item xs={2}>
                        <Item sx={buttonStyle} onClick={handleClickOpen}>
                            40 Min
                        </Item>
                    </Grid>
                </Grid>
            ) : null}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Quick Book</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Who will be the owner?
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Owner name"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Book</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default QuickBook;
