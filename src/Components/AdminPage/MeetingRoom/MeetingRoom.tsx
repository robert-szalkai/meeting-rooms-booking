import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { GetData } from "./APIfunctions";
//import { handleDelete } from "./APIfunctions";
import EditModal from "./EditModal/EditModal";

import {
    Card,
    Typography,
    CardContent,
    CardActions,
    Button,
    Grid,
    Modal,
    Box,
} from "@mui/material";
import axios from "axios";
import MockData from "./EditModal/MockData";

function MeetingRoom() {
    const [data, setData] = useState([]);
    //const [loaded, setLoaded] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const modalContent = (
        <Box
            sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
            }}
        >
            <Typography variant="h6" component="h2">
                Modal Title
            </Typography>
            <Typography variant="body2" component="p">
                Modal content goes here...
            </Typography>
        </Box>
    );

    const handleDelete = async (id: any) => {
        try {
            await axios.delete(`http://localhost:3001/rooms/${id}`);
            setData(data.filter((item: any) => item.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        async function getData() {
            const result = await GetData();
            setData(result);
        }
        getData();
    }, []);

    return (
        <Grid container spacing={2}>
            {data.map((item: any) => (
                <Grid item xs={12} sm={6} md={6} xl={6} key={item.id}>
                    <Card
                        sx={{
                            minWidth: 275,
                            borderRadius: 3,
                            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="h4"
                                fontFamily="IBM Plex Sans"
                                sx={{ fontSize: 25 }}
                                color="#1E3C52"
                                gutterBottom
                            >
                                {item.title}
                            </Typography>
                            <br />
                            <br />

                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                {item.description}
                            </Typography>
                            <Typography variant="body2">
                                Last Booked at {item.lastBooked}
                                <br />
                            </Typography>
                        </CardContent>

                        <CardActions sx={{ justifyContent: "flex-end" }}>
                            <MockData />
                            <Button
                                size="small"
                                onClick={() => handleDelete(item.id)}
                            >
                                <DeleteForeverIcon
                                    sx={{ color: "red" }}
                                ></DeleteForeverIcon>
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default MeetingRoom;
