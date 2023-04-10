import React from "react";
import Cards from "./cards/Cards";
import { Box, Grid } from "@mui/material";
const Rooms = () => {
    return (
        <Grid
            container
            sx={{
                padding: "50px",
                maxWidth: "xl",
                display: "flex",
                gap: "30px 70px;",
            }}
        >
            <Grid item>
                <Cards id={1} />
            </Grid>
            <Grid item>
                <Cards id={2} />
            </Grid>
            <Grid item>
                <Cards id={3} />
            </Grid>
            <Grid item>
                <Cards id={4} />
            </Grid>
        </Grid>
    );
};
export default Rooms;
