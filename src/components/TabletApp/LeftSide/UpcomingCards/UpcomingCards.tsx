import React from "react";
import { useState, useEffect } from "react";
import {
    Card,
    Typography,
    Box,
    Avatar,
    AvatarGroup,
    Grid,
} from "@mui/material";
import SIZE from "../../../../constants/CustomSize";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

import { iUpcomingCards } from "../../../../interfaces/interfaces";
import COLORS from "../../../../constants/CustomColors";

const UpcomingCards = ({
    id,
    start,
    end,
    persons,
    meetingName,
    selectedCardId,
}: iUpcomingCards) => {
    const getInitilas = () => {
        const filteredata = persons.map((e) => {
            return e
                ?.match(/(\b\S)?/g)
                ?.join("")
                .toUpperCase();
        });

        return filteredata;
    };

    const [joiners, setJoiners] = useState<(string | undefined)[]>();
    const [surplus, setSurplus] = useState<number>(0);
    const location = useLocation();
    useEffect(() => {
        if (persons.length > 6) {
            setSurplus(persons.length - 6);
        }
        setJoiners(getInitilas());
    }, []);
    const mapJoiners = () => {
        return joiners?.map(
            (e, index) =>
                index <= 5 && (
                    <Avatar
                        sx={{ bgcolor: COLORS.PURPLE, width: 28, height: 28 }}
                    >
                        <Typography fontSize={11}>{e}</Typography>
                    </Avatar>
                )
        );
    };

    const navigate = useNavigate();
    const handleCardOnClick = () => {
        navigate(`meetinginfo/${id}`);
    };

    return (
        <Card
            onClick={handleCardOnClick}
            sx={{
                border:
                    selectedCardId === id &&
                    location.pathname.includes(`/meetinginfo/${selectedCardId}`)
                        ? "4px solid purple"
                        : "none",
                height: SIZE.HEIGT_CARD,
                borderRadius: SIZE.BORDER_RADIUS_CARD,
                width: SIZE.WIDTH_CARD,
                textOverflow: "ellipsis",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                padding: "20px",
                justifyContent: "flex-start",
                gap: "2px",
                boxShadow:
                    "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                marginBottom: 2,
                ":hover": {
                    filter: "brightness(85%)",
                    backgroundColor: COLORS.WHITE,
                },
            }}
        >
            <Grid sx={{ marginLeft: "15px" }}>
                <Typography noWrap variant="h6">
                    {meetingName}
                </Typography>
                <Typography variant="h5">
                    Today, {start} - {end}
                </Typography>
            </Grid>
            <Box
                sx={{
                    width: "100%",
                    height: "34px",
                    marginTop: "auto",
                    marginLeft: "15px",
                    display: "flex",
                }}
            >
                <AvatarGroup max={8}>
                    {joiners && mapJoiners()}
                    {surplus && (
                        <Avatar
                            sx={{ bgcolor: COLORS.GRAY, width: 28, height: 28 }}
                        >
                            +{surplus}
                        </Avatar>
                    )}
                </AvatarGroup>
            </Box>
        </Card>
    );
};
export default UpcomingCards;
