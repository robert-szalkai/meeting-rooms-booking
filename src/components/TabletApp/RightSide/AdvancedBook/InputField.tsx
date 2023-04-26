import React from "react";
import { Box, InputLabel, TextField } from "@mui/material";

interface InputFieldProps {
    inputLabelText: string;
    placeholderText: string;
    multilineSelect?: boolean;
    handleMeetingName: (values: string) => void;
    handleMeetingDescription: (values: string) => void;
    fieldTextValid?: string;
    formValidationSetter: (values: boolean, key: string) => void;
}

const InputField = ({
    inputLabelText,
    placeholderText,
    multilineSelect = false,
    handleMeetingDescription,
    handleMeetingName,
    fieldTextValid,
    formValidationSetter,
}: InputFieldProps) => {
    return (
        <Box>
            <InputLabel>{inputLabelText}</InputLabel>
            <TextField
                error={fieldTextValid === ""}
                helperText={
                    multilineSelect
                        ? ""
                        : fieldTextValid === ""
                        ? "Provide meeting name"
                        : ""
                }
                placeholder={placeholderText}
                variant="filled"
                size="small"
                hiddenLabel
                fullWidth
                InputProps={{ disableUnderline: true }}
                multiline={multilineSelect}
                rows={multilineSelect ? 4 : 0}
                onChange={(event) => {
                    event.target.value === ""
                        ? formValidationSetter(false, "isNameValid")
                        : formValidationSetter(true, "isNameValid");
                    multilineSelect
                        ? handleMeetingDescription(event.target.value)
                        : handleMeetingName(event.target.value);
                }}
            />
        </Box>
    );
};

export default InputField;
