import React, { FC, useState, useEffect } from "react";
import {
    Box,
    Typography,
    IconButton,
    Card,
    CardContent,
    Modal,
    TextField,
    Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const styleEdit = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: 500,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

const styleDelete = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: 250,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

const MeetingRoom: FC<MeetingRoomProps> = ({
    meetingRoomName,
    meetingRoomID,
    meetingRoomDescription,
    latestBook,
}) => {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");

    useEffect(() => {
        setEditTitle(meetingRoomName);
        setEditDescription(meetingRoomDescription);
    }, []);

    const handleEditModalOpen = () => {
        setEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setEditModalOpen(false);
    };

    const handleDeleteModalOpen = () => {
        setDeleteModalOpen(true);
    };

    const handleDeleteModalClose = () => {
        setDeleteModalOpen(false);
    };

    const capacityFromDescription = () => {
        const v = meetingRoomDescription.split(" ").reverse();
        const ne = v.join().match(/[0-9]+/);
        return ne;
    };

    const handleEdit = async () => {
        console.log(meetingRoomID);
        return await axios.patch(
            "http://localhost:3001/rooms/" + meetingRoomID,
            {
                title: editTitle,
                description: editDescription,
            }
        );
    };

    const handleDelete = async () => {
        return await axios.delete(
            "http://localhost:3001/rooms/" + meetingRoomID
        );
    };
    return (
        <Box>
            <Card
                sx={{
                    minHeight: 190,
                    maxHeight: 250,
                    ":hover": { boxShadow: 7 },
                }}
            >
                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "space-between",
                    }}
                >
                    <Typography variant="h5" fontWeight={"bold"}>
                        {meetingRoomName} #{meetingRoomID}
                    </Typography>
                    <Typography sx={{ paddingTop: 2 }}>
                        {meetingRoomDescription}
                    </Typography>
                    <Box sx={{ display: "flex" }}>
                        <Typography sx={{ paddingTop: 2 }}>
                            Latest book at {latestBook}
                        </Typography>
                        <Box sx={{ marginLeft: "auto" }}>
                            <IconButton onClick={handleEditModalOpen}>
                                <EditIcon
                                    sx={{ padding: "10px", color: "black" }}
                                />
                            </IconButton>
                            <Modal
                                open={editModalOpen}
                                onClose={handleEditModalClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <form onSubmit={handleEdit}>
                                    <Box sx={styleEdit}>
                                        <Box
                                            sx={{ display: "flex", padding: 1 }}
                                        >
                                            <Typography
                                                variant="h5"
                                                fontWeight={"bold"}
                                            >
                                                {meetingRoomName}
                                            </Typography>
                                            <IconButton
                                                sx={{
                                                    marginLeft: "auto",
                                                }}
                                                onClick={handleEditModalClose}
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                        </Box>
                                        <Typography paddingTop={1}>
                                            Name
                                        </Typography>
                                        <TextField
                                            variant="filled"
                                            placeholder="Please type meeting room name"
                                            value={editTitle}
                                            onChange={(e) =>
                                                setEditTitle(
                                                    e.currentTarget.value
                                                )
                                            }
                                            fullWidth
                                        ></TextField>
                                        <Typography paddingTop={2}>
                                            Description
                                        </Typography>
                                        <TextField
                                            variant="filled"
                                            placeholder="Please provide description"
                                            fullWidth
                                            multiline
                                            minRows={4}
                                            maxRows={4}
                                            value={editDescription}
                                            onChange={(e) =>
                                                setEditDescription(
                                                    e.currentTarget.value
                                                )
                                            }
                                        ></TextField>
                                        <Typography paddingTop={2}>
                                            Capacity
                                        </Typography>
                                        <TextField
                                            variant="filled"
                                            placeholder="Please provide capacity "
                                            value={capacityFromDescription}
                                        ></TextField>
                                        <Box
                                            sx={{
                                                paddingTop: 5,
                                                display: "flex",
                                                marginLeft: "auto",
                                                columnGap: 2,
                                            }}
                                        >
                                            <Button
                                                variant="outlined"
                                                sx={{ marginLeft: "auto" }}
                                                onClick={handleEditModalClose}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                variant="contained"
                                                type="submit"
                                            >
                                                Submit
                                            </Button>
                                        </Box>
                                    </Box>
                                </form>
                            </Modal>
                            <IconButton onClick={handleDeleteModalOpen}>
                                <DeleteForeverIcon
                                    sx={{ padding: "10px", color: "red" }}
                                />
                            </IconButton>
                            <Modal
                                open={deleteModalOpen}
                                onClose={handleDeleteModalClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <form onSubmit={handleDelete}>
                                    <Box sx={styleDelete}>
                                        <Box
                                            sx={{ display: "flex", padding: 1 }}
                                        >
                                            <Typography
                                                variant="h5"
                                                fontWeight={"bold"}
                                            >
                                                Confirm Action
                                            </Typography>
                                            <IconButton
                                                sx={{
                                                    marginLeft: "auto",
                                                    color: "black",
                                                }}
                                                onClick={handleDeleteModalClose}
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                        </Box>
                                        <Typography
                                            paddingTop={3}
                                            fontWeight={"bold"}
                                        >
                                            Please confirm that you want to
                                            remove meeting room{" "}
                                            {meetingRoomName} from the list of
                                            available meeting rooms.
                                        </Typography>
                                        <Typography paddingTop={3}>
                                            This action will remove this meeting
                                            room forever.
                                        </Typography>
                                        <Box
                                            sx={{
                                                paddingTop: 5,
                                                display: "flex",
                                                marginLeft: "auto",
                                                columnGap: 2,
                                            }}
                                        >
                                            <Button
                                                variant="outlined"
                                                sx={{ marginLeft: "auto" }}
                                                onClick={handleDeleteModalClose}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                variant="contained"
                                                type="submit"
                                            >
                                                Submit
                                            </Button>
                                        </Box>
                                    </Box>
                                </form>
                            </Modal>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

interface MeetingRoomProps {
    meetingRoomName: string;
    meetingRoomID: string;
    meetingRoomDescription: string;
    latestBook: string;
}

export default MeetingRoom;
