import React from "react";
import {
    Box,
    Button,
    Typography,
    Grid,
    Paper,
    TextField,
    Autocomplete,
} from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { getParticipants } from "../../../HandleRequests/RoomApi";

interface iQuickBookGlobal {
    onChangeQuickBookRight: () => void;
}

//To be removed when globla theme is done
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

//To be removed when global theme is done
const buttonStyle = { color: "#008435", border: "1px solid #008435" };

const QuickBookGlobal = ({ onChangeQuickBookRight }: iQuickBookGlobal) => {
    const [openQuickBook, setOpenQuickBook] = useState(false);

    const handleQuickBook = () => {
        onChangeQuickBookRight();
    };

    return (
        <Box display="flex" justifyContent="center">
            <Button
                variant="contained"
                sx={{
                    "border-radius": "50px",
                    "text-transform": "none",
                    width: "200px",
                    color: "black",
                    backgroundColor: "#FFFFFF",
                }}
                onClick={() => {
                    handleQuickBook();
                }}
            >
                <CalendarMonthOutlinedIcon
                    fontSize="small"
                    sx={{ color: "black" }}
                />
                <Typography variant="subtitle1">Quick Book</Typography>
            </Button>
        </Box>
    );
};

export default QuickBookGlobal;
