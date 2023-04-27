// import React from "react";
// import { Box, Button, Typography } from "@mui/material";
// import { purple } from "@mui/material/colors";

import { Box, Card, Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

// const primary = purple[500]; // #f44336

// function Error() {
//     return (
//         <Box
//             sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 flexDirection: "column",
//                 minHeight: "100vh",
//                 backgroundColor: "white",
//             }}
//         >
//             <Typography
//                 variant="h1"
//                 sx={{ color: "purple", lightingColor:"black", fontWeight:"bold"}}
//             >
//                 404 ..not found
//             </Typography>
//             <Box
//                 sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     flexDirection: "column",
//                     minHeight: "40vh",
//                     backgroundColor: "white",
//                 }}
//             >
//                 <Typography variant="h6" style={{ color: "black" }}>
//                     Meeting id not found, please select another meeting from one
//                     of the Cards on the left.
//                 </Typography>
//             </Box>
//         </Box>
//     );
// }
// export default Error;

export default function Error() {
    return (
        <Grid
            container spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ height: "700px", maxHeight: "100vh" }}
        >
            <Grid item mb={12}>
            <Typography color={"grey"} variant={"h4"}>
                ERROR 404
            </Typography>
            </Grid>
            <Grid item mb={12}>
            <Card
                variant="outlined"
                sx={{ maxWidth: 500, border: "none", color: "grey" }}
            >
                <Typography fontSize={20} >
                    It looks like you've reached a meet id URL that doesn't
                    exist. Please select another existing meeting from one of
                    the Cards on the left that you would like to display.
                </Typography>
            </Card>
            </Grid>
        </Grid>
    );
}
