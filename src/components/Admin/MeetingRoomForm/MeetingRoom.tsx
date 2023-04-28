import React, { useEffect, useState } from "react";
import {
    Box,
    IconButton,
    Typography,
    Button,
    TextField,
    FormHelperText,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { iMeetigroomForm } from "../../../interfaces/interfaces";

const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setFunction: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
    setFunction(event.target.value);
};

export const MeetingRoomForm = ({
    handleSubmit,
    text,
    edit,
    editData,
    onClose,
}: iMeetigroomForm) => {
    const [meetinRoomName, setName] = useState<string | undefined>("");
    const [meetingRomDes, setDescription] = useState<string | undefined>("");
    const [meetinfRoomCap, setCapacity] = useState<string | undefined>("");
    const [areAllFieldsCompleted, setAreAllFieldsCompleted] =
        useState<boolean>(false);
    useEffect(() => {
        if (edit === true) {
            setName(editData?.title.toString());
            setDescription(editData?.description.toString());
            setCapacity(editData?.capacity.toString());
        }
    }, []);

    useEffect(() => {
        setAreAllFieldsCompleted(
            meetinRoomName != "" && meetingRomDes != "" && meetinfRoomCap != ""
        );
    }, [meetinRoomName, meetingRomDes, meetinfRoomCap]);

    return (
        <Box sx={{ width: "702px", height: "493px" }}>
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    padding: "50px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        width: "100%",
                    }}
                >
                    <Typography variant="h5">{text}</Typography>
                    <IconButton sx={{ marginLeft: "auto" }} onClick={onClose}>
                        <HighlightOffIcon />
                    </IconButton>
                </Box>
                <Box
                    id="AddForm"
                    sx={{
                        width: "100%",
                        height: "400px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                        alignItems: "flex-start",
                    }}
                    component="form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit(
                            meetinRoomName,
                            meetingRomDes,
                            meetinfRoomCap,
                            editData?.id
                        );
                    }}
                >
                    <TextField
                        value={meetinRoomName}
                        onChange={(e) => {
                            handleChange(e, setName);
                        }}
                        sx={{ width: "100%", height: "50px" }}
                        variant="filled"
                        label="Please type meeting room name"
                        color="secondary"
                        required
                    ></TextField>
                    <TextField
                        value={meetingRomDes}
                        onChange={(e) => {
                            handleChange(e, setDescription);
                        }}
                        rows={4}
                        sx={{ width: "100%" }}
                        variant="filled"
                        label="Please type meeting room description "
                        color="secondary"
                        required
                        multiline={true}
                    ></TextField>

                    <TextField
                        type="number"
                        InputProps={{
                            inputProps: { min: 1 },
                        }}
                        value={meetinfRoomCap}
                        onChange={(e) => {
                            handleChange(e, setCapacity);
                        }}
                        sx={{ width: "50%", height: "50px" }}
                        variant="filled"
                        label="Please provide capacity(only numbers admitted)"
                        color="secondary"
                        required
                    >
                        <FormHelperText>
                            Enter a positive integer value
                        </FormHelperText>
                    </TextField>
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        gap: "30px",
                        justifyContent: "flex-end",
                    }}
                >
                    <Button variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        form="AddForm"
                        type="submit"
                        variant="contained"
                        disabled={!areAllFieldsCompleted}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};
export default MeetingRoomForm;
