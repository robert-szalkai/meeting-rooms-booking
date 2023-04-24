import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Card, Divider } from "@mui/material";
import RoomSelectionCards from "./RoomSelectionCards";
import { iRoomCards } from "../../interfaces/interfaces";
import { getAllRooms } from "../../api/getRequests";
export const RoomSelection = () => {
    const [roomSelectionData, setRoomSelection] = useState<iRoomCards[]>();
    const getRooms = async () => {
        try {
            const data = await getAllRooms();
            setRoomSelection(data);
        } catch (error) {
            console.log(error);
        }
    };
    const mapElements=()=>{
        return roomSelectionData?.map((e)=>
        <RoomSelectionCards
          name={e.name}
          key={e.id}
          availability={e.availability}
          capacity={e.capacity}
          description={e.description}
          id={e.id}
        />

        )
    }
    useEffect(() => {
        getRooms();
    },[]);
    return (
        <Box>
            <Box
                component="img"
                sx={{
                    width: "100%",
                    height: "100vh",
                    position: "absolute",
                    zIndex: "-1000",
                }}
                src={require("../../assets/images/doctarigorup.png")}
            />
            <Container
                maxWidth="xl"
                sx={{
                    paddingTop: "60px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    height: "100vh",
                    alignItems: "center",
                    overflowY:"auto"
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        flexWrap: "wrap",
                        height: "100%",
                        gap: "30px",
                    }}
                >
                    {roomSelectionData && mapElements()}

                </Box>
            </Container>
        </Box>
    );
};
export default RoomSelection;
