import React from "react";
import Header from "./Header/Header";
import { Container, Grid } from "@mui/material";
import MeetingRoom from "../MeetingRoom/MeetingRoom";
import { useEffect, useState } from "react";
import axios from "axios";

type CardData = {
    id: string;
    title: string;
    description: string;
    lastBooked: string;
};
const AdminPage = () => {
    const [post, setPost] = useState<CardData[]>([]);

    useEffect(() => {
        axios.get("http://localhost:3001/rooms").then((request) => {
            console.log(request);
            setPost(request?.data);
        });
    }, []);

    return (
        <Container maxWidth="xl">
            <Header />
            <Grid container spacing={4}>
                {post.map((item) => {
                    return (
                        <Grid item key={item?.id} xs={6}>
                            <MeetingRoom
                                id={item?.id}
                                title={item?.title}
                                description={item?.description}
                                lastBooked={item?.lastBooked}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
};

export default AdminPage;
