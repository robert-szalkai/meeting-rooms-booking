import React, { useState, useEffect} from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import AdvancedBook from "./AdvancedBook/AdvancedBook";
import MeetingInfo from "./MeetingInfo/MeetingInfo";
const availabilityMessages = [
    "currently available",
    "going to be in use soon",
    "being used",
];

interface iRightSide {
    roomName: string;
    availability: number;
    componentToShow:number;
}

const RightSide = ({ roomName, availability,componentToShow}: iRightSide) => {
   const RenderComponents=()=>{
    switch(componentToShow){
        case 1 : return <MeetingInfo/>
        case 2 : return <AdvancedBook/>
    }
   }
    return (
        <Box
            sx={{
                paddingTop: 10,
                height:"100vh",
                boxSizing:"border-box",
            }}
        >
            <Box
                sx={{ 
                    padding:10,
                    background: "white",
                    height: "100%",
                    borderRadius: "36px 0px 0px 0px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    boxSizing:"border-box"
                }}
            >
                {
                    RenderComponents()
                }   
            </Box>
        </Box>
    );
};

export default RightSide;
