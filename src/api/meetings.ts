import axios from "axios";
import { Meeting } from "../interfaces/interfaces";

const addMeeting = async (meeting: Meeting) => {
    return await axios.post("http://localhost:3001/meetings", meeting);
};

const getMeetingsData = async (meetingRoomId : string) => {
    return await axios.get(`http://localhost:4000/msgraph/meetingroom/${meetingRoomId}`);
};

const getMeetings = async (meetingRoomId : string) => {
    return await axios.get(`http://localhost:4000/msgraph/events/${meetingRoomId}`);
};

export { addMeeting, getMeetings, getMeetingsData };
