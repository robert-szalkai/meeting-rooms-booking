import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

import COLORS from "../../../../constants/CustomColors";

const AdvancedBookGlobal = () => {
    const navigate = useNavigate();
    const handleAdvancedBook = () => {
        navigate("form");
    };

    return (
        <Box display="flex" justifyContent="center">
            <Button
                variant="outlined"
                color="inherit"
                onClick={() => {
                    handleAdvancedBook();
                }}
            >
                <CalendarMonthOutlinedIcon
                    fontSize="small"
                    sx={{ color: COLORS.BLACK }}
                />
                <Typography variant="subtitle1">Book a Meeting</Typography>
            </Button>
        </Box>
    );
};

export default AdvancedBookGlobal;
