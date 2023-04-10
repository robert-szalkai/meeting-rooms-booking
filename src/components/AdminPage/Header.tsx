import React from "react";
import { useState } from "react";
import {
    Box,
    Typography,
    IconButton,
    Modal,
    TextField,
    Button,
} from "@mui/material";
import Logo from "../../assets/images/Logo.png";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: 500,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

const Header = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleClick = () => {
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
    };

    const addMeetingRoom = async () => {
        return await axios.post("http://localhost:3001/rooms", {
            title: title,
            id: 20,
            description: description,
            latestBook: "Today",
        });
    };

    return (
        <Box sx={{ display: "flex", gap: "50px", alignItems: "center" }}>
            <Box component="img" src={Logo} sx={{ height: "50px" }}></Box>
            <Typography variant="h5" fontWeight={"bold"}>
                Meeting rooms
            </Typography>
            <IconButton onClick={handleClick} sx={{ color: "black" }}>
                <ControlPointIcon />
            </IconButton>
            <IconButton sx={{ marginLeft: "auto", color: "black" }}>
                <LogoutIcon />
            </IconButton>
            <Modal
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <form onSubmit={addMeetingRoom}>
                    <Box sx={style}>
                        <Box sx={{ display: "flex", padding: 2 }}>
                            <Typography variant="h5" fontWeight={"bold"}>
                                Create Meeting Room
                            </Typography>
                            <IconButton
                                sx={{ marginLeft: "auto" }}
                                onClick={handleClose}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        <Typography paddingTop={1}>Name</Typography>
                        <TextField
                            variant="filled"
                            placeholder="Please type meeting room name"
                            fullWidth
                            value={title}
                            onChange={(e) => setTitle(e.currentTarget.value)}
                        ></TextField>
                        <Typography paddingTop={2}>Description</Typography>
                        <TextField
                            variant="filled"
                            placeholder="Please provide description"
                            fullWidth
                            multiline
                            minRows={4}
                            maxRows={4}
                            value={description}
                            onChange={(e) =>
                                setDescription(e.currentTarget.value)
                            }
                        ></TextField>
                        <Typography paddingTop={2}>Capacity</Typography>
                        <TextField
                            variant="filled"
                            placeholder="Please provide capacity "
                        ></TextField>
                        <Box
                            sx={{
                                paddingTop: 5,
                                display: "flex",
                                marginLeft: "auto",
                                columnGap: 2,
                            }}
                        >
                            <Button
                                variant="outlined"
                                sx={{ marginLeft: "auto" }}
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                            <Button variant="contained" type="submit">
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Modal>
        </Box>
    );
};

export default Header;
