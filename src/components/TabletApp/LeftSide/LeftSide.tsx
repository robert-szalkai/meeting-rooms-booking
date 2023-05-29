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
import {getParticipants, getParticipantsIdName} from "../../../api/participants";
import CONSTANTS from "../../../constants/Constants";
import {iLeftSide, Participant, participantsID} from "../../../interfaces/interfaces";
const LeftSide = ({
    displayName,
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

    const [participantsData, setParticipantsData] = useState<Participant[]>();

    const getParticipantsData = async () => {
        const response = await getParticipants();
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

    const getNames = (participants: {emailAddress:{name:string,address:string}}[]) => {
        let names: string[] = [];
        for(const participant of participants){
            names.push(participant.emailAddress.name)
        }
        return names;
    };

    const displayCards = () => {
        return meetings
            ?.slice(0, cardsToShow)
            .map((e) => (
                <UpcomingCards
                    id={e.id}
                    start={Dayjs(e.start.dateTime).format("HH:mm")}
                    end={Dayjs(e.end.dateTime).format("HH:mm")}
                    persons={getNames(e.attendees)}
                    meetingName={e.subject}
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
                        {displayName ? (
                            <Typography variant="h4">{displayName}</Typography>
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
