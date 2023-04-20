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

const getMeetings = async (): Promise<{
    data: {
        room_id: number;
        owner_id: number;
        participants_id: any;
        start_time: string;
        end_time: string;
    };
}> => {
    return await axios.get("http://localhost:3001/meetings");
};

export { getRooms, getRoomById, getParticipants, getParticipant, getMeetings };
