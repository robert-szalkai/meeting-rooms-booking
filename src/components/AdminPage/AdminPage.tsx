import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import MeetingRooms from "../MeetingRooms/MeetingRooms";
import Box from "@mui/material/Box";
import ModalAddRoom from "../ModalAddRoom/ModalAddRoom";
import axios from "axios";

const AdminPage = () => {
    const [modalAdd, setModalAdd] = useState(false);
    const [rooms, setRooms] = useState([]);

    const handleAdd = (event: any) => {
        setModalAdd(!modalAdd);
    };

    const getRooms = async () => {
        const response = await axios.get("http://localhost:3001/rooms");
        setRooms(response.data);
    };

    if (rooms.length === 0) {
        getRooms();
        console.log(typeof rooms);
    }

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleNameChange = (e: any) => {
        setName(e.target.value);
    };

    const handleDescriptionChange = (e: any) => {
        setDescription(e.target.value);
    };

    const addEntry = async () => {
        await axios.post("http://localhost:3001/rooms", {
            id: "",
            title: name,
            description: description,
            lastBooked: "",
        });
        getRooms();
    };
    return (
        <Box>
            <Box>
                <NavBar handleAdd={handleAdd} />
                <MeetingRooms rooms={rooms} />
            </Box>
            <Box>
                <ModalAddRoom
                    display={modalAdd}
                    handleClose={handleAdd}
                    handleNameChange={handleNameChange}
                    handleDescriptionChange={handleDescriptionChange}
                    addEntry={addEntry}
                />
            </Box>
        </Box>
    );
};

export default AdminPage;
