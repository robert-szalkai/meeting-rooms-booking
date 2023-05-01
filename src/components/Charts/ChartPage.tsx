import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { getMeetingsData } from "../../api/getRequests";
import dayjs from "dayjs";
import COLORS from "../../constants/CustomColors";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import Chart from "./Chart";
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

let fillColor = COLORS.ADMINCOLOR;

const ChartPage = () => {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const monthsArray = months.map((month) => ({ name: month, value: 0 }));
    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const daysArray = daysOfWeek.map((day) => ({ name: day, value: 0 }));
    const [selectedYear, setSelectedYear] = useState(dayjs().year());
    const [selectedMonth, setSelectedMonth] = useState(dayjs().format("MMMM"));
    const [selectedWeek, setSelectedWeek] = useState(1);
    const [meetingsRoom, setMeetingsRoom] = useState([{ name: "", value: 0 }]);
    const [meetingsMonth, setMeetingsMonth] = useState(monthsArray);
    const [meetingsDay, setMeetingsDay] = useState(daysArray);
    const handleWeekChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedWeek(parseInt(event.target.value));
        setMeetingsDay(daysArray);
        console.log(event.target.value);
    };

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(dayjs(event.target.value).year());
        console.log(meetingsMonth);
        setMeetingsMonth(monthsArray);
    };
    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(event.target.value);
        setMeetingsMonth(monthsArray);
    };
    const dropDownYear = () => {
        const years = [];
        const startYear = 2019;
        const endYear = dayjs().year();
        for (let year = startYear; year <= endYear; year++) {
            years.push(year);
        }
        return (
            <select value={selectedYear} onChange={handleYearChange}>
                {years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        );
    };
    const dropDownMonth = () => {
        return (
            <select value={selectedMonth} onChange={handleMonthChange}>
                {monthsArray.map((month) => (
                    <option key={month.name} value={month.name}>
                        {month.name}
                    </option>
                ))}
            </select>
        );
    };
    const dropDownWeek = () => {
        const weeks = [];
        for (let week = 1; week <= 4; week++) {
            weeks.push(week);
        }
        return (
            <select value={selectedWeek} onChange={handleWeekChange}>
                {weeks.map((week) => (
                    <option key={week} value={week}>
                        {week}
                    </option>
                ))}
            </select>
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
                            selectedYear ===
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
                            selectedWeek ===
                                Math.ceil(
                                    dayjs(meetingFromRes.start_time).date() / 7
                                ) &&
                            selectedMonth ===
                                dayjs(meetingFromRes.start_time).format(
                                    "MMMM"
                                ) &&
                            selectedYear ===
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
    }, [selectedYear, selectedWeek, selectedMonth]);
    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", alignItems: "center", mt: 1, ml: 1 }}>
                <IconButton component={Link} to="/selection">
                    <ArrowBackIcon />
                </IconButton>
                {dropDownYear()}
                {dropDownMonth()}
                {dropDownWeek()}
            </Box>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gridGap: "20px",
                    gridAutoRows: "50%",
                }}
            >
                <div>
                    <h2>Rooms</h2>
                    <Chart data={meetingsRoom} />
                </div>
                <div>
                    <h2>Weeks</h2>
                    <Chart data={meetingsDay} />
                </div>
                <div style={{ gridColumn: "1 / 3" }}>
                    <h2>Months</h2>
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
                </div>
            </div>
        </Box>
    );
};

export default ChartPage;
