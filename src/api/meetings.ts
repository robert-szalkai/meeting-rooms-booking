import axios from "axios";
import { Meeting } from "../interfaces/interfaces";

const addMeeting = async (meeting: Meeting) => {
    console.log(meeting);
    alert("ASDASD")
    return await axios.post("http://localhost:4000/msgraph/events", meeting);
};

const getMeetingsData = async (meetingRoomId : string) => {
    return await axios.get(`http://localhost:4000/msgraph/meetingroom/${meetingRoomId}`);
};

const getMeetings = async (meetingRoomId : string) => {
    return await axios.get(`http://localhost:4000/msgraph/events/${meetingRoomId}`);
};

export { addMeeting, getMeetings, getMeetingsData };
