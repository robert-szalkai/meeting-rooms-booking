import React, { useEffect, useState } from "react";
import {
    Card,
    Grid,
    Typography,
    IconButton,
    CardActions,
    CardContent,
    Box,
    Button,
    Modal,
    TextField,
} from "@mui/material";
import "./MeetingRoom.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";
import { Room } from "./Room";
import { DeleteConfirmationModal } from "../Modal/DeleteConfirmationModal";

async function GetData(): Promise<Room[]> {
    const response = await axios.get(`http://localhost:3001/rooms`);
    return response.data;
}

async function UpdateRoom(room: Room) {
    await axios.put(`http://localhost:3001/rooms/${room.id}`, room);
}

function MeetingRoom() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [deleteRoomId, setDeleteRoomId] = useState<number | null>(null);
    const [deleteRoomTitle, setDeleteRoomTitle] = useState<string>("");
    const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] =
        useState<boolean>(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    // const [editedRoomName, setEditedRoomName] = useState<string>("");
    // const [editedRoomDescription, setEditedRoomDescription] =
    //     useState<string>("");
    // const [editedRoomCapacity, setEditedRoomCapacity] = useState<number>(0);
    const [editedRoomId, setEditedRoomId] = useState<number>(0);
    const [editedRoomDetails, setNewRoomDetails] = useState({
        name: "",
        description: "",
        capacity: 0,
    });

    async function fetchData() {
        const data = await GetData();
        setRooms(data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    async function handleDeleteRoom(id: number) {
        if (id !== null) {
            try {
                await axios.delete(`http://localhost:3001/rooms/${id}`);
                setOpenDeleteConfirmationModal(false);
                setDeleteRoomId(null);
                fetchData();
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleEditedRoomDetailsChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = event.target;
        setNewRoomDetails((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const editRoom = async (newRoomDetails: Room) => {
        const newRoom = {
            ...newRoomDetails,
        };
        try {
            UpdateRoom(newRoom);
            fetchData();
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditRoom = async () => {
        if (
            editedRoomDetails.name === "" ||
            editedRoomDetails.description === "" ||
            editedRoomDetails.capacity === 0
        ) {
            console.log("Please fill all the required fields.");
            return;
        }
        const editedRoom = {
            id: editedRoomId,
            title: editedRoomDetails.name,
            description: editedRoomDetails.description,
            capacity: editedRoomDetails.capacity,
        };
        await editRoom(editedRoom);
        fetchData();
        setOpenEditModal(false);
        setNewRoomDetails({
            name: "",
            description: "",
            capacity: 0,
        });
    };

    return (
        <Grid container spacing={3}>
            {rooms.map((room) => (
                <Grid item xs={12} sm={6} md={6} lg={6} key={room.id}>
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
                                {room.title}
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
                                {room.description}
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
                                Latest book at {room.lastBooked}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: "flex-end" }}>
                            <IconButton
                                sx={{ color: "black" }}
                                onClick={() => {
                                    setEditedRoomId(room.id);
                                    // setEditedRoomCapacity(
                                    //     room.capacity ? room.capacity : 0
                                    // );
                                    // setEditedRoomDescription(room.description);
                                    // setEditedRoomName(room.title);
                                    setOpenEditModal(true);
                                    setNewRoomDetails({
                                        name: room.title,
                                        description: room.description,
                                        capacity: room.capacity
                                            ? room.capacity
                                            : 0,
                                    });
                                }}
                            >
                                <EditIcon
                                    className="iconEditButton"
                                    fontSize="large"
                                />
                            </IconButton>
                            <IconButton
                                sx={{ color: "red" }}
                                onClick={() => {
                                    setDeleteRoomId(room.id);
                                    setOpenDeleteConfirmationModal(true);
                                    setDeleteRoomTitle(room.title);
                                }}
                            >
                                <DeleteForeverIcon
                                    className="iconEditButton"
                                    fontSize="large"
                                />
                            </IconButton>
                        </CardActions>

                        <DeleteConfirmationModal
                            open={openDeleteConfirmationModal}
                            onClose={() => {
                                setOpenDeleteConfirmationModal(false);
                                setDeleteRoomId(null);
                            }}
                            onSubmit={() =>
                                deleteRoomId !== null &&
                                handleDeleteRoom(deleteRoomId)
                            }
                            roomTitle={deleteRoomTitle}
                        />
                        <Modal
                            open={openEditModal}
                            onClose={() => setOpenEditModal(false)}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "left",
                                backgroundColor: "#f8f9fa",
                                width: "600px",
                                height: "200px",
                                padding: "20px",
                                border: "none",
                                borderRadius: "5px",
                                position: "fixed",
                                top: "40%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                            }}
                        >
                            <Box sx={{ padding: "20px" }}>
                                <Typography variant="h5">Edit room</Typography>
                                <form>
                                    <Box sx={{ marginTop: "20px" }}>
                                        <TextField
                                            label="Name"
                                            variant="outlined"
                                            name="name"
                                            value={editedRoomDetails.name}
                                            onChange={
                                                handleEditedRoomDetailsChange
                                            }
                                            required
                                        />
                                    </Box>
                                    <Box sx={{ marginTop: "20px" }}>
                                        <TextField
                                            label="Description"
                                            variant="outlined"
                                            name="description"
                                            value={
                                                editedRoomDetails.description
                                            }
                                            onChange={
                                                handleEditedRoomDetailsChange
                                            }
                                            required
                                        />
                                    </Box>
                                    <Box sx={{ marginTop: "20px" }}>
                                        <TextField
                                            label="Capacity"
                                            variant="outlined"
                                            name="capacity"
                                            type="number"
                                            value={editedRoomDetails.capacity}
                                            onChange={
                                                handleEditedRoomDetailsChange
                                            }
                                            required
                                        />
                                    </Box>
                                    <Box sx={{ marginTop: "20px" }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {
                                                handleEditRoom();
                                            }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {
                                                setOpenEditModal(false);
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </Box>
                                </form>
                            </Box>
                        </Modal>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default MeetingRoom;
