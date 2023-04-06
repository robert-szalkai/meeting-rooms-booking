import React from "react";
import Header from "./Header/Header";
import { Grid, Box, Container } from "@mui/material";
import MeetingRoom from "./MeetingRoom/MeetingRoom";

const AdminPage = () => {
    return (
        <Container maxWidth="xl" sx={{ paddingTop: "50px" }}>
            <Header />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6} xl={6}>
                    <MeetingRoom />
                </Grid>
                <Grid item xs={12} sm={6} md={6} xl={6}>
                    <MeetingRoom />
                </Grid>
                <Grid item xs={12} sm={6} md={6} xl={6}>
                    <MeetingRoom />
                </Grid>
                <Grid item xs={12} sm={6} md={6} xl={6}>
                    <MeetingRoom />
                </Grid>
            </Grid>
        </Container>
    );
};

export default AdminPage;
