import React from "react";
import { Card, Typography, Box } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IconButton } from "@mui/material";

import { iCard } from "../../../interfaces/interfaces";

export const Cards = ({
    title,
    id,
    description,
    lastBooked,
    handleDelete,
    handleEdit,
}: iCard) => {
    return (
        <Card
            data-testid={'cards'+id}
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
                <Box data-testid="editbtn" sx={{ marginLeft: "auto" }}>
                    <IconButton
                        onClick={() => {
                            handleEdit(id);
                        }}
                    >

                        <BorderColorIcon fontSize="large" />
                    </IconButton>

                    <IconButton
                        data-testid={"delbtn"+id}
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
