import axios from "axios";
import { async } from "q";
function RoomApi() {
    return {
        async GetRooms() {
            return await axios.get("http://localhost:3001/rooms");
        },
        async DeleteRooms(id: number) {
            return await axios.delete(`http://localhost:3001/rooms/${id}`);
        },
        async AddRoom(
            Name: string | undefined,
            Description: string | undefined,
            Capacity: string | undefined
        ) {
            return await axios.post("http://localhost:3001/rooms", {
                title: Name,
                description: Description,
                lastBooked: "",
                capacity: Capacity,
            });
        },
        async GetRoomById(id: number) {
            return await axios.get(`http://localhost:3001/rooms/${id}`);
        },
        async UpdateRoomData(
            Name: string | undefined,
            Description: string | undefined,
            Capacity: string | undefined,
            id: number | undefined
        ) {
            return await axios.put(`http://localhost:3001/rooms/${id}`, {
                title: Name,
                description: Description,
                lastBooked: "",
                capacity: Capacity,
            });
        },
    };
}
export default RoomApi;
