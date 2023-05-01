import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Typography, Button, Box, Skeleton, Paper } from "@mui/material";
import dayjs from "dayjs";
import Dayjs from "dayjs";

import UpcomingCards from "./UpcomingCards/UpcomingCards";
import "./UpcomingCardsScrollCSS.css";
import QuickBookGlobal from "./QuickBookGlobal/QuickBookGlobal";
import AdvancedBookGlobal from "./AdvancedBookGlobal/AdvancedBookGlobal";
import Clock from "./Clock/Clock";
import { getParticipantsIdName } from "../../../api/participants";
import CONSTANTS from "../../../constants/Constants";
import { participantsID } from "../../../interfaces/interfaces";

interface iLeftSide {
    name: string | undefined;
    meetings: {
        name: string;
        id: string;
        start_time: string;
        end_time: string;
        participants_id: [];
    }[];
    availability: number;
    selectedCardId: string;
    onClickQuickBookGlobal: () => void;
}

const LeftSide = ({
    name,
    meetings,
    availability,
    selectedCardId,
    onClickQuickBookGlobal,
}: iLeftSide) => {
    let currDate = new Date();
    let hoursMin;
    const formattedDate = dayjs().format(CONSTANTS.TODAY);

    const [showQuickBookButton, setShowQuickBookButton] = useState(true);
    const location = useLocation();
    const { meetid } = useParams<string>();

    const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "short",
        year: "numeric",
    };
    const colorStates = ["#008435", "#BCA900", "#DD6764"];

    const [participantsData, setParticipantsData] = useState<participantsID>();

    const getParticipantsData = async () => {
        const response = await getParticipantsIdName();
        setParticipantsData(response);
    };
    useEffect(() => {
        getParticipantsData();
    }, []);
    useEffect(() => {
        if (
            availability === CONSTANTS.MEETING_IN_PROGRESS ||
            location.pathname.includes("menu")
        ) {
            setShowQuickBookButton(false);
            return;
        }
        setShowQuickBookButton(true);
    }, [availability, location]);

    const getNames = (ids: string[]) => {
        return (
            participantsData?.participants
                .filter((participants) => ids.includes(participants.id))
                .map((value) => value.name) || []
        );
    };

    const [time, setTime] = useState(hoursMin);
    const displayCards = () => {
        return meetings
            ?.slice(0, cardsToShow)
            .map((e) => (
                <UpcomingCards
                    id={e.id}
                    start={Dayjs(e.start_time).format("HH:MM")}
                    end={Dayjs(e.end_time).format("HH:MM")}
                    persons={getNames(e.participants_id)}
                    meetingName={e.name}
                    selectedCardId={selectedCardId}
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
                        marginTop={16}
                        marginLeft={-20}
                    >
                        {name ? (
                            <Typography variant="h4">{name}</Typography>
                        ) : (
                            <Skeleton
                                variant="rectangular"
                                width={210}
                                height={18}
                            />
                        )}

                        <Clock />

                        <Typography variant="h4">{formattedDate}</Typography>
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
                            backgroundColor: "transparent",
                            height: "420px",
                            overflow: "auto",
                            gap: "10px",
                            marginBottom: "10px",
                            boxShadow: "none",
                            opacity: 1,
                        }}
                        sx={styles.root}
                    >
                        <Box> {participantsData && displayCards()}</Box>
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
                    {cardsToShow >= meetings?.length && (
                        <Button
                            variant="outlined"
                            color="inherit"
                            onClick={() => setCardsToShow((num) => 2)}
                        >
                            Show Less
                        </Button>
                    )}
                </Box>
                {showQuickBookButton ? (
                    <QuickBookGlobal
                        onClickQuickBookGlobal={onClickQuickBookGlobal}
                    />
                ) : availability === CONSTANTS.MEETING_IN_PROGRESS ? (
                    <AdvancedBookGlobal />
                ) : null}
            </Box>
        </Box>
    );
};

export default LeftSide;
