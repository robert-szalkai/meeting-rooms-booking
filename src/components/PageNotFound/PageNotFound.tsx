import React from "react";
import { Box, Button, Typography } from "@mui/material";

import doctarigroupImage from "../../assets/images/doctarigorup.png";
import doctarigroupLogo from "../../assets/images/DoctariLogo.png";
import { useNavigate } from "react-router-dom";
const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <Box>
            <Box
                component="img"
                sx={{
                    width: "100%",
                    height: "100vh",
                    position: "absolute",
                    zIndex: "-1000",
                }}
                src={doctarigroupImage}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                <Box
                    component="img"
                    src={doctarigroupLogo}
                    sx={{
                        maxWidth: 250,
                        paddingTop: 5,
                        paddingLeft: 5,
                    }}
                />
            </Box>
            <Box
                paddingTop={5}
                paddingLeft={10}
                maxWidth={1000}
                marginLeft={"auto"}
                marginRight={"auto"}
                sx={{ backgroundColor: "white", borderRadius: 10 }}
            >
                <Typography variant="h2" paddingTop={5}>
                    404
                </Typography>
                <Typography variant="h4" paddingTop={5}>
                    The page you are trying to reach is inexistent!
                </Typography>
                <Typography variant="h6" paddingTop={5}>
                    Get back to previous page.
                </Typography>
                <Box paddingTop={5} paddingBottom={5}>
                    <Button variant="contained" onClick={() => navigate(-2)}>
                        Back
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default PageNotFound;
