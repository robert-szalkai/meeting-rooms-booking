import React, { FunctionComponent } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import data from "/Users/SCP/Workshop/meeting-rooms-booking/src/Charts.json";
interface iChart {
    data: { name: string; uv: number }[];
}

const Chart = ({ data }: iChart) => {
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
                        dataKey="uv"
                        fill="#8884d8"
                        label={{ position: "top" }}
                    >
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} />
                        ))}
                    </Bar>
                </BarChart>
            </Box>
        </Box>
    );
};
const AllCharts = () => {
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
                    <Chart data={data.roomData} />
                </div>
                <div>
                    <h2>Weeks</h2>
                    <Chart data={data.weeksData} />
                </div>
                <div>
                    <h2>Months</h2>
                    <Chart data={data.monthData} />
                </div>
            </div>
        </Box>
    );
};

export default AllCharts;

