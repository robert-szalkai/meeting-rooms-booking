import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
const Cards = ({ id }: HeaderProps) => {
    const card = (
        <React.Fragment>
            <CardContent>
                <Typography variant="h5" component="div">
                    Meeting Room Name #{id}
                </Typography>
                <Typography>
                    This meeting room is located on the 2nd floor and has a
                    small table with 6 chairs.
                </Typography>
            </CardContent>
        </React.Fragment>
    );
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">{card}</Card>
        </Box>
    );
};
interface HeaderProps {
    id: number;
}
export default Cards;
