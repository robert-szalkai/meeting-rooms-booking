import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";

import doctarigroupImage from "../../assets/images/doctarigorup.png";
import doctarigroupLogo from "../../assets/images/DoctariLogo.png";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [userType, setUserType] = useState<string>("");

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
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Grid>
                    <Grid item>
                        <LoginForm
                            username={userName}
                            password={password}
                            handleUsername={setUserName}
                            handlePassword={setPassword}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default LoginPage;
