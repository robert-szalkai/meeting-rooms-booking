import React from "react";
import { Box, InputLabel, TextField } from "@mui/material";

interface InputFieldProps {
    inputLabelText: string;
    placeholderText: string;
    multilineSelect?: boolean;
}

const InputField = ({
    inputLabelText,
    placeholderText,
    multilineSelect = false,
}: InputFieldProps) => {
    return (
        <Box>
            <InputLabel>{inputLabelText}</InputLabel>
            <TextField
                placeholder={placeholderText}
                variant="filled"
                size="small"
                hiddenLabel
                fullWidth
                InputProps={{ disableUnderline: true }}
                multiline={multilineSelect}
                rows={multilineSelect ? 4 : 0}
            />
        </Box>
    );
};

export default InputField;
