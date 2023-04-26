import React from "react";
import { Card, Typography, Box } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IconButton } from "@mui/material";
interface iCard {
    handleEdit: (id: number) => Promise<void>;
    title: String;
    id: number;
    description: String;
    lastBooked: String;
    handleDelete: (id: number) => void;
}
export const Cards = ({
    title,
    id,
    description,
    lastBooked,
    handleDelete,
    handleEdit
}: iCard) => {
    return (
        <Card
           onClick={()=>{console.log(title)}}
            key={id}
            sx={{
                maxWidth: "821px",
                minWidth: "400px",
                minHeight: "206px",
                boxShadow: "4",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "flex-start",
                padding: 2,
            }}
        >
            <Typography variant="h6">{title}</Typography>
            <Typography variant="subtitle1">{description}</Typography>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <Typography variant="subtitle1">
                    Latest book at {lastBooked}
                </Typography>
                <Box sx={{ marginLeft: "auto" }}>
                    <IconButton
                        onClick={() => {
                            handleEdit(id);
                        }}
                    >
                        <BorderColorIcon fontSize="large" />
                    </IconButton>

                    <IconButton
                        onClick={() => {
                            handleDelete(id);
                        }}
                    >
                        <DeleteOutlineIcon
                            sx={{ color: "red", marginLeft: "20px" }}
                            fontSize="large"
                        />
                    </IconButton>
                </Box>
            </Box>
        </Card>
    );
};

export default Cards;
