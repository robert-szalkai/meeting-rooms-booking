import axios from "axios";
import { Dayjs } from "dayjs";

const addMeeting = async (
    Name: string | undefined,
    Description: string | undefined,
    StartDate: Dayjs,
    EndDate: Dayjs,
    Participants: number[] | undefined
) => {
    return await axios.post("http://localhost:3001/meetings", {
        meeting_name: Name,
        meeting_description: Description,
        startDate: StartDate,
        endDate: EndDate,
        participants: Participants,
    });
};

export { addMeeting };
