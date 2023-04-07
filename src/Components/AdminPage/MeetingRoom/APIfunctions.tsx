import axios from "axios";
import { useEffect, useState } from "react";

// export async function fetchData() {
//     const response = await axios.get("https://api.example.com/data");
//     return response.data;
// }

export async function GetData() {
    const response = await axios.get(`http://localhost:3001/rooms`);
    return response.data;
}

// export const handleDelete = async (id: any) => {
//     try {
//         await axios.delete(`http://localhost:3001/data/${id}`);
//     } catch (error) {
//         console.error(error);
//     }
// };
