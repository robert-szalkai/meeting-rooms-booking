import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { getMeetingsData } from "../../api/getRequests";
import dayjs from 'dayjs'

const Chart = ({ data }: any) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", alignItems: "center", mt: 1, ml: 1 }}>
                <IconButton component={Link} to="http://localhost:3000/hub">
                    <ArrowBackIcon />
                </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <BarChart
                    width={690}
                    height={270}
                    data={data}
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
                        fill="#8884d8"
                        label={{ position: "top" }}
                    ></Bar>
                </BarChart>
            </Box>
        </Box>
    );
};
const AllCharts = () => {
    const [meetingsRoom, setMeetingsRoom] = useState([]);
    const [meetingsMonth, setMeetingsMonth] = useState([]);
    const [meetingsDay, setMeetingsDay] = useState([]);
    const b = async () => {
        await getMeetingsData().then((res) => {
            const meetingsFromRes = res.data.meetings;
            let temp = [];
            for (const meetingFromRes of meetingsFromRes) {
                if (
                    temp.some((meeting) => meeting.name == meetingFromRes.name)
                ) {
                    for (const tempVar of temp) {
                        if (tempVar.name == meetingFromRes.name)
                            tempVar.value += 1;
                    }
                } else {
                    temp.push({ name: meetingFromRes.name, value: 1 });
                }
            }
            setMeetingsRoom(temp);
        });
    };

    const c = async () => {
        await getMeetingsData().then((res) => {
            const meetingsFromRes = res.data.meetings;
            let temp = [];
            for (const meetingFromRes of meetingsFromRes) {
                if (
                    temp.some((meeting) => meeting.name === dayjs(meetingFromRes.start_time).format("MMMM"))
                ) {
                    for (const tempVar of temp) {
                        if (tempVar.name == dayjs(meetingFromRes.start_time).format("MMMM"))
                            tempVar.value += 1;
                    }
                } else {
                    temp.push({ name: dayjs(meetingFromRes.start_time).format("MMMM"), value: 1 });
                }
            }
            setMeetingsMonth(temp);
        });
    }


    const d = async () => {
        await getMeetingsData().then((res) => {
            const meetingsFromRes = res.data.meetings;
            let temp = [];
            for (const meetingFromRes of meetingsFromRes) {
                if (
                    temp.some((meeting) => meeting.name === dayjs(meetingFromRes.start_time).format("DD"))
                ) {
                    for (const tempVar of temp) {
                        if (tempVar.name == dayjs(meetingFromRes.start_time).format("DD"))
                            tempVar.value += 1;
                    }
                } else {
                    temp.push({ name: dayjs(meetingFromRes.start_time).format("DD"), value: 1 });
                }
            }
            setMeetingsDay(temp);
        });
    }


    if (meetingsRoom.length === 0){b();c();d()};

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", alignItems: "center", mt: 1, ml: 1 }}>
                <IconButton component={Link} to="http://localhost:3000/hub">
                    <ArrowBackIcon />
                </IconButton>
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
                            fill="#8884d8"
                            label={{ position: "top" }}
                        />
                    </BarChart>
                </div>
            </div>
        </Box>
    );
};

export default AllCharts;
