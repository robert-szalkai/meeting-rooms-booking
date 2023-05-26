import axios from "axios";
import { Meeting, MeetingAdvancedBook } from "../interfaces/interfaces";

const addMeeting = async (meeting: Meeting|MeetingAdvancedBook) => {
    return await axios.post("http://localhost:5000/meetings", meeting);
};

const getMeetingsData = async (roomId: number) => {
    return await axios.get(`http://localhost:5000/meetings/today/${roomId}`);
};

const getMeetings = async (): Promise<Meeting[]> => {
    const result = await axios.get("http://localhost:5000/meetings");
    return result.data;
};

const getMeetingsByRoomId = async (roomId: number): Promise<Meeting[]> => {
    const result = await axios.get(
        `http://localhost:5000/meetings/roomid/${roomId}`
    );
    return result.data;
};

export { addMeeting, getMeetings, getMeetingsData, getMeetingsByRoomId };
