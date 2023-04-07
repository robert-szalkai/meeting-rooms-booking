import React from "react";
import { Card, Box, Typography, IconButton, Modal } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import "./MeetingRoom.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const bull = (
    <Box
        component="span"
        sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    ></Box>
);

function MeetingRoom() {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography
                    sx={{
                        fontFamily: "IBM Plex Sans",
                        fontStyle: "normal",
                        fontWeight: 500,
                        fontSize: "24px",
                        lineHeight: "31px",
                        color: "#1E3C52",
                        paddingBottom: "20px",
                    }}
                    className="meeting-room-name"
                >
                    Meeting Room Name
                </Typography>
                <Typography
                    sx={{
                        fontFamily: "IBM Plex Sans",
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "21px",
                        color: "#000000",
                    }}
                >
                    This meeting room is located at the left side of the office,
                    close to the kitchen. It is a small meeting room perfect for
                    a single person meeting.
                </Typography>
                <Typography
                    sx={{
                        paddingTop: "20px",
                        fontFamily: "IBM Plex Sans",
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "21px",
                        color: "#000000",
                    }}
                >
                    Latest book at 2022-02-18 15:30
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end" }}>
                <IconButton sx={{ color: "black" }}>
                    <EditIcon className="iconEditButton" fontSize="large" />
                </IconButton>
                <IconButton sx={{ color: "red" }}>
                    <DeleteForeverIcon
                        className="iconEditButton"
                        fontSize="large"
                    />
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default MeetingRoom;
