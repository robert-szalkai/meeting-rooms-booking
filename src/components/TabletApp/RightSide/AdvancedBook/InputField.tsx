import React from "react";
import { Box, InputLabel, TextField } from "@mui/material";

interface InputFieldProps {
    inputLabelText: string;
    placeholderText: string;
    multilineSelect?: boolean;
    handleMeetingName?: (values: any) => void;
    handleMeetingDescription?: (values: any) => void;
}

const InputField = ({
    inputLabelText,
    placeholderText,
    multilineSelect = false,
    handleMeetingDescription,
    handleMeetingName,
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
                onChange={(value) => {
                    multilineSelect
                        ? handleMeetingDescription?.(value.target.value)
                        : handleMeetingName?.(value.target.value);
                }}
            />
        </Box>
    );
};

export default InputField;
