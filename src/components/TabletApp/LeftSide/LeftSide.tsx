import React, { useRef, useState } from "react";
import { Box } from "@mui/system";
import { Button, Paper, Typography } from "@mui/material";
import UpcomingCards from "./UpcomingCards/UpcomingCards";
import "./UpcomingCardsScrollCSS.css";
interface iLeftSide {
    roomName: string;
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
    const colorStates = ["#008435", "#BCA900", "#DD6764"];

    const [availability, setAvailability] = useState(0);
    const formattedDate: string = currDate.toLocaleDateString("en-US", options);
    const [time, setTime] = useState(hoursMin);
    const displayCards = () => {
        return initialCardData
            .slice(0, cardsToShow)
            .map((e) => (
                <UpcomingCards
                    start={e.start}
                    end={e.start}
                    persons={e.persons}
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
                    paddingLeft: 10,
                    paddingTop: 10,
                }}
            >
                <Box>
                    <Typography variant="h3">{roomName}</Typography>
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
                    paddingLeft: 0.1,
                    paddingTop: 12,
                    overflow: "auto",
                }}
            >
                <Paper
                    style={{
                        backgroundColor: `${colorStates[availability]}`,
                        maxHeight: 520,
                        overflow: "auto",
                        padding: "10px",
                        marginBottom: "10px",
                        boxShadow: "none",
                    }}
                    sx={styles.root}
                >
                    <Box> {displayCards()}</Box>
                </Paper>

                {cardsToShow < initialCardData.length && (
                    <Button
                        sx={{ color: "black" }}
                        onClick={() => setCardsToShow((num) => num + 2)}
                    >
                        Show More
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default LeftSide;
