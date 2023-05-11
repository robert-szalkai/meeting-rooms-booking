import axios from "axios";
import { UserInfo } from "../interfaces/interfaces";

const getUsers = async (): Promise<UserInfo[]> => {
    const result = await axios.get("http://localhost:3001/users");
    return result.data;
};

const getSingleUser = async (
    username: string,
): Promise<UserInfo> => {
    const result = await axios.get(
        `http://localhost:3001/participants?name=${username}`
    );
    return result.data[0];
};

export {getSingleUser, getUsers}