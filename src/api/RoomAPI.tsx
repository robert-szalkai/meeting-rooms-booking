import axios from "axios";

const getRooms = async () => {
    return await axios.get("http://localhost:3001/rooms");
};

const getRoomById = async (id: number) => {
    return await axios.get(`http://localhost:3001/meetingRooms/${id}`);
};

const deleteRooms = async (id: number) => {
    return await axios.delete(`http://localhost:3001/rooms/${id}`);
};

const addRoom = async (
    name: string | undefined,
    description: string | undefined,
    capacity: string | undefined
) => {
    return await axios.post("http://localhost:3001/rooms", {
        name: name,
        description: description,
        lastBooked: "",
        capacity: capacity,
    });
};

const updateRoomData = async (
    name: string | undefined,
    description: string | undefined,
    capacity: string | undefined,
    id: number | undefined
) => {
    return await axios.put(`http://localhost:3001/rooms/${id}`, {
        name: name,
        description: description,
        lastBooked: "",
        capacity: capacity,
    });
};

export { deleteRooms, addRoom, updateRoomData, getRooms, getRoomById };
