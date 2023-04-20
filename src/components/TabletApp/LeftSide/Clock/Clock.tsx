import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

const Clock = () => {
    const [time, setTime] = useState("");
    const getTime = () => {
        const currentTime = dayjs().format("HH:mm").toString();
        setTime(currentTime);
    };

    useEffect(() => {
        const clock = setInterval(() => getTime(), 1000);
        return () => 
            clearInterval(clock);
    }, []);

    return <Typography variant="h2">{time}</Typography>;
};

export default Clock;
