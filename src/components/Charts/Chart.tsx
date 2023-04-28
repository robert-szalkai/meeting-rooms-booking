import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { getMeetingsData } from "../../api/getRequests";

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
           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: "20px", gridAutoRows: "50%" }}>
             <div>
               <h2>Rooms</h2>
               <Chart data={meetingsRoom} />
             </div>
           {/*  <div>
            <h2>Weeks</h2>
               <Chart data={weekData} />
             </div>
         <div style={{ gridColumn: "1 / 3" }}>
               <h2>Months</h2>
               <BarChart
                 width={1430}
                 height={300}
                 data={monthData}
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
                 <Bar dataKey="value" fill="#8884d8" label={{ position: "top" }} />
               </BarChart>
             </div> */}
           </div>
           </Box>
         );
       };

export default AllCharts;
