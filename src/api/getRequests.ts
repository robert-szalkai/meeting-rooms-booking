import axios from "axios";

const getParticipants = async () => {
    return await axios.get("http://localhost:3001/participants");
};

const getParticipant = async (_name: string) => {
    return await axios.get(`http://localhost:3001/participants?name=${_name}`);
};

const getRooms = async () => {
    return await axios.get("http://localhost:3001/rooms");
};

const getRoomById = async (id: number) => {
    return await axios.get(`http://localhost:3001/rooms/${id}`);
};

export { getRooms, getRoomById, getParticipants, getParticipant };
