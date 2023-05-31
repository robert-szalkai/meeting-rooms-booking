import axios from "axios";
import { MeetingRoomsData, iRoomCards } from "../interfaces/interfaces";

const getRooms = async (): Promise<MeetingRoomsData[]> => {
    const result = await axios.get("http://10.152.20.113:4000/msgraph/meetingrooms/TM");
    return result.data;
};

const getAllRooms = async (): Promise<iRoomCards[]> => {
    return (await axios.get(`http://10.152.20.113:3001/rooms/`)).data;
};

const getRoomById = async (id: string) => {
    return await axios.get(`http://10.152.20.113:3001/rooms/${id}`);
};

const deleteRooms = async (id: string) => {
    return await axios.delete(`http://10.152.20.113:3001/rooms/${id}`);
};

const addRoom = async (room: MeetingRoomsData) => {
    return await axios.post("http://10.152.20.113:3001/rooms", room);
};


const updateRoomData = async (room: MeetingRoomsData) => {
    return await axios.put(`http://10.152.20.113:3001/rooms/${room.id}`, room);
};

export {
    deleteRooms,
    addRoom,
    updateRoomData,
    getRooms,
    getRoomById,
    getAllRooms,
};
