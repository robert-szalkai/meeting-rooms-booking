import axios from "axios";

const getParticipants = async () => {
    return await axios.get("http://localhost:3001/participants");
};

const getRooms = async () => {
    return await axios.get("http://localhost:3001/rooms");
};

const getRoomById = async (id: number) => {
    return await axios.get(`http://localhost:3001/meetingRooms/${id}`);
};


export {getRooms, getRoomById, getParticipants}
