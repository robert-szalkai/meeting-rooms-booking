import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

import COLORS from "../../../../constants/CustomColors";
import { iQuickBookGlobal } from "../../../../interfaces/interfaces";

const QuickBookGlobal = ({ onClickQuickBookGlobal }: iQuickBookGlobal) => {
    const navigate = useNavigate();
    const handleQuickBook = () => {
        onClickQuickBookGlobal();
        navigate("menu");
    };

    return (
        <Box display="flex" justifyContent="center">
            <Button
                variant="outlined"
                color="inherit"
                onClick={() => {
                    handleQuickBook();
                }}
            >
                <CalendarMonthOutlinedIcon
                    fontSize="small"
                    sx={{ color: COLORS.BLACK }}
                />
                <Typography variant="subtitle1">Quick Book</Typography>
            </Button>
        </Box>
    );
};

export default QuickBookGlobal;
