import axios from "axios";
import { MeetingRoomsData, iRoomCards } from "../interfaces/interfaces";

const getRooms = async (): Promise<MeetingRoomsData[]> => {
    const result = await axios.get("http://localhost:5000/rooms");
    return result.data;
};

const getAllRooms = async (): Promise<iRoomCards[]> => {
    return (await axios.get(`http://localhost:5000/rooms`)).data;
};

const getRoomById = async (id: number) => {
    return await axios.get(`http://localhost:5000/rooms/byid/${id}`);
};

const deleteRooms = async (id: number) => {
    return await axios.delete(`http://localhost:5000/rooms/${id}`);
};

const addRoom = async (room: MeetingRoomsData) => {
    return await axios.post("http://localhost:5000/rooms", room);
};


const updateRoomData = async (room: MeetingRoomsData) => {
    return await axios.put(`http://localhost:5000/rooms/${room.id}`, room);
};

const getRoomsAndMeetings = async()=>{
    return (await axios.get("http://localhost:5000/rooms/meetings")).data;
}

export {
    deleteRooms,
    addRoom,
    updateRoomData,
    getRooms,
    getRoomById,
    getAllRooms,
    getRoomsAndMeetings
};
