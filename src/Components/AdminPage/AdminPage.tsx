import React from "react";
import Header from "./Header/Header";
import { Grid, Box, Container } from "@mui/material";
import MeetingRoom from "./MeetingRoom/MeetingRoom";
import EditModal from "./MeetingRoom/EditModal/EditModal";
import EditModalProps from "./MeetingRoom/EditModal/EditModal";
import ModalButton from "./MeetingRoom/EditModal/EditModal";

interface Data {
    id: number;
    title: string;
    description: string;
    lastBooked: string;
}

interface EditModalProps {
    data: Data;
    onEdit: (editedData: Data) => void;
}
const AdminPage = () => {
    return (
        <Container maxWidth="xl" sx={{ paddingTop: "50px" }}>
            <Header />
            <Grid container spacing={2}>
                <MeetingRoom />
            </Grid>
            <EditModal />
        </Container>
    );
};

export default AdminPage;
