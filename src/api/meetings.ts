import axios from "axios";
import { Meeting } from "../interfaces/interfaces";

const addMeeting = async (meeting: Meeting) => {
    return await axios.post("http://localhost:3001/meetings", meeting);
};

const getMeetingsData = async () => {
    return await axios.get("http://localhost:3001/roomdata");
};

const getMeetings = async (): Promise<Meeting[]> => {
    const result = await axios.get("http://localhost:3001/meetings");
    return result.data;
};

export { addMeeting, getMeetings, getMeetingsData };
