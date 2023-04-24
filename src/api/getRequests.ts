import axios from "axios";

const getParticipants = async ()=> {
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

const getMeetings = async () => {
    const result = await axios.get("http://localhost:3001/meetings");
    return result.data;
};

export { getRooms, getRoomById, getParticipants, getParticipant, getMeetings };
