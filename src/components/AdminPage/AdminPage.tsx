import React from "react";
import { Container } from "@mui/material";
import Header from "./Header";
import MeetingRoomContainer from "../Card/MeetingRoomContainer";

const AdminPage = () => {
    return (
        <Container sx={{ maxWidth: "80%", minWidth: "80%", padding: "50px" }}>
            <Header />
            <MeetingRoomContainer />
        </Container>
    );
};

export default AdminPage;
