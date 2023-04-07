import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import MeetingRooms from "../MeetingRooms/MeetingRooms";
import Box from "@mui/material/Box";

import ModalAddRoom from "../ModalAddRoom/ModalAddRoom";
import DeleteRoomModal from "../DeleteRoomModal/DeleteRoomModal";
import EditRoomModal from "../EditRoomModal/EditRoomModal";

import {
    getRoomsFromAPI,
    postRoomToAPI,
    deleteRoomFromAPI,
    patchRoomFromAPI,
} from "../handler/handler";

const AdminPage = () => {
    //State Variables

    //Modal State Variables
    const [modalAdd, setModalAdd] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);

    const [rooms, setRooms] = useState([]);

    //States for rooms
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [roomToDelete, setRoomToDelete] = useState("");
    const [roomToUpdate, setRoomToUpdate] = useState({
        id: "",
        title: "",
        description: "",
    });

    //Toggle modals
    const toggleAddModal = () => setModalAdd(!modalAdd);
    const toggleDeleteModal = () => setModalDelete(!modalDelete);
    const toggleEditModal = () => setModalEdit(!modalEdit);

    const changeNameState = (e: any) => setName(e.target.value);
    const changeDescriptionState = (e: any) => setDescription(e.target.value);

    //Get rooms from API and re-render the components
    const getRooms = () => {
        getRoomsFromAPI().then((rooms) => {
            setRooms(rooms);
            setLoaded(true);
        });
    };

    const insertRoomData = async (name: string, description: string) => {
        await postRoomToAPI(name, description);
        setLoaded(false);
    };

    const updateRoom = (name: string, description: string, roomId: string) => {
        toggleEditModal();
        setRoomToUpdate({
            id: roomId,
            title: name,
            description: description,
        });
    };

    const updateNameState = (e: any) =>
        setRoomToUpdate({
            id: roomToUpdate.id,
            title: e.target.value,
            description: roomToUpdate.description,
        });

    const updateDescriptionState = (e: any) =>
        setRoomToUpdate({
            id: roomToUpdate.id,
            title: roomToUpdate.title,
            description: e.target.value,
        });

    const deleteRoomData = (roomID: string) => {
        toggleDeleteModal();
        setRoomToDelete(roomID);
    };

    const confirmRoomUpdate = async () => {
        await patchRoomFromAPI(roomToUpdate.id, roomToUpdate);
        setLoaded(false);
    };

    const confirmRoomDeletion = async () => {
        await deleteRoomFromAPI(roomToDelete);
        setLoaded(false);
    };

    if (loaded === false) getRooms();

    return (
        <Box>
            <Box>
                <NavBar handleAdd={toggleAddModal} />
                <MeetingRooms
                    rooms={rooms}
                    deleteCardHandler={deleteRoomData}
                    updateCardHandler={updateRoom}
                />
            </Box>
            <Box>
                <ModalAddRoom
                    display={modalAdd}
                    handleClose={toggleAddModal}
                    handleNameChange={changeNameState}
                    handleDescriptionChange={changeDescriptionState}
                    addEntry={insertRoomData}
                    newName={name}
                    newDescription={description}
                />
                <DeleteRoomModal
                    display={modalDelete}
                    handleClose={toggleDeleteModal}
                    deleteCardHandler={confirmRoomDeletion}
                />
                <EditRoomModal
                    display={modalEdit}
                    handleClose={toggleEditModal}
                    handleNameChange={updateNameState}
                    handleDescriptionChange={updateDescriptionState}
                    updateEntry={confirmRoomUpdate}
                    oldName={roomToUpdate.title}
                    oldDescription={roomToUpdate.description}
                />
            </Box>
        </Box>
    );
};

export default AdminPage;
