import { Card, Grid, Typography } from "@mui/material";
import React from "react";

import COLORS from "../../../../../constants/CustomColors";

export default function Error() {
    return (
        <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ height: "700px", maxHeight: "100vh" }}
        >
            <Grid item mb={12}>
                <Typography color={COLORS.GRAY} variant={"h4"}>
                    ERROR 404
                </Typography>
            </Grid>
            <Grid item mb={12}>
                <Card
                    variant="outlined"
                    sx={{ maxWidth: 500, border: "none", color: COLORS.GRAY }}
                >
                    <Typography fontSize={20}>
                        It looks like you've reached a meet id URL that doesn't
                        exist. Please select another existing meeting from one
                        of the Cards on the left that you would like to display.
                    </Typography>
                </Card>
            </Grid>
        </Grid>
    );
}
