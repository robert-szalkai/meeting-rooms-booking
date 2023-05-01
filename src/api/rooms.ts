import axios from "axios";
import { MeetingRoomsData, iRoomCards } from "../interfaces/interfaces";

const getRooms = async (): Promise<MeetingRoomsData[]> => {
    const result = await axios.get("http://localhost:3001/rooms");
    return result.data;
};

const getAllRooms = async (): Promise<iRoomCards[]> => {
    return (await axios.get(`http://localhost:3001/rooms/`)).data;
};

const getRoomById = async (id: number) => {
    return await axios.get(`http://localhost:3001/meetingRooms/${id}`);
};

const deleteRooms = async (id: number) => {
    return await axios.delete(`http://localhost:3001/rooms/${id}`);
};

const addRoom = async (
    title: string | undefined,
    description: string | undefined,
    capacity: string | undefined
) => {
    return await axios.post("http://localhost:3001/rooms", {
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
    return await axios.put(`http://localhost:3001/rooms/${id}`, {
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
