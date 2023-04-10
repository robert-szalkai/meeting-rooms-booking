import React, { useEffect } from "react";
import {
    Box,
    Typography,
    IconButton,
    Modal,
    Button,
    TextField,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useState } from "react";
import axios from "axios";
import { Room } from "../MeetingRoom/Room";

async function GetData(): Promise<Room[]> {
    const response = await axios.get(`http://localhost:3001/rooms`);
    return response.data;
}

const Header = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [newRoomDetails, setNewRoomDetails] = useState({
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

    const createNewRoom = async (newRoomDetails: Room) => {
        const newRoom = {
            ...newRoomDetails,
        };
        try {
            const response = await axios.post(
                "http://localhost:3001/rooms",
                newRoom
            );
            fetchData();
            setRooms((prevState) => [...prevState, response.data]);
        } catch (error) {
            console.log(error);
        }
    };

    const handleNewRoomDetailsChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = event.target;
        setNewRoomDetails((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCreateRoom = async () => {
        const newRoom = {
            id: Math.floor(Math.random() * 1000),
            title: newRoomDetails.name,
            description: newRoomDetails.description,
            capacity: newRoomDetails.capacity,
        };
        await createNewRoom(newRoom);
        fetchData();
        handleCloseModal();
        setNewRoomDetails({ name: "", description: "", capacity: 0 });
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <Box
            display="flex"
            gap="50px"
            alignItems="center"
            paddingLeft="50px"
            paddingBottom="70px"
        >
            <Box
                component="img"
                sx={{
                    height: "50px",
                }}
                alt="loading.."
                src={require("../../../assets/Images/logo.png")}
            />
            <Typography variant="h4">Meeting Rooms</Typography>
            <IconButton
                onClick={() => {
                    handleOpenModal();
                }}
            >
                <AddCircleOutlineIcon
                    className="iconButton"
                    fontSize="large"
                    sx={{ color: "black" }}
                />
            </IconButton>
            <IconButton
                sx={{ color: "black", marginLeft: "auto", marginRight: "20px" }}
            >
                <ExitToAppIcon className="iconExitButton" fontSize="large" />
            </IconButton>
            <Modal
                open={showModal}
                onClose={handleCloseModal}
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
                    <Typography variant="h5">Create new room</Typography>
                    <form>
                        <Box sx={{ marginTop: "20px" }}>
                            <TextField
                                label="Name"
                                variant="outlined"
                                name="name"
                                value={newRoomDetails.name}
                                onChange={handleNewRoomDetailsChange}
                                required
                            />
                        </Box>
                        <Box sx={{ marginTop: "20px" }}>
                            <TextField
                                label="Description"
                                variant="outlined"
                                name="description"
                                value={newRoomDetails.description}
                                onChange={handleNewRoomDetailsChange}
                                required
                            />
                        </Box>
                        <Box sx={{ marginTop: "20px" }}>
                            <TextField
                                label="Capacity"
                                variant="outlined"
                                name="capacity"
                                type="number"
                                value={newRoomDetails.capacity}
                                onChange={handleNewRoomDetailsChange}
                                required
                            />
                        </Box>
                        <Box sx={{ marginTop: "20px" }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    handleCreateRoom();
                                }}
                            >
                                Create
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    handleCloseModal();
                                }}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </Box>
    );
};

export default Header;
