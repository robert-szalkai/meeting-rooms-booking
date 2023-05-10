import axios from "axios";
import { MeetingRoomsData, iRoomCards } from "../interfaces/interfaces";

const getRooms = async (): Promise<MeetingRoomsData[]> => {
    //const result = await axios.get("http://localhost:3001/rooms");
    const result = await axios.get("http://localhost:3001/allRooms");
    return result.data;
};

const getAllRooms = async (): Promise<iRoomCards[]> => {
    // return (await axios.get(`http://localhost:3001/rooms/`)).data;
    return (await axios.get(`http://localhost:3001/allRooms/`)).data;
};

const getRoomById = async (id: number) => {
    // return await axios.get(`http://localhost:3001/meetingRooms/${id}`);
    return await axios.get(`http://localhost:3001/allRooms/${id}`)
};

const deleteRooms = async (id: number) => {
    //return await axios.delete(`http://localhost:3001/rooms/${id}`);
    return await axios.delete(`http://localhost:3001/allRooms/${id}`);
};

const addRoom = async (
    title: string | undefined,
    description: string | undefined,
    capacity: string | undefined
) => {
     //return await axios.post("http://localhost:3001/rooms", {
        return await axios.post("http://localhost:3001/allRooms", {
        title: title,
        description: description,
        lastBooked: "",
        capacity: capacity,
    });
};

const updateRoomData = async (
    title: string | undefined,
    description: string | undefined,
    capacity: string | undefined,
    id: number | undefined
) => {
    // return await axios.put(`http://localhost:3001/rooms/${id}`, {
        return await axios.patch(`http://localhost:3001/allRooms/${id}`, {
        
        title: title,
        description: description,
        lastBooked: "",
        capacity: capacity,
    });
};

export {
    deleteRooms,
    addRoom,
    updateRoomData,
    getRooms,
    getRoomById,
    getAllRooms,
};
