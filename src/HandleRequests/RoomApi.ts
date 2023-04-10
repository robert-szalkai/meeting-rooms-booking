import axios from "axios";

const getRooms = async () => {
    return await axios.get("http://localhost:3001/rooms");
};
const deleteRooms = async (id: number) => {
    return await axios.delete(`http://localhost:3001/rooms/${id}`);
};
const addRoom = async (
    Name: string | undefined,
    Description: string | undefined,
    Capacity: string | undefined
) => {
    return await axios.post("http://localhost:3001/rooms", {
        title: Name,
        description: Description,
        lastBooked: "",
        capacity: Capacity,
    });
};
const getRoomById = async (id: number) => {
    return await axios.get(`http://localhost:3001/rooms/${id}`);
};
const updateRoomData = async (
    Name: string | undefined,
    Description: string | undefined,
    Capacity: string | undefined,
    id: number | undefined
) => {
    return await axios.put(`http://localhost:3001/rooms/${id}`, {
        title: Name,
        description: Description,
        lastBooked: "",
        capacity: Capacity,
    });
};

export { getRooms, deleteRooms, addRoom, getRoomById, updateRoomData };
