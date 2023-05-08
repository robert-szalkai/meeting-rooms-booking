import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { getMeetingsData } from "../../api/meetings";
import dayjs from "dayjs";
import COLORS from "../../constants/CustomColors";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import localData from "dayjs/plugin/localeData";
import Chart from "./Chart";
import { Typography } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(localData);

let fillColor = COLORS.ADMINCOLOR;

const ChartPage = () => {
    const monthsArray = dayjs.months().map((month) => ({ name: month, value: 0 }));
    const daysArray = dayjs.weekdays().map((day) => ({ name: day, value: 0 }));
    const [selectedDate, setSelectedDate] = useState(dayjs())
    const [meetingsRoom, setMeetingsRoom] = useState([{ name: "", value: 0 }]);
    const [meetingsMonth, setMeetingsMonth] = useState(monthsArray);
    const [meetingsDay, setMeetingsDay] = useState(daysArray);

    
    const getRoomsFromJson = async () => {
        await getMeetingsData().then((res) => {
            const meetingsFromRes = res.data.meetings;
            let temp: { name: string; value: number }[] = [];
            for (const meetingFromRes of meetingsFromRes) {
                if (
                    temp.some((meeting) => meeting.name === meetingFromRes.name)
                ) {
                    for (const tempVar of temp) {
                        if (tempVar.name === meetingFromRes.name)
                            tempVar.value += 1;
                    }
                } else {
                    temp.push({ name: meetingFromRes.name, value: 1 });
                }
            }
            setMeetingsRoom(temp);
        });
    };

    const getMonthsFromJson = async () => {
        await getMeetingsData().then((res) => {
            const meetingsFromRes = res.data.meetings;

            let temp: { name: string; value: number }[] = monthsArray;
            for (const meetingFromRes of meetingsFromRes) {
                if (
                    temp.some(
                        (meeting) =>
                            meeting.name ===
                            dayjs(meetingFromRes.start_time).format("MMMM")
                    )
                ) {
                    for (const tempVar of temp) {
                        if (
                            tempVar.name ===
                                dayjs(meetingFromRes.start_time).format(
                                    "MMMM"
                                ) &&
                            selectedDate.year() ===
                                dayjs(meetingFromRes.start_time).year()
                        )
                            tempVar.value += 1;
                    }
                } else {
                    temp.push({
                        name: dayjs(meetingFromRes.start_time).format("MMMM"),
                        value: 1,
                    });
                }
            }
            setMeetingsMonth(temp);
        });
    };

    const getDaysOfTheWeekFromJson = async () => {
        await getMeetingsData().then((res) => {
            const meetingsFromRes = res.data.meetings;
            let temp: { name: string; value: number }[] = daysArray;
            for (const meetingFromRes of meetingsFromRes) {
                if (
                    temp.some(
                        (meeting) =>
                            meeting.name ===
                            dayjs(meetingFromRes.start_time).format("dddd")
                    )
                ) {
                    for (const tempVar of temp) {
                        if (
                            tempVar.name ===
                                dayjs(meetingFromRes.start_time).format(
                                    "dddd"
                                ) &&
                            selectedDate.week() ===
                                    dayjs(meetingFromRes.start_time).week()
                                &&
                            selectedDate.format("MMMM")===
                                dayjs(meetingFromRes.start_time).format(
                                    "MMMM"
                                ) &&
                            selectedDate.year() ===
                                dayjs(meetingFromRes.start_time).year()
                        )
                            tempVar.value += 1;
                    }
                } else {
                    temp.push({
                        name: dayjs(meetingFromRes.start_time).format("dddd"),
                        value: 1,
                    });
                }
            }
            setMeetingsDay(temp);
        });
    };

    useEffect(() => {
        getMonthsFromJson();
        getDaysOfTheWeekFromJson();
        getRoomsFromJson();
    }, [selectedDate]);
    return (
        <LocalizationProvider  dateAdapter={AdapterDayjs}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", alignItems: "center", mt: 1, ml: 1 }}>
                <IconButton component={Link} to="/selection">
                    <ArrowBackIcon />
                </IconButton>
                <DatePicker value={selectedDate} onChange={(event:any) => {setSelectedDate(dayjs(event))}}/>
            </Box>
            <Box
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gridGap: "20px",
                    gridAutoRows: "50%",
                }}
            >
                <Box>
                    <Typography variant="h4">Rooms</Typography>
                    <Chart data={meetingsRoom} />
                </Box>
                <Box>
                    <Typography variant="h4">Weeks</Typography>
                    <Chart data={meetingsDay} />
                </Box>
                <Box style={{ gridColumn: "1 / 3" }}>
                    <Typography variant="h4">Months</Typography>
                    <BarChart
                        width={1430}
                        height={300}
                        data={meetingsMonth}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Bar
                            dataKey="value"
                            fill={fillColor}
                            label={{ position: "top" }}
                        />
                    </BarChart>
                </Box>
            </Box>
        </Box>
        </LocalizationProvider>
    );
};

export default ChartPage;
