import React from "react";
import { Box, Button, Grid, InputLabel, TextField } from "@mui/material";

const LoginForm = () => {
    return (
        <Box
            sx={{
                background: "white",
                maxWidth: 500,
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
            }}
        >
            <Grid>
                <Grid item sx={{ display: "flex", flexDirection: "row" }}>
                    <InputLabel>Username or email</InputLabel>
                </Grid>
                <Grid item>
                    <TextField
                        variant="filled"
                        hiddenLabel
                        InputProps={{ disableUnderline: true }}
                    ></TextField>
                </Grid>
                <Grid item>
                    <InputLabel>Password</InputLabel>
                </Grid>
                <Grid item>
                    <TextField
                        variant="filled"
                        hiddenLabel
                        InputProps={{ disableUnderline: true }}
                    ></TextField>
                </Grid>
                <Grid item>
                    <Button variant="contained">Login</Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default LoginForm;
