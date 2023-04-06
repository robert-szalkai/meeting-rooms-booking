import React, {useEffect, useState} from "react";
import MeetingRoomCard from "../MeetingRoomCard/MeetingRoomCard";
import Box from "@mui/material/Box";
import axios from "axios";
import { responsiveFontSizes } from "@mui/material";



const style = {
    width: "95%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const MeetingRooms = ({rooms}: {rooms: any}) => {


    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gridRowGap: "20px",
            }}
        >

            {
            rooms.map((roomEntry:any) =>{
                return (
                <Box sx={style}>
                    <MeetingRoomCard
                        RoomName={roomEntry.title}
                        key={roomEntry.id}
                        RoomID={roomEntry.id}
                        Description={roomEntry.description}
                        LatestBook={roomEntry.lastBooked}
                    />
                </Box>
            );
                })
                }

        </Box>
    );
};

export default MeetingRooms;
