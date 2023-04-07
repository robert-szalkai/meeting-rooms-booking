import { Box, Typography } from "@mui/material";
import React from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";



const MeetingRoomCard = ({
    RoomName,
    RoomID,
    Description,
    LatestBook,
    deleteRoom,
    updateRoom,
}: {
    RoomName: string;
    RoomID: string;
    Description: string;
    LatestBook: string;
    deleteRoom: Function;
    updateRoom: Function;
}) => {
    return (
        <Box
            sx={{
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                width: "80%",
            }}
        >
            <Box
                sx={{
                    textAlign: "left",
                    padding: 2,
                }}
            >
                <Typography
                    id="modal-modal-title"
                    variant="h4"
                    component="h2"
                    sx={{
                        fontFamily: "IBM Plex Sans",
                        fontWeight: "bold",
                        color: "#1E3C521",
                    }}
                >
                    {RoomName} #{RoomID}
                </Typography>
            </Box>
            <Box
                sx={{
                    padding: 2,
                }}
            >
                <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{
                        textAlign: "left",
                        fontFamily: "IBM Plex Sans",
                    }}
                >
                    {Description}
                </Typography>
            </Box>
            <Box
                sx={{
                    padding: 2,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{
                            textAlign: "left",
                            fontFamily: "IBM Plex Sans",
                            fontWeight: "bold",
                        }}
                    >
                        Latest book at {LatestBook}
                    </Typography>
                    <Box>
                        <EditOutlinedIcon onClick={() =>{updateRoom(RoomName, Description, RoomID)}}/>
                        <DeleteForeverOutlinedIcon
                            sx={{
                                color: "red",
                            }}
                            onClick={()=>{deleteRoom(RoomID)}}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default MeetingRoomCard;
