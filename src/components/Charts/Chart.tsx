import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import Box from "@mui/material/Box";
import COLORS from "../../constants/CustomColors";
let fillColor = COLORS.ADMINCOLOR;

const Chart = ({ data }: any) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
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
                        fill={fillColor}
                        label={{ position: "top" }}
                    ></Bar>
                </BarChart>
            </Box>
        </Box>
    );
};
export default Chart;
