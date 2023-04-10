import React from "react";
import Header from "../header/Header";
import { Container } from "@mui/material";
import Rooms from "../rooms/Rooms";
const AdminPage = () => {
    return (
        <Container sx={{ padding: "50px", maxWidth: "xl" }}>
            <Header />
            <Rooms />
        </Container>
    );
};
export default AdminPage;
