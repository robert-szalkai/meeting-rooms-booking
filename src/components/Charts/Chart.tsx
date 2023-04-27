import React, { FunctionComponent, useState } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import data from "../../Charts.json";
import { getMeetingsData } from "../../api/getRequests";
interface iChart {
    data: { name: string; uv: number }[];
}

const Chart = ({ data }: any) => {
    console.log(data);
    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", alignItems: "center", mt: 1, ml: 1 }}>
                <IconButton component={Link} to="http://localhost:3000/hub">
                    <ArrowBackIcon />
                </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <BarChart
                    width={1450}
                    height={770}
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
    const [meetings, setMeetings] = useState([]);
    const [meetingsRoom, setMeetingsRoom] = useState({});
    const b = async () => {
        await getMeetingsData().then((res) => {
            res.data.meetings.forEach((meeting) => {
                let exists = false;
                let index = 0;
                let tempIndex = 0;
                meetings.forEach((val) => {
                    if (val.name === meeting.name) {
                        index = tempIndex;
                        exists = true;
                    }
                    tempIndex++;
                });
                if (!exists) {
                    let temp = meetings;
                    temp.push({ name: meeting.name, value: 1 });
                    setMeetings(temp);
                } else {
                    console.log(meeting.name)
                    let temp = meetings;
                    temp[index].value = temp[index].value + 1;
                    setMeetings(temp);
                }
            });
            console.log(meetings);
            setMeetingsRoom(meetings);
        });
    };

    if(meetings.length == 0)b();

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", alignItems: "center", mt: 1, ml: 1 }}>
                <IconButton component={Link} to="http://localhost:3000/hub">
                    <ArrowBackIcon />
                </IconButton>
            </Box>
            <div>
                <h1>All Charts</h1>
                <div>
                    <h2>Rooms</h2>
                    <Chart data={meetingsRoom} />
                </div>
            </div>
        </Box>
    );
};

export default AllCharts;
