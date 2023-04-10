// import React, { useEffect, useState } from "react";
// import {
//     Card,
//     Grid,
//     Typography,
//     IconButton,
//     CardActions,
//     CardContent,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import axios from "axios";
// import { Room } from "./Room";
// import { DeleteConfirmationModal } from "../Modal/DeleteConfirmationModal";
// //import "./MeetingRoom.css";
// import "./MeetingRoom.css";

// async function GetData(): Promise<Room[]> {
//     const response = await axios.get(`http://localhost:3001/rooms`);
//     return response.data;
// }

// function MeetingRoom() {
//     const [rooms, setRooms] = useState<Room[]>([]);
//     const [deleteRoomId, setDeleteRoomId] = useState<number | null>(null);
//     const [deleteRoomTitle, setDeleteRoomTitle] = useState<string>("");
//     const [openModal, setOpenModal] = useState<boolean>(false);

//     async function fetchData() {
//         const data = await GetData();
//         setRooms(data);
//     }

//     useEffect(() => {
//         fetchData();
//     }, []);

//     async function handleDeleteRoom(id: number) {
//         if (id !== null) {
//             try {
//                 await axios.delete(`http://localhost:3001/rooms/${id}`);
//                 setOpenModal(false);
//                 setDeleteRoomId(null);
//                 fetchData();
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//     }

//     return (
//         <Grid container spacing={3}>
//             {rooms.map((room) => (
//                 <Grid item xs={12} sm={6} md={6} lg={6} key={room.id}>
//                     <Card className="meeting-room-card">
//                         <CardContent className="card-content">
//                             <Typography className="meeting-room-name">
//                                 {room.title}
//                             </Typography>
//                             <Typography className="meeting-room-description">
//                                 {room.description}
//                             </Typography>
//                             <Typography className="meeting-room-last-booked">
//                                 Latest book at {room.lastBooked}
//                             </Typography>
//                         </CardContent>
//                         <CardActions className="meeting-room-actions">
//                             <IconButton className="meeting-room-edit-button">
//                                 <EditIcon fontSize="large" />
//                             </IconButton>
//                             <IconButton
//                                 className="meeting-room-delete-button"
//                                 onClick={() => {
//                                     setDeleteRoomId(room.id);
//                                     setOpenModal(true);
//                                     setDeleteRoomTitle(room.title);
//                                 }}
//                             >
//                                 <DeleteForeverIcon fontSize="large" />
//                             </IconButton>
//                         </CardActions>

//                         <DeleteConfirmationModal
//                             open={openModal}
//                             onClose={() => {
//                                 setOpenModal(false);
//                                 setDeleteRoomId(null);
//                             }}
//                             onSubmit={() =>
//                                 deleteRoomId !== null &&
//                                 handleDeleteRoom(deleteRoomId)
//                             }
//                             roomTitle={deleteRoomTitle}
//                         />
//                     </Card>
//                 </Grid>
//             ))}
//         </Grid>
//     );
// }

// export default MeetingRoom;
