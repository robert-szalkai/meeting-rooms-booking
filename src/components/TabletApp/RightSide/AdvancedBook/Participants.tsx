import React, { FC } from "react";
import {
    Box,
    TextField,
    Autocomplete,
    Chip,
    Avatar,
    InputLabel,
    AvatarGroup,
} from "@mui/material";

interface Participant {
    name: string;
    id: number;
    available: boolean;
    image: string;
}

interface Props {
    meetingParticipants: Participant[];
    allEmployees: Participant[];
    meetingOwner: Participant[];
    handleMeetingParticipants: (values: any) => void;
    handleMeetingOwner: (values: any) => void;
}

const Participants: FC<Props> = ({
    meetingParticipants,
    allEmployees,
    meetingOwner,
    handleMeetingParticipants,
    handleMeetingOwner,
}) => {
    return (
        <Box>
            <Box>
                <InputLabel>Meeting owner</InputLabel>
                <Autocomplete
                    id="size-small-filled"
                    size="small"
                    options={allEmployees}
                    filterSelectedOptions
                    onInputChange={(event, value) => {
                        const result = allEmployees.filter(
                            (person) => person.name === value
                        );
                        handleMeetingOwner(result);
                    }}
                    getOptionDisabled={(option) => {
                        if (meetingParticipants.includes(option)) {
                            return true;
                        } else {
                            return false;
                        }
                    }}
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
                            hiddenLabel
                            placeholder="An employee from doctari group"
                            InputProps={{
                                ...params.InputProps,
                                disableUnderline: true,
                            }}
                        />
                    )}
                />
            </Box>
            <Box paddingTop={2}>
                <InputLabel>Participants</InputLabel>
                <Autocomplete
                    multiple
                    limitTags={3}
                    id="size-small-filled-multi"
                    filterSelectedOptions
                    onChange={(event, value) => {
                        handleMeetingParticipants(value);
                    }}
                    options={allEmployees}
                    getOptionDisabled={(option) => {
                        if (
                            meetingOwner.length !== 0 &&
                            meetingOwner[0].name === option.name
                        ) {
                            return true;
                        } else {
                            return false;
                        }
                    }}
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
                            hiddenLabel
                            placeholder="Provide participants names"
                            size="small"
                            InputProps={{
                                ...params.InputProps,
                                disableUnderline: true,
                            }}
                        />
                    )}
                />
                <Box minHeight={"40px"} padding={1} display="flex" gap={0.5}>
                    <AvatarGroup max={6}>
                        {meetingOwner.map((owner) => {
                            return (
                                <Avatar src={owner.image}>
                                    {owner.name.replace(/[^A-Z]/g, "")}
                                </Avatar>
                            );
                        })}
                        {meetingParticipants.map((participant) => {
                            return (
                                <Avatar src={participant.image}>
                                    {participant.name.replace(/[^A-Z]/g, "")}
                                </Avatar>
                            );
                        })}
                    </AvatarGroup>
                </Box>
            </Box>
        </Box>
    );
};

export default Participants;
