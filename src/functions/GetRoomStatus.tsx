import CONSTANTS from "../constants/Constants";
import dayjs from "dayjs";
import { getMeetings } from "../api/getRequests";

const GetRoomStatus = async () => {
    const allMeetings = await getMeetings();
    let inMeetingRightNow = false;
    let willFollow = false;

    Object.values(allMeetings).forEach((meeting) => {
        const diffInMinutesStartTime = dayjs(meeting.startDate).diff(
            dayjs(),
            "minute",
            true
        );

        const diffInMinutesEndTime = dayjs(meeting.endDate).diff(
            dayjs(),
            "minute",
            true
        );

        if (diffInMinutesStartTime < 0 && diffInMinutesEndTime > 0) {
            inMeetingRightNow = true;
        }

        if (
            diffInMinutesStartTime > 0 &&
            diffInMinutesStartTime <= CONSTANTS.MAX_QUICKBOOK_DURATION
        ) {
            willFollow = true;
        }
    });
    // if (inMeetingRightNow) {
    //     setAvailability(CONSTANTS.MEETING_IN_PROGRESS);
    //     return;
    // }
    // if (willFollow) {
    //     setAvailability(CONSTANTS.MEETING_WILL_FOLLOW);
    //     return;
    // }
    // setAvailability(CONSTANTS.ROOM_AVAILABLE);
};

export default GetRoomStatus;
