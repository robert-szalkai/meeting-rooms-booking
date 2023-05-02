import axios from "axios";
import { userInfo } from "../interfaces/interfaces";

const getUsers = async (): Promise<userInfo[]> => {
    const result = await axios.get("http://localhost:3001/users");
    return result.data;
};

const getUser = async (
    username: string,
): Promise<userInfo> => {
    const result = await axios.get(
        `http://localhost:3001/participants?name=${username}`
    );
    return result.data[0];
};

export {getUser, getUsers}