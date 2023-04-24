import React, { FC, useEffect, useState } from "react";
import { Box, InputLabel, MenuItem, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

import { getMeetings } from "../../../../api/getRequests";

interface Props {
    handleMeetingDate: (values: any) => void;
    handleStartTime: (values: any) => void;
    handleEndTime: (values: any) => void;
    fieldTextValid: dateSelectorValid;
    formValidationDateSetter: (values: boolean) => void;
    formValidationStartSetter: (values: boolean) => void;
    formValidationEndSetter: (values: boolean) => void;
}

interface SelectHourObject {
    val: Dayjs;
    text: string;
    isdisabled: boolean;
}

interface MeetingDateObject {
    startDate: Dayjs;
    endDate: Dayjs;
}

interface dateSelectorValid {
    dateValid: string;
    startValid: string;
    endValid: string;
}

const DateSelector: FC<Props> = ({
    handleMeetingDate,
    handleStartTime,
    handleEndTime,
    fieldTextValid,
    formValidationDateSetter,
    formValidationStartSetter,
    formValidationEndSetter,
}) => {
    const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
    const [index, setIndex] = useState<number>(0);

    const generateDates = () => {
        let startingHour = selectedDate;
        if (selectedDate.isSame(dayjs(), "day")) {
            startingHour = selectedDate.hour(dayjs().get("hour")).minute(0);
        } else {
            startingHour = selectedDate.hour(7).minute(30);
        }
        let dateGenerate: SelectHourObject[] = [];
        while (startingHour.isBefore(selectedDate.set("hour", 19))) {
            startingHour = startingHour.add(30, "minute");
            dateGenerate.push({
                val: startingHour,
                text:
                    startingHour.get("hour").toString() +
                    ":" +
                    (startingHour.get("minute").toString() === "0"
                        ? "00"
                        : "30"),
                isdisabled: false,
            });
        }
        return dateGenerate;
    };

    const getDisabled = async () => {
        const meetings = await getMeetings();
        const meetingDates = meetings.map((value: MeetingDateObject) => {
            return { startDate: value.startDate, endDate: value.endDate };
        });

        selectHour.forEach((selectedHour) => {
            meetingDates.forEach((meetingDate: MeetingDateObject) => {
                if (
                    selectedHour.val.isAfter(meetingDate.startDate) ||
                    selectedHour.val.isSame(meetingDate.startDate, "minute")
                ) {
                    if (selectedHour.val.isBefore(meetingDate.endDate)) {
                        selectedHour.isdisabled = true;
                    }
                }
            });
        });
        setSelectHourState(selectHour);
    };

    const [selectHourState, setSelectHourState] = useState<SelectHourObject[]>(
        generateDates()
    );

    let selectHour = generateDates();

    useEffect(() => {
        getDisabled();
        const generatedDates = generateDates();
        setSelectHourState(generatedDates);
    }, [selectedDate]);

    const handleSelectedDate = (meetingDate: Dayjs) => {
        setSelectedDate(meetingDate);
    };

    return (
        <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
            <Box display="flex" justifyContent={"space-between"} gap={2}>
                <Box flexGrow={1}>
                    <InputLabel>Day*</InputLabel>
                    <DatePicker
                        format="DD/MM/YYYY"
                        onChange={(event: any) => {
                            event.toString() === ""
                                ? formValidationDateSetter(false)
                                : formValidationDateSetter(true);
                            const val = event as Dayjs;
                            handleSelectedDate(val);
                            handleMeetingDate(event);
                        }}
                        slotProps={{
                            textField: {
                                variant: "filled",
                                fullWidth: true,
                                InputProps: {
                                    disableUnderline: true,
                                    hiddenLabel: true,
                                },
                                error: fieldTextValid.dateValid === "",
                                helperText:
                                    fieldTextValid.dateValid === ""
                                        ? "Provide meeting date"
                                        : "",
                            },
                        }}
                    />
                </Box>
                <Box flexGrow={1}>
                    <InputLabel>Start*</InputLabel>
                    <TextField
                        select
                        variant="filled"
                        onChange={(e) => {
                            handleStartTime(e.target.value);
                            e.target.value === ""
                                ? formValidationStartSetter(false)
                                : formValidationStartSetter(true);
                        }}
                        hiddenLabel
                        fullWidth
                        error={fieldTextValid.startValid === ""}
                        helperText={
                            fieldTextValid.startValid === ""
                                ? "Provide start time"
                                : ""
                        }
                        sx={{ minWidth: 110 }}
                        InputProps={{ disableUnderline: true }}
                        SelectProps={{
                            MenuProps: {
                                PaperProps: {
                                    sx: { maxHeight: 150 },
                                },
                            },
                        }}
                    >
                        {selectHourState.map(
                            (hour: SelectHourObject, index: number) => (
                                <MenuItem
                                    onClick={() => {
                                        setIndex(index);
                                    }}
                                    value={hour.val.toString()}
                                    disabled={hour.isdisabled}
                                >
                                    {hour.text}
                                </MenuItem>
                            )
                        )}
                    </TextField>
                </Box>
                <Box flexGrow={1}>
                    <InputLabel>End*</InputLabel>
                    <TextField
                        select
                        variant="filled"
                        onChange={(e) => {
                            handleEndTime(e.target.value);
                            e.target.value === ""
                                ? formValidationEndSetter(false)
                                : formValidationEndSetter(true);
                        }}
                        error={fieldTextValid.endValid === ""}
                        helperText={
                            fieldTextValid.endValid === ""
                                ? "Provide end time"
                                : ""
                        }
                        fullWidth
                        hiddenLabel
                        sx={{ minWidth: 110 }}
                        InputProps={{ disableUnderline: true }}
                        SelectProps={{
                            MenuProps: {
                                PaperProps: { sx: { maxHeight: 150 } },
                            },
                        }}
                    >
                        {selectHourState
                            .filter(
                                (hour: SelectHourObject, position: number) =>
                                    position > index
                            )
                            .map((hour: SelectHourObject) => (
                                <MenuItem
                                    value={hour.val.toString()}
                                    disabled={hour.isdisabled}
                                >
                                    {hour.text}
                                </MenuItem>
                            ))}
                    </TextField>
                </Box>
            </Box>
        </LocalizationProvider>
    );
};

export default DateSelector;
