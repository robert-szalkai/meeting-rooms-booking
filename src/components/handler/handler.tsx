import axios from "axios";

         export const getRoomsFromAPI = async () => {
            const response = await axios.get("http://localhost:3001/rooms");
            return response.data;
        }

        export const postRoomToAPI = async (name: string, description: string) => {
            await axios.post("http://localhost:3001/rooms", {
                id: "",
                title: name,
                description: description,
                lastBooked: "",
            });
            getRoomsFromAPI();
        }

        export const deleteRoomFromAPI = async (id:string) => {
            await axios.delete(`http://localhost:3001/rooms/${id}`)
        }

        export const patchRoomFromAPI = async (id:string, newData : any) => {
            await axios.patch(`http://localhost:3001/rooms/${id}`, newData)
        }
