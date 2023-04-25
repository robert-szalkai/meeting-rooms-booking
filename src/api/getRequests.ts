import axios from "axios";
import { iRoomCards } from "../interfaces/interfaces";


const getParticipantsIdName = async () => {
    return await axios.get("http://localhost:3002/participantsData");
}

const getParticipants = async (): Promise<{
    name: string;
    id: number;
}> => {
    const result = await axios.get("http://localhost:3001/participants");
    return result.data;
};

const getParticipant = async (
    _name: string
): Promise<{ name: string; id: number }> => {
    const result = await axios.get(
        `http://localhost:3001/participants?name=${_name}`
    );
    return result.data[0];

};

const getRooms = async () => {
    return await axios.get("http://localhost:3001/rooms");
};

const getRoomById = async (id: number) => {
    return await axios.get(`http://localhost:3001/rooms/${id}`);
};
const getMeetingsData = async()=>{
    return await axios.get("http://localhost:3001/roomdata")
}

const getAllRooms=async () :Promise<iRoomCards[]>=>{
    return (await axios.get(`http://localhost:3001/rooms/`)).data;
}

const getMeetings = async (): Promise<{
    room_id: number;
    owner_id: number;
    participants_id: any;
    start_time: string;
    end_time: string;
}> => {
    const result = await axios.get("http://localhost:3001/meetings");
    return result.data;
};

export { getRooms, getRoomById, getParticipants, getParticipant, getMeetings, getMeetingsData, getParticipantsIdName, getAllRooms };
