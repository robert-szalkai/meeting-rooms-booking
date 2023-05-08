import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
import { Container, Modal, Grid } from "@mui/material";
import Cards from "./MeetingRoom/Cards";
import MeetingRoomForm from "./MeetingRoomForm/MeetingRoom";
import DeleteConfirmationModal from "./DeleteConfirmationModal/DeleteConfirmationModal";
import {
    deleteRooms,
    addRoom,
    updateRoomData,
    getRooms,
    getRoomById,
} from "../../api/rooms";
import { MeetingRoomsData } from "../../interfaces/interfaces";

const Admin = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [deleteRoomId, setDeleteRoomId] = useState<number | null>(null);
    const [deleteRoomTitle, setDeleteRoomTitle] = useState<string>("");
    const [datacontent, setDataContent] = useState<MeetingRoomsData[]>();
    const [loading, setLoading] = useState(false);
    const [showEditModal, setEditModal] = useState<boolean>(false);
    const [editDataEvent, setEditData] = useState<MeetingRoomsData>();

    const handleSubmitForm = async (
        Name: string | undefined,
        Description: string | undefined,
        Capacity: string | undefined
    ) => {
        const result = await addRoom(Name, Description, Capacity);
        if (result.status === 200) {
            setLoading(true);
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
            setLoading(true);
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
        setDataContent(result);
    };
    const handleDelete = async (id: number) => {
        const result = await deleteRooms(id);
        if (result.status === 200) {
            setLoading(true);
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
      const filteredata=datacontent?.filter((e)=>{
        return e.id==id ;
      })
            if(filteredata){
            setDeleteRoomTitle(filteredata[0].title );
            setDeleteRoomId(filteredata[0].id);
            setShowDeleteModal(true);
        }

        
    };
    const displayCards = () => {
        return datacontent?.map((e) => (
            <Grid  key={e.id} item xs={12} md={6} lg={6}>
                <Cards
                    handleEdit={handleEditOnClick}
                    handleDelete={handleDeleteOnClick}
                    title={e.title}
                    id={e.id}
                    description={e.description}
                    lastBooked={e.lastBooked}
                    capacity={e.capacity}
                ></Cards>
            </Grid>
        ));
    };
    useEffect(() => {
        getDataContent();
    }, []);
    useEffect(() => {
        if (loading !== false) {
            getDataContent();
            setLoading(false);
        }
    }, [loading]);
    return (
        <Container maxWidth="xl" sx={{ paddingTop: "50px" }}>
            <Header
                handleClickForm={() => {
                    handleClickForm(setShowModal);
                }}
            />
            <Modal
                data-testid="newroommodal"
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
