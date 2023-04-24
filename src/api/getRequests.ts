import axios from "axios";

const getParticipantsIdName = async () => {
    return await axios.get("http://localhost:3002/participantsData");
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

export {getRooms, getRoomById, getParticipantsIdName, getMeetingsData}
