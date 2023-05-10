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
import localeDate from "dayjs/plugin/localeData";
import objectSupport from "dayjs/plugin/objectSupport";
import weekYear from "dayjs/plugin/weekYear";
import Chart from "./Chart";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Typography } from "@mui/material";

dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(localeDate);
dayjs.extend(objectSupport);

const ChartPage = () => {
    const monthsArray = dayjs
        .months()
        .map((month) => ({ name: month, value: 0 }));
    const daysArray = dayjs.weekdays().map((day) => ({ name: day, value: 0 }));
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [meetingsRoom, setMeetingsRoom] = useState([{ name: "", value: 0 }]);
    const [meetingsMonth, setMeetingsMonth] = useState(monthsArray);
    const [meetingsDay, setMeetingsDay] = useState(daysArray);
    const [selectedWeek, setSelectedWeek] = useState(1);
    const handleWeekChange = (event: SelectChangeEvent) => {
        setSelectedWeek(parseInt(event.target.value));
        setSelectedDate(
            dayjs({
                year: selectedDate.year(),
                month: selectedDate.month(),
                day: (parseInt(event.target.value) - 1) * 7,
            })
        );
    };

    const handleYearChange = (event: SelectChangeEvent) => {
        setSelectedDate(
            dayjs({
                year: event.target.value,
                month: selectedDate.month(),
                day: selectedDate.day(),
            })
        );
        console.log(selectedDate);
    };
    const handleMonthChange = (event: SelectChangeEvent) => {
        setSelectedDate(
            dayjs({
                year: selectedDate.year(),
                month: dayjs.months().indexOf(event.target.value),
                day: selectedDate.day(),
            })
        );
    };

    const dropDownYear = () => {
        const years = [];
        const startYear = 2019;
        const endYear = dayjs().year() + 10;
        for (let year = startYear; year <= endYear; year++) {
            years.push(year);
        }
        return (
            <Select
                value={selectedDate.format("YYYY")}
                onChange={handleYearChange}
            >
                {years.map((year) => (
                    <MenuItem key={year} value={year}>
                        {year}
                    </MenuItem>
                ))}
            </Select>
        );
    };
    const dropDownMonth = () => {
        return (
            <Select
                value={selectedDate.format("MMMM")}
                onChange={handleMonthChange}
            >
                {monthsArray.map((month) => (
                    <MenuItem key={month.name} value={month.name}>
                        {month.name}
                    </MenuItem>
                ))}
            </Select>
        );
    };
    const dropDownWeek = () => {
        const weeks = [];
        for (let week = 1; week <= 5; week++) {
            weeks.push(week);
        }
        return (
            <Select value={selectedWeek.toString()} onChange={handleWeekChange}>
                {weeks.map((week) => (
                    <MenuItem key={week} value={week}>
                        {week}
                    </MenuItem>
                ))}
            </Select>
        );
    };
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
                                dayjs(meetingFromRes.start_time).week() &&
                            selectedDate.format("MMMM") ===
                                dayjs(meetingFromRes.start_time).format(
                                    "MMMM"
                                ) &&
                            selectedDate.year() ===
                                dayjs(meetingFromRes.start_time).year()
                        ) {
                            tempVar.value += 1;
                        }
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
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", alignItems: "center", mt: 1, ml: 1 }}>
                <IconButton component={Link} to="/selection">
                    <ArrowBackIcon />
                </IconButton>
                {dropDownYear()}
                {dropDownMonth()}
                {dropDownWeek()}
                Place holder for interval
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
                    <Chart data={meetingsDay} XValue={"name"} />
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
                            fill={COLORS.ADMINCOLOR}
                            label={{ position: "top" }}
                        />
                    </BarChart>
                </Box>
            </Box>
        </Box>
    );
};

export default ChartPage;
