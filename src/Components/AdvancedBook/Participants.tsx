import React, { useState } from "react";
import { Box, TextField, Autocomplete, Chip } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Participants = () => {
    const [meetingParticipants, setMeetingParticipants] = useState<
        {
            name: string;
        }[]
    >([]);

    return (
        <Box>
            <Autocomplete
                multiple
                limitTags={3}
                id="size-small-filled-multi"
                onChange={(event, value) => {
                    setMeetingParticipants(value);
                    console.log(meetingParticipants);
                }}
                options={particpants}
                getOptionLabel={(participant) => participant.name}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip
                            variant="outlined"
                            label={option.name}
                            size="small"
                            {...getTagProps({ index })}
                        />
                    ))
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="filled"
                        label="Participants"
                    />
                )}
            />
            <Box>
                {meetingParticipants.map((participant) => {
                    return <AccountCircleIcon fontSize="large" />;
                })}
            </Box>
        </Box>
    );
};

const particpants = [
    { name: "Claudiu Comeaga" },
    { name: "Rica Craciun" },
    { name: "Anghel Urzica" },
    { name: "Estera Lascar" },
    { name: "Corina Serban" },
    { name: "Iona Ganea" },
    { name: "Catalena Stefanescu" },
];

export default Participants;
