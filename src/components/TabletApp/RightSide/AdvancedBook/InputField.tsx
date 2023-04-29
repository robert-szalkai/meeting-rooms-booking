import React from "react";
import { Box, InputLabel, TextField } from "@mui/material";

import { InputFieldProps } from "../../../../interfaces/interfaces";

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
            <InputLabel sx={{ mb: 1, mt: 1 }}>{inputLabelText}</InputLabel>
            <TextField
                error={fieldTextValid === ""}
                placeholder={placeholderText}
                variant="filled"
                size="small"
                hiddenLabel
                fullWidth
                InputProps={{ disableUnderline: true }}
                multiline={multilineSelect}
                rows={multilineSelect ? 3 : 0}
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
