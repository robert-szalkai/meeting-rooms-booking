import React, { useState } from "react";
import { Box } from "@mui/system";
import { Typography, Button } from "@mui/material";
import UpcomingCards from "./UpcomingCards/UpcomingCards";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Clock from "./Clock/Clock";
interface iLeftSide {
    roomName: string;
}

const LeftSide = ({ roomName }: iLeftSide) => {
    let currDate = new Date();
    let hoursMin;

    if (currDate.getMinutes() < 10) {
        hoursMin = currDate.getHours() + ":0" + currDate.getMinutes();
    } else {
        hoursMin = currDate.getHours() + ":" + currDate.getMinutes();
    }

    const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "short",
        year: "numeric",
    };

    const formattedDate: string = currDate.toLocaleDateString("en-US", options);
    const [time, setTime] = useState(hoursMin);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-evenly",
                color: "white",
                height: "100vh",
                gap: "20px",
                boxSizing: "border-box",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "200px",
                    gap: "10px",
                }}
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="flex-start"
                >
                    <Typography variant="h3">{roomName}</Typography>
                    <Clock />
                    <Typography variant="h3">{formattedDate}</Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    width: "100%",
                    height: "400px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "10px",
                }}
            >
                <UpcomingCards
                    meetingName="Name"
                    start="10:00"
                    end="10:20"
                    persons={[
                        "Mihai Burada",
                        "Silviu Manzur",
                        "Mita Daniel",
                        "Andrei Toba",
                        "Mihai Burada",
                        "Silviu Manzur",
                        "Mita Daniel",
                        "Andrei Toba",
                    ]}
                ></UpcomingCards>
                <UpcomingCards
                    meetingName="Name Name Name Name Name Name"
                    start="10:00"
                    end="10:20"
                    persons={[
                        "Mihai Burada",
                        "Silviu Manzur",
                        "Mita Daniel",
                        "Andrei Toba",
                        "Mihai Burada",
                        "Silviu Manzur",
                        "Mita Daniel",
                        "Andrei Toba",
                    ]}
                ></UpcomingCards>
                <Button variant="outlined" color="inherit">
                    Show More
                </Button>
            </Box>
            <Button variant="outlined" color="inherit">
                <CalendarMonthIcon />
                Quick Book
            </Button>
        </Box>
    );
};

export default LeftSide;
