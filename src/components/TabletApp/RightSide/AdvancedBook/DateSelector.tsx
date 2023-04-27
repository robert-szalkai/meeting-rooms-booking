import React, { FC, useEffect, useState } from "react";
import { Box, InputLabel, MenuItem, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

import {
    DateSelectorProps,
    SelectHour,
    MeetingDate,
} from "../../../../interfaces/interfaces";

const DateSelector: FC<DateSelectorProps> = ({
    handleMeetingDate,
    handleStartTime,
    handleEndTime,
    fieldTextValid,
    formValidationDateSetter,
    formValidationStartSetter,
    formValidationEndSetter,
    bookedMeetings,
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

        let dateGenerate: SelectHour[] = [];
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

    const setHoursDisabled = () => {
        const meetings = bookedMeetings;
        const meetingDates = meetings.map((value: MeetingDate) => {
            return { startDate: value.startDate, endDate: value.endDate };
        });
        let newHourList = generateDates();
        newHourList.forEach((selectedHour) => {
            meetingDates.forEach((meetingDate: MeetingDate) => {
                if (
                    (selectedHour.val.isAfter(meetingDate.startDate) &&
                        selectedHour.val.isBefore(meetingDate.endDate)) ||
                    selectedHour.val.isSame(meetingDate.startDate, "minute")
                ) {
                    selectedHour.isdisabled = true;
                }
            });
        });
        setHourList(newHourList);
    };

    const [hourList, setHourList] = useState<SelectHour[]>([]);

    useEffect(() => {
        setHoursDisabled();
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
                                ? formValidationDateSetter(false, "isDateValid")
                                : formValidationDateSetter(true, "isDateValid");
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
                                ? formValidationStartSetter(
                                      false,
                                      "isStartValid"
                                  )
                                : formValidationStartSetter(
                                      true,
                                      "isStartValid"
                                  );
                        }}
                        hiddenLabel
                        fullWidth
                        error={fieldTextValid.startValid === ""}
                        // helperText={
                        //     fieldTextValid.startValid === ""
                        //         ? "Provide start time"
                        //         : ""
                        // }
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
                        {hourList.map((hour: SelectHour, index: number) => (
                            <MenuItem
                                onClick={() => {
                                    setIndex(index);
                                }}
                                value={hour.val.toString()}
                                disabled={hour.isdisabled}
                            >
                                {hour.text}
                            </MenuItem>
                        ))}
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
                                ? formValidationEndSetter(false, "isEndValid")
                                : formValidationEndSetter(true, "isEndValid");
                        }}
                        error={fieldTextValid.endValid === ""}
                        // helperText={
                        //     fieldTextValid.endValid === ""
                        //         ? "Provide end time"
                        //         : ""
                        // }
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
                        {hourList
                            .filter(
                                (hour: SelectHour, position: number) =>
                                    position > index
                            )
                            .map((hour: SelectHour) => (
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
