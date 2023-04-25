import React from "react";
import { Box, Grid, Typography } from "@mui/material";

import doctarigroupImage from "../../assets/images/doctarigorup.png";
import doctarigroupLogo from "../../assets/images/DoctariLogo.png";
import LoginForm from "./LoginForm";

const LoginPage = () => {
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
            <Box>
                <Grid>
                    <Grid item>
                        <Box
                            component="img"
                            sx={{
                                display: "flex",
                                width: "100%",
                                height: "100vh",
                                position: "absolute",
                                zIndex: "-1000",
                                justifyContent: "center",
                            }}
                            src={doctarigroupImage}
                        />
                    </Grid>
                    <Grid item>
                        <LoginForm />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default LoginPage;
