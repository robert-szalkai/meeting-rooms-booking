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
    const [meetingRoomName, setName] = useState<string>();
    const [meetingRomDes, setDescription] = useState<string>();
    const [meetingRoomCap, setCapacity] = useState<string>();
    const [areAllFieldsCompleted, setAreAllFieldsCompleted] =
        useState<boolean>(false);

    useEffect(() => {
        if (edit && editData) {
            setName(editData.name);
            setDescription(editData.description);
            setCapacity(editData.capacity?.toString());
        }
    }, []);

    useEffect(() => {
        setAreAllFieldsCompleted(
            meetingRoomName !== "" &&
                meetingRomDes !== "" &&
                meetingRoomCap !== ""
        );
    }, [meetingRoomName, meetingRomDes, meetingRoomCap]);

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
                            meetingRoomName,
                            meetingRomDes,
                            meetingRoomCap,
                            editData?.id
                        );
                    }}
                >
                    <TextField
                        value={meetingRoomName}
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
                        value={meetingRoomCap}
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
