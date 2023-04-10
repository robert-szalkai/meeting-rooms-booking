import React from "react";
import Header from "./Header/Header";
import { Grid, Container } from "@mui/material";
import MeetingRoom from "./MeetingRoom/MeetingRoom";

const AdminPage = () => {
    return (
        <Container maxWidth="xl" sx={{ paddingTop: "50px" }}>
            <Header />
            <Grid container spacing={2}>
                <MeetingRoom />
            </Grid>
        </Container>
    );
};

export default AdminPage;
