import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import CONSTANTS from "../../../../constants/constants";

const Clock = () => {
    const [time, setTime] = useState(dayjs().format(CONSTANTS.TIME_NOW));
    const getTime = () => {
        const currentTime = dayjs().format(CONSTANTS.TIME_NOW);
        setTime(currentTime);
    };

    useEffect(() => {
        const clock = setInterval(() => getTime(), 1000);
        return () => clearInterval(clock);
    }, []);

    return <Typography variant="h2">{time}</Typography>;
};

export default Clock;
