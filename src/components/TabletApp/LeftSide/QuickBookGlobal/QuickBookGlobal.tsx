import React from "react";
import { Box, Button, Typography } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import COLORS from "../../../../constants/CustomColors";
import SIZE from "../../../../constants/CustomSize";

interface iQuickBookGlobal {
    onChangeQuickBookRight: () => void;
}

const QuickBookGlobal = ({ onChangeQuickBookRight }: iQuickBookGlobal) => {
    const handleQuickBook = () => {
        onChangeQuickBookRight();
    };

    return (
        <Box display="flex" justifyContent="center">
            <Button
                variant="outlined"
                sx={{
                    "border-radius": "50px",
                    "text-transform": "none",
                    width: SIZE.WIDTH_ROUNDED_TABLE_BUTTON,
                    height: SIZE.HEIGHT_ROUNDED_TABLE_BUTTON,
                    color: COLORS.BLACK,
                    backgroundColor: COLORS.WHITE,
                }}
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
