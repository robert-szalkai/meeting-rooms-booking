import React, { FC, useState, useEffect } from "react";
import {
    Box,
    Button,
    Grid,
    InputLabel,
    TextField,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { spawnToast } from "../../utils/Toast";
import { getUsers } from "../../api/users";
import { UserInfo } from "../../interfaces/interfaces";
import { Login } from "../../interfaces/interfaces";

const LoginForm: FC<Login> = ({
    username,
    password,
    handleUsername,
    handlePassword,
}) => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<UserInfo[]>();
    const getUsersAccounts = async () => {
        try {
            const result = await getUsers();
            console.log(result)
            setUsers(result);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUsersAccounts();
    }, []);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const account = users?.find(
            (user: UserInfo) => user.username === username
        );
        if (account && account.password === password) {
            spawnToast({
                title: "Connected succesfully",
                message: "",
                toastType: "success",
            });
            localStorage.setItem("authenticated", "authenticated");
            localStorage.setItem("user_type", account.userType);
        } else {
            spawnToast({
                title: "Could not connect",
                message: "Wrong username or password",
                toastType: "error",
            });
        }
        if (
            account?.userType === "user" &&
            localStorage.getItem("authenticated") === "authenticated"
        ) {
            navigate("/selection");
        }
        if (
            account?.userType === "admin" &&
            localStorage.getItem("authenticated") === "authenticated"
        ) {
            navigate("/admin");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box
                sx={{
                    background: "white",
                    maxWidth: 500,
                    minWidth: 500,
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    padding: 7,
                    borderRadius: 7,
                    rowGap: 2,
                    flexDirection: "row",
                    boxShadow: 3,
                }}
            >
                <Grid>
                    <Grid
                        item
                        sx={{
                            paddingBottom: 10,
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Typography variant="h3">Meeting Rooms</Typography>
                    </Grid>
                    <Grid item sx={{ display: "flex", flexDirection: "row" }}>
                        <InputLabel>Username or email</InputLabel>
                    </Grid>
                    <Grid item>
                        <TextField
                            onChange={(event) => {
                                handleUsername(event.target.value);
                            }}
                            fullWidth
                            variant="filled"
                            hiddenLabel
                            InputProps={{ disableUnderline: true }}
                        ></TextField>
                    </Grid>
                    <Grid item paddingTop={2}>
                        <InputLabel>Password</InputLabel>
                    </Grid>
                    <Grid item>
                        <TextField
                            onChange={(event) => {
                                handlePassword(event.target.value);
                            }}
                            type="password"
                            variant="filled"
                            hiddenLabel
                            fullWidth
                            InputProps={{ disableUnderline: true }}
                        ></TextField>
                    </Grid>
                    <Grid
                        item
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            paddingTop: 5,
                        }}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                            type="submit"
                        >
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </form>
    );
};

export default LoginForm;
