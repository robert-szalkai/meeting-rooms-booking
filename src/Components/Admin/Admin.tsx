import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
import { Container, Modal, Grid, Box } from "@mui/material";
import Cards from "./MettingRoom/Cards";
import MeetingRoomForm from "./MettingRoomForm/MeetingRoom";
import {
    getRooms,
    deleteRooms,
    addRoom,
    getRoomById,
    updateRoomData,
} from "../../HandleRequests/RoomApi";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal/DeleteConfirmationModal";

interface iCard {
    title: string;
    id: number;
    description: string;
    lastBooked: string;
    capacity: number;
}
const Admin = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [deleteRoomId, setDeleteRoomId] = useState<number | null>(null);
    const [deleteRoomTitle, setDeleteRoomTitle] = useState<string>("");
    const [datacontent, setDataContent] = useState<iCard[]>();
    const [loaded, setLoaded] = useState(false);
    const [showEditModal, setEditModal] = useState<boolean>(false);
    const [editDataEvent, setEditData] = useState<iCard>();

    const handleSubmitForm = async (
        Name: string | undefined,
        Description: string | undefined,
        Capacity: string | undefined
    ) => {
        const result = await addRoom(Name, Description, Capacity);
        if (result.status === 201) {
            setLoaded(true);
            handleClose(setShowModal);
        }
    };
    const handleSubmitEdit = async (
        Name: string | undefined,
        Description: string | undefined,
        Capacity: string | undefined,
        id?: number
    ) => {
        const result = await updateRoomData(Name, Description, Capacity, id);
        if (result.status === 200) {
            setLoaded(true);
            handleClose(setEditModal);
        }
    };
    const handleClickForm = (
        setFunction: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        setFunction(true);
    };
    const handleClose = (
        setFunction: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        setFunction(false);
    };
    const getDataContent = async () => {
        const result = await getRooms();
        setDataContent(result.data);
    };
    const handleDelete = async (id: number) => {
        const result = await deleteRooms(id);
        if (result.status === 200) {
            setLoaded(true);
            setShowDeleteModal(false);
        }
    };
    const handleEditOnClick = async (id: number) => {
        const result = await getRoomById(id);
        if (result.status === 200) {
            setEditData(result.data);
            handleClickForm(setEditModal);
        }
    };

    const handleDeleteOnClick = async (id: number) => {
        const result = await getRoomById(id);
        if (result.status === 200) {
            setDeleteRoomTitle(result.data.title);
            setDeleteRoomId(result.data.id);
            setShowDeleteModal(true);
        }
    };
    const displayCards = () => {
        return datacontent?.map((e) => (
            <Grid key={e.id} item xs={6}>
                <Cards
                    handleEdit={handleEditOnClick}
                    handleDelete={handleDeleteOnClick}
                    title={e.title}
                    id={e.id}
                    description={e.description}
                    lastBooked={e.lastBooked}
                ></Cards>
            </Grid>
        ));
    };
    useEffect(() => {
        getDataContent();
    }, []);
    useEffect(() => {
        if (loaded !== false) {
            getDataContent();
            setLoaded(false);
        }
    }, [loaded]);
    return (
        <Container maxWidth="xl" sx={{ paddingTop: "50px" }}>
            <Header
                handleClickForm={() => {
                    handleClickForm(setShowModal);
                }}
            />
            <Modal
                sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                onClose={() => {
                    setShowModal(false);
                }}
                open={showModal}
            >
                <MeetingRoomForm
                    edit={false}
                    text={"Create Meeting Room"}
                    handleSubmit={handleSubmitForm}
                    onClose={() => {
                        setShowModal(false);
                    }}
                />
            </Modal>
            <Modal
                sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                onClose={() => {
                    setEditModal(false);
                }}
                open={showEditModal}
            >
                <MeetingRoomForm
                    edit={true}
                    editData={editDataEvent}
                    text={"Configuration"}
                    handleSubmit={handleSubmitEdit}
                    onClose={() => {
                        setEditModal(false);
                    }}
                />
            </Modal>
            <DeleteConfirmationModal
                open={showDeleteModal}
                onClose={() => {
                    handleClose(setShowDeleteModal);
                }}
                onSubmit={() =>
                    deleteRoomId !== null && handleDelete(deleteRoomId)
                }
                roomTitle={deleteRoomTitle}
            />
            <Grid
                flexWrap="wrap"
                sx={{ paddingTop: "50px" }}
                spacing={2}
                container
            >
                {datacontent && displayCards()}
            </Grid>
        </Container>
    );
};
export default Admin;
