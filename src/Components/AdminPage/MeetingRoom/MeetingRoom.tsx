import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
    Card,
    Typography,
    CardContent,
    CardActions,
    Button,
    Box,
} from "@mui/material";

// const bull = (
//     <Box
//         component="span"
//         sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
//     >
//         •
//     </Box>
// );

function MeetingRoom() {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography
                    variant="h4"
                    fontFamily="IBM Plex Sans"
                    sx={{ fontSize: 25 }}
                    color="black"
                    gutterBottom
                >
                    Meeting Room Name #Meeting Room ID
                </Typography>
                <br />
                <br />
                <Typography variant="h5" component="div"></Typography>
                <Typography
                    sx={{ mb: 1.5 }}
                    color="text.secondary"
                ></Typography>
                <Typography variant="body2">
                    This meeting room is located at the left side of the office,
                    close to the kitchen. It is a small meeting room perfect for
                    a single person meeting.
                    <br />
                    <br />
                </Typography>
                <Typography variant="body2">
                    Latest book at 2022-02-18 15:30
                    <br />
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button size="small">
                    <EditIcon sx={{ color: "black" }}></EditIcon>
                </Button>
                <Button size="small">
                    <DeleteForeverIcon
                        sx={{ color: "red" }}
                    ></DeleteForeverIcon>
                </Button>
            </CardActions>
        </Card>
    );
}

export default MeetingRoom;
