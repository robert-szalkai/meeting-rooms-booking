import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { CardActions, IconButton, Box } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const MeetingRoom = ({
    id,
    title,
    description,
    lastBooked,
}: {
    id: string;
    title: string;
    description: string;
    lastBooked: string;
}) => {
    const handleEdit = () => {};

    const handleDelete = () => {};
    return (
        <Card
            sx={{
                minWidth: 275,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
            }}
        >
            <CardContent>
                <Typography variant="h5" component="div">
                    {title} # {id}
                </Typography>

                <Typography variant="body2">{description}</Typography>
            </CardContent>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                }}
            >
                <Typography sx={{ paddingLeft: "16px" }} color="text.secondary">
                    {lastBooked}
                </Typography>
                <Box>
                    <IconButton sx={{ margin: 0 }} onClick={handleEdit}>
                        <BorderColorIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        sx={{ margin: 0, color: "red" }}
                        onClick={handleDelete}
                    >
                        <DeleteForeverIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Box>
            <CardActions></CardActions>
        </Card>
    );
};

MeetingRoom.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    lastBooked: PropTypes.string,
};

export default MeetingRoom;
