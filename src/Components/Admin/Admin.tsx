import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
import { Container, Modal, Grid, Box } from "@mui/material";
import Cards from "./MettingRoom/Cards";
import axios from "axios";
import MeetingRoomForm from "./MettingRoomForm/MeetingRoom";
import RoomApi from "../../HandleRequests/RoomApi";
import { async } from "q";
import { handleBreakpoints } from "@mui/system";
interface iCard {
    title: string;
    id: number;
    description: string;
    lastBooked: string;
    capacity: number;
}
const Admin = () => {
    const [showmodal, setShowModal] = useState<boolean>(false);
    const [datacontent, setDataContent] = useState<iCard[]>();
    const [loaded, setLoaded] = useState(false);
    const [showEditModal, setEditModal] = useState<boolean>(false);
    const [editDataEvent, setEditData] = useState<iCard>();

    const roomapi = RoomApi();
    const handleSubmitForm = async (
        Name: string | undefined,
        Description: string | undefined,
        Capacity: string | undefined
    ) => {
        const result = await roomapi.AddRoom(Name, Description, Capacity);
        if (result.status == 201) {
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
        const result = await roomapi.UpdateRoomData(
            Name,
            Description,
            Capacity,
            id
        );
        if (result.status == 200) {
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
        const result = await roomapi.GetRooms();
        setDataContent(result.data);
    };
    const handleDelete = async (id: number) => {
        const result = await roomapi.DeleteRooms(id);
        if (result.status == 200) {
            setLoaded(true);
        }
    };
    const handleEditOnClick = async (id: number) => {
        const result = await roomapi.GetRoomById(id);
        if (result.status == 200) {
            setEditData(result.data);
            handleClickForm(setEditModal);
        }
    };
    const displayCards = () => {
        return datacontent?.map((e) => (
            <Grid key={e.id} item xs={6}>
                <Cards
                    handleEdit={handleEditOnClick}
                    handleDelete={handleDelete}
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
        if (loaded != false) {
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
                    handleClose(setShowModal);
                }}
                open={showmodal}
            >
                <MeetingRoomForm
                    edit={false}
                    text={"Create Meeting Room"}
                    handleSubmit={handleSubmitForm}
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
                    handleClose(setEditModal);
                }}
                open={showEditModal}
            >
                <MeetingRoomForm
                    edit={true}
                    editData={editDataEvent}
                    text={"Configuration"}
                    handleSubmit={handleSubmitEdit}
                />
            </Modal>
            <Grid flexWrap="wrap" spacing={2} container>
                {datacontent && displayCards()}
            </Grid>
        </Container>
    );
};
export default Admin;
