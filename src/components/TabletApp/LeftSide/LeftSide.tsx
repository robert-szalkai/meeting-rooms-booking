import React, { useRef, useState } from "react";
import { Box } from "@mui/system";
import { Button, Paper, ThemeProvider, Typography } from "@mui/material";
import UpcomingCards from "./UpcomingCards/UpcomingCards";
import "./UpcomingCardsScrollCSS.css";
import Dayjs from "dayjs";
import GlobalTheme from "../../../context/GlobalThemes";

interface iLeftSide {
    name: string | undefined;
    meetings:
        | {
              name: string;
              id: number;
              start_time: string;
              end_time: string;
              participants: string[];
          }[]
        | [];
}
interface iUpcomingCards {
    start: string;
    end: string;
    persons: string[];
}

const initialCardData: iUpcomingCards[] = [
    {
        start: "Focus Room",
        end: "Tue Apr 03 2023 16:46:29 GMT+0300",
        persons: ["ana beluci", "oana mari"],
    },
    {
        start: "Round up Room",
        end: "Tue Apr 03 2023 16:46:29 GMT+0300",
        persons: ["ana beluci", "oana maria"],
    },
    {
        start: "Round up Room",
        end: "Tue Apr 03 2023 16:46:29 GMT+0300",
        persons: ["ana beluci", "oana maria"],
    },
    {
        start: "Round up Room",
        end: "Tue Apr 03 2023 16:46:29 GMT+0300",
        persons: ["ana beluci", "oana maria"],
    },
    {
        start: "Round up Room",
        end: "Tue Apr 03 2023 16:46:29 GMT+0300",
        persons: ["ana beluci", "oana maria"],
    },
    {
        start: "New Meeting Room",
        end: "Tue Apr 03 2023 16:46:29 GMT+0300",
        persons: ["ana beluci", "oana maria"],
    },
    {
        start: "Hello",
        end: "Tue Apr 03 2023 16:46:29 GMT+0300",
        persons: ["ana beluci", "oana maria"],
    },
    {
        start: "Wow",
        end: "Tue Apr 03 2023 16:46:29 GMT+0300",
        persons: ["ana beluci", "oana maria"],
    },
];

const LeftSide = ({ name, meetings }: iLeftSide) => {
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
    const colorStates = ["#008435", "#BCA900", "#DD6764"];

    const [availability, setAvailability] = useState(1);
    const formattedDate: string = currDate.toLocaleDateString("en-US", options);
    const [time, setTime] = useState(hoursMin);
    const displayCards = () => {
        return meetings
            ?.slice(0, cardsToShow)
            .map((e) => (
                <UpcomingCards
                    start={Dayjs(e.start_time).format("HH:MM")}
                    end={Dayjs(e.end_time).format("HH:MM")}
                    persons={e.participants}
                    meetingName={e.name}
                />
            ));
    };
    const [cardsToShow, setCardsToShow] = useState(2);

    const styles = {
        root: {
            overflow: "auto",
            "&::-webkit-scrollbar": {
                display: "none",
            },
            "&::-webkit-overflow-scrolling": "touch",
        },
    };

    return (

        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-evenly",
                color: "white",
                height: "100vh",
                boxSizing: "border-box",
            }}
        >

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    color: "white",
                    justifyContent: "space-evenly",
                    height: "100vh",
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
                    }}
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="flex-start"
                    >
                        <Typography variant="h3">{name}</Typography>
                        <Typography variant="h2">{time}</Typography>

                        <Typography variant="h3">{formattedDate}</Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        color: "white",
                        justifyContent: "space-evenly",
                        height: "100vh",
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
                        }}
                    >
                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="flex-start"
                        >
                            <Typography variant="h3">{name}</Typography>
                            <Typography variant="h2">{time}</Typography>

                            <Typography variant="h3">
                                {formattedDate}
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            color: "white",
                            paddingLeft: 0.1,
                            paddingTop: 12,
                            overflow: "auto",
                        }}
                    >
                        <Paper
                            style={{
                                // backgroundColor: `${colorStates[availability]}`,
                                backgroundColor: "transparent",
                                height: "400px",
                                overflow: "auto",
                                gap: "10px",
                                marginBottom: "10px",
                                boxShadow: "none",
                                opacity: 1,
                            }}
                            sx={styles.root}
                        >
                            <Box> {displayCards()}</Box>
                        </Paper>

                        {cardsToShow < meetings?.length && (
                            <Button
                                variant="outlined"
                                color="inherit"
                                sx={{ color: "black" }}
                                onClick={() => setCardsToShow((num) => num + 2)}
                            >
                                Show More
                            </Button>
                        )}
                        {cardsToShow === meetings?.length && (
                            <Button
                                variant="outlined"
                                color="inherit"
                                onClick={() => setCardsToShow((num) => 2)}
                            >
                                Show Less
                            </Button>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default LeftSide;
