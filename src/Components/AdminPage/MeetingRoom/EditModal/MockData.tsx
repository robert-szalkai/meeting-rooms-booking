import React, { useState } from "react";
import { Button } from "@mui/material";
import DataModal from "./DataModal";
import EditIcon from "@mui/icons-material/Edit";

const MockData = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState<
        | {
              id: number;
              title: string;
              description: string;
              lastBooked: string;
          }[]
        | null
    >(null);

    const handleOpen = () => {
        setOpen(true);
        fetchData();
    };

    const handleClose = () => {
        setOpen(false);
    };

    const fetchData = async () => {
        const response = await fetch("http://localhost:3001/rooms/");
        const json = await response.json();
        setData(json);
    };

    return (
        <div>
            <Button onClick={handleOpen}>
                <EditIcon sx={{ color: "black" }}></EditIcon>
            </Button>
            {data && (
                <DataModal open={open} onClose={handleClose} data={data} />
            )}
        </div>
    );
};

export default MockData;
