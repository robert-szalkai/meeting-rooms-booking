import React from "react";
import { useState, useEffect } from "react";
<<<<<<< HEAD:src/components/TabletApp/LeftSide/UpcomingCards/UpcomingCards.tsx
import { Card, Typography, Box, Avatar } from "@mui/material";
import SIZE from "../../../../constants/CustomSize";
=======
import {
    Card,
    Typography,
    Box,
    Avatar,
    CardContent,
    Button,
    List,
    ListItem,
    ListItemText,
    Paper,
} from "@mui/material";
import SIZE from "../../CustomSize";
>>>>>>> 9328e20 (show cards by pressing show more, show 2 more and so on):src/Components/TabletApp/UpcomingCards.tsx
interface iUpcomingCards {
    start: string;
    end: string;
    persons: string[];
    meetingName:string;
}
<<<<<<< HEAD:src/components/TabletApp/LeftSide/UpcomingCards/UpcomingCards.tsx
const UpcomingCards = ({ start, end, persons,meetingName}: iUpcomingCards) => {
=======

// export const initialCardData: iUpcomingCards[] = [
//     {
//         start: "Focus Room",
//         end: "Tue Apr 03 2023 16:46:29 GMT+0300",
//         persons: ["ana beluci", "oana, maria"],
//     },
//     {
//         start: "Round up Room",
//         end: "Tue Apr 03 2023 16:46:29 GMT+0300",
//         persons: ["ana beluci", "oana, maria"],
//     },
//     {
//         start: "Round up Room",
//         end: "Tue Apr 03 2023 16:46:29 GMT+0300",
//         persons: ["ana beluci", "oana, maria"],
//     },
//     {
//         start: "Round up Room",
//         end: "Tue Apr 03 2023 16:46:29 GMT+0300",
//         persons: ["ana beluci", "oana, maria"],
//     },
//     {
//         start: "Round up Room",
//         end: "Tue Apr 03 2023 16:46:29 GMT+0300",
//         persons: ["ana beluci", "oana maria"],
//     },
//     {
//         start: "New Meeting Room",
//         end: "Tue Apr 03 2023 16:46:29 GMT+0300",
//         persons: ["ana beluci", "oana, maria"],
//     },
//     {
//         start: "Hello",
//         end: "Tue Apr 03 2023 16:46:29 GMT+0300",
//         persons: ["ana beluci", "oana, maria"],
//     },
//     {
//         start: "Wow",
//         end: "Tue Apr 03 2023 16:46:29 GMT+0300",
//         persons: ["ana beluci", "oana, maria"],
//     },
// ];

const UpcomingCards = ({ start, end, persons }: iUpcomingCards) => {
>>>>>>> 9328e20 (show cards by pressing show more, show 2 more and so on):src/Components/TabletApp/UpcomingCards.tsx
    const getInitilas = () => {
        const filteredata = persons.map((e) => {
            return e
                .match(/(\b\S)?/g)
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

    // const [cardData, setCardData] = useState(initialCardData);
    // const [showAll, setShowAll] = useState(false);

    // const toggleShowAll = () => setShowAll((prev) => !prev);

    // return (
    //     <Box>
    //         <Box
    //             style={{
    //                 display: "flex",
    //                 justifyContent: "space-between",
    //                 maxHeight: "400px",
    //                 overflowY: "auto",
    //                 marginTop: 10,
    //             }}
    //         >
    //             <Box style={{ maxHeight: 400, overflow: "auto" }}>
    //                 {cardData
    //                     .slice(0, showAll ? cardData.length : 2)
    //                     .map((data) => (
    //                         <Card
    //                             sx={{
    //                                 width: SIZE.WIDTH_CARD,
    //                                 height: SIZE.HEIGT_CARD,
    //                                 borderRadius: SIZE.BORDER_RADIUS_CARD,
    //                                 display: "flex",
    //                                 flexDirection: "column",
    //                                 padding: "20px",
    //                                 justifyContent: "flex-start",
    //                                 gap: "2px",
    //                                 boxShadow:
    //                                     "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
    //                                 marginTop: 10,
    //                             }}
    //                         >
    //                             <Typography variant="h6">
    //                                 Upcoming Meeting
    //                             </Typography>
    //                             <Typography variant="h5">
    //                                 Today, {data.start} - {data.end}
    //                             </Typography>
    //                             <Box
    //                                 sx={{
    //                                     width: "100%",
    //                                     marginTop: "auto",
    //                                     display: "flex",
    //                                     gap: "2px",
    //                                 }}
    //                             >
    //                                 {joiners && mapJoiners()}
    //                                 {surplus && <Avatar>+{surplus}</Avatar>}
    //                             </Box>
    //                         </Card>
    //                     ))}
    //             </Box>
    //         </Box>
    //         {cardData.length > 2 && (
    //             <Box style={{ textAlign: "center", marginTop: 2 }}>
    //                 <Button
    //                     onClick={toggleShowAll}
    //                     variant="contained"
    //                     color="primary"
    //                 >
    //                     {showAll ? "Show less" : "Show more"}
    //                 </Button>
    //             </Box>
    //         )}
    //     </Box>
    // );

    // return (
    //     <div>
    //         <div
    //             style={{
    //                 display: "flex",
    //                 justifyContent: "space-between",
    //                 maxHeight: "400px",
    //                 overflowY: "auto",
    //                 marginTop: 10,
    //             }}
    //         >
    //             <Paper style={{ maxHeight: 400, overflow: "auto" }}>
    //                 {cardData
    //                     .slice(0, showAll ? cardData.length : 2)
    //                     .map((data) => (
    //                         <Card
    //                             key={data.start}
    //                             sx={{ minWidth: 275, marginBottom: 2 }}
    //                         >
    //                             <CardContent>
    //                                 <h2>{data.start}</h2>
    //                                 <p>{data.end}</p>
    //                                 <p>{data.persons}</p>
    //                             </CardContent>
    //                         </Card>
    //                     ))}
    //             </Paper>
    //         </div>
    //         {cardData.length > 2 && (
    //             <div style={{ textAlign: "center", marginTop: 2 }}>
    //                 <Button
    //                     onClick={toggleShowAll}
    //                     variant="contained"
    //                     color="primary"
    //                 >
    //                     {showAll ? "Show less" : "Show more"}
    //                 </Button>
    //             </div>
    //         )}

    {
        /* {showAll && (
                <List
                    sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                    }}
                >
                    {cardData.slice(2).map((data) => (
                        <ListItem key={data.start} sx={{ marginBottom: 2 }}>
                            <ListItemText
                                primary={data.start}
                                secondary={data.end}
                            />
                        </ListItem>
                    ))}
                </List>
            )} */
    }
    //     </div>
    // );

    return (
        <Card
            sx={{
                height: SIZE.HEIGT_CARD,
                borderRadius: SIZE.BORDER_RADIUS_CARD,
                width:SIZE.WIDTH_CARD,
                textOverflow:"ellipsis",
                overflow:"hidden",
                display: "flex",
                flexDirection: "column",
                padding: "20px",
                justifyContent: "flex-start",
                gap: "2px",
                boxShadow:
                    "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
            }}
        >
            <Typography noWrap variant="h6">{meetingName}</Typography>
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
