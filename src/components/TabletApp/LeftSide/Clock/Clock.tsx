import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const Clock = () => {
    const [time, setTime] = useState("");
    const getTime = () => {
      const today = new Date();
        let currentTime:string= today.getHours() + ":" + today.getMinutes();
        setTime(currentTime);
    };

    useEffect(()=>{setInterval(
      () => getTime(),
      30000)},[])

    return <Typography variant="h2">{time}</Typography>;
};

export default Clock;
