import React from "react";
import Header from "./Header/Header";
import { Grid, Box, Container } from "@mui/material";
import MeetingRoom from "./MeetingRoom/MeetingRoom";
import EditModal from "./MeetingRoom/EditModal/EditModal";
import EditModalProps from "./MeetingRoom/EditModal/EditModal";
import ModalButton from "./MeetingRoom/EditModal/EditModal";
import MockData from "./MeetingRoom/EditModal/MockData";

const AdminPage = () => {
    return (
        <Container maxWidth="xl" sx={{ paddingTop: "50px" }}>
            <Header />
            <Grid container spacing={2}>
                {/* <MeetingRoom /> */}
            </Grid>
            <MockData />
        </Container>
    );
};

export default AdminPage;
