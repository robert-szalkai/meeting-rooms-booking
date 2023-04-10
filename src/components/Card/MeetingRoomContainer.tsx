import axios from "axios";
import React, { useEffect, useState } from "react";
import MeetingRoom from "./MeetingRoom";
import { Grid } from "@mui/material";

interface Room {
    id: string;
    title: string;
    description: string;
    lastBooked: string;
}

const MeetingRoomContainer = () => {
    const [rooms, setRooms] = useState<Room[]>([]);

    const getMeetingRooms = async () => {
        return await axios.get<Room[]>("http://localhost:3001/rooms").then(
            (response) => {
                return response.data;
            },
            (error) => {
                console.error(error);
                return undefined;
            }
        );
    };

    useEffect(() => {
        getMeetingRooms().then((data) => {
            if (data) setRooms(data);
        });
    }, []);

    return (
        <Grid
            container
            paddingTop={5}
            spacing={10}
            rowSpacing={3}
            minWidth={"800px"}
        >
            {rooms.map((room: Room) => {
                return (
                    <Grid item xs={10} md={6} lg={6}>
                        <MeetingRoom
                            meetingRoomName={room.title}
                            meetingRoomID={room.id}
                            meetingRoomDescription={room.description}
                            latestBook={room.lastBooked}
                        />
                    </Grid>
                );
            })}
        </Grid>
    );
};
export default MeetingRoomContainer;
