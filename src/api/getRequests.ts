import axios from "axios";
import { iRoomCards } from "../interfaces/interfaces";

const getParticipants = async () => {
    return await axios.get("http://localhost:3001/participants");
};

const getRooms = async () => {
    return await axios.get("http://localhost:3001/rooms");
};

const getRoomById = async (id: number) => {
    return await axios.get(`http://localhost:3001/rooms/${id}`);
};
const getAllRooms=async () :Promise<iRoomCards[]>=>{
    return (await axios.get(`http://localhost:3001/rooms/`)).data;

}



export {getRooms, getRoomById, getParticipants, getAllRooms}
