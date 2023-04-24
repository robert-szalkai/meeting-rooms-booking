import React from "react";
import { useState, useEffect } from "react";
import { Card, Typography, Box, Avatar } from "@mui/material";
import SIZE from "../../../../constants/CustomSize";
import { useNavigate } from "react-router";
import COLORS from "../../../../constants/CustomColors";
interface iUpcomingCards {
    id: string;
    start: string;
    end: string;
    persons: (string | undefined)[];
    meetingName: string;
}
const UpcomingCards = ({
    id,
    start,
    end,
    persons,
    meetingName,
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
    const [surplus, setSurplus] = useState<number>();
    useEffect(() => {
        if (persons.length > 6) {
            setSurplus(persons.length - 6);
        }
        setJoiners(getInitilas());
    }, []);
    const mapJoiners = () => {
        return joiners?.map(
            (e, index) =>
                index <= 5 && <Avatar sx={{ bgcolor: "purple" }}>{e}</Avatar>
        );
    };
    const [meetingId, setMeetingId] = useState("1");
    const navigate = useNavigate();
    const handleCardOnClick = () => {
        console.log(id);
        navigate(`meetinginfo/${id}`);
    };

    return (
        <Card
            onClick={handleCardOnClick}
            sx={{
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
            <Typography noWrap variant="h6">
                {meetingName}
            </Typography>
            <Typography variant="h5">
                Today, {start} - {end}
            </Typography>
            <Box
                sx={{
                    width: "100%",
                    marginTop: "auto",
                    display: "flex",
                    gap: "2px",
                }}
            >
                {joiners && mapJoiners()}
                {surplus && <Avatar>+{surplus}</Avatar>}
            </Box>
        </Card>
    );
};
export default UpcomingCards;
