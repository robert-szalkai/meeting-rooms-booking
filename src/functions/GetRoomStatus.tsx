import CONSTANTS from "../constants/Constants";
import dayjs from "dayjs";
import { Meeting } from "../interfaces/interfaces";

const getRoomStatus = (allMeetings: Meeting[]) => {
    let inMeetingRightNow = false;
    let willFollow = false;
    if(allMeetings !== undefined)
    allMeetings.forEach((meeting) => {
        const diffInMinutesStartTime = dayjs(meeting.start.dateTime).diff(
            dayjs(),
            "minute",
            true
        );

        const diffInMinutesEndTime = dayjs(meeting.end.dateTime).diff(
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

    if (inMeetingRightNow) {
        return CONSTANTS.MEETING_IN_PROGRESS;
    }
    if (willFollow) {
        return CONSTANTS.MEETING_WILL_FOLLOW;
    }
    return CONSTANTS.ROOM_AVAILABLE;
};

export default getRoomStatus;
