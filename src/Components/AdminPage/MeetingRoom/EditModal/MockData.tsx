// import React, { useState } from "react";
// import { Button } from "@mui/material";
// import DataModal from "./DataModal";
// import EditIcon from "@mui/icons-material/Edit";

// const MockData = () => {
//     const [open, setOpen] = useState(false);
//     const [data, setData] = useState<
//         | {
//               id: number;
//               title: string;
//               description: string;
//               lastBooked: string;
//           }[]
//         | null
//     >(null);

//     const handleOpen = () => {
//         setOpen(true);
//         fetchData();
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     const fetchData = async () => {
//         const response = await fetch("http://localhost:3001/rooms/");
//         const json = await response.json();
//         setData(json);
//     };

//     return (
//         <div>
//             <Button onClick={handleOpen}>
//                 <EditIcon sx={{ color: "black" }}></EditIcon>
//             </Button>
//             {data && (
//                 <DataModal open={open} onClose={handleClose} data={data} />
//             )}
//         </div>
//     );
// };

// export default MockData;
import { styled } from "@mui/material/styles";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    Button,
    Modal,
    Box,
    Grid,
    CardActions,
    Typography,
    TextField,
} from "@mui/material";
import axios from "axios";

type Data = {
    id: number;
    title: string;
    description: string;
    lastBooked: string;
};
const CenteredModal = styled(Modal)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

export const MockData = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState<Data[]>([]);
    const [selectedData, setSelectedData] = useState<Data | null>(null);
    const [editedData, setEditedData] = useState<Data | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const handleOpen = (id: number) => {
        setSelectedData(data.find((d) => d.id === id) || null);
        setEditedData(data.find((d) => d.id === id) || null);

        setOpen(true);
    };
    const handleDelete = async (id: any) => {
        try {
            await axios.delete(`http://localhost:3001/rooms/${id}`);
            setData(data.filter((item: any) => item.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const fetchData = async () => {
        const response = await fetch("http://localhost:3001/rooms/");
        const json = await response.json();
        setData(json);
    };
    const handleSave = () => {
        if (editedData) {
            const newData = data.map((d) =>
                d.id === editedData.id ? editedData : d
            );
            setData(newData);
            setSelectedData(editedData);
            handleClose();
        }
    };
    const handleCancel = () => {
        setEditedData(selectedData);
        handleClose();
    };
    const handleTextFieldChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (editedData) {
            setEditedData({
                ...editedData,
                [event.target.name]: event.target.value,
            });
        }
    };

    return (
        //     <>
        //         <Grid container spacing={2}>
        //             {data.map((item) => (
        //                 <Grid item xs={12} sm={6} md={6} xl={6} key={item.id}>
        //                     <Card
        //                         sx={{
        //                             minWidth: 275,
        //                             borderRadius: 3,
        //                             boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        //                         }}
        //                     >
        //                         <CardHeader title={item.title} />
        //                         <CardContent>
        //                             <p>{item.description}</p>
        //                             <Button onClick={() => handleOpen(item.id)}>
        //                                 <EditIcon
        //                                     sx={{ color: "black" }}
        //                                 ></EditIcon>
        //                             </Button>
        //                         </CardContent>
        //                     </Card>
        //                 </Grid>
        //             ))}
        //         </Grid>
        //         <Modal open={open} onClose={handleClose}>
        //             <Box
        //                 sx={{
        //                     width: "80vw",
        //                     height: "80vh",
        //                     backgroundColor: "white",
        //                     padding: "2rem",
        //                 }}
        //             >
        //                 {selectedData && (
        //                     <>
        //                         <h2>{selectedData.title}</h2>
        //                         <p>{selectedData.description}</p>
        //                     </>
        //                 )}
        //             </Box>
        //         </Modal>
        //     </>
        <>
            <Grid container spacing={2}>
                {data.map((item: any) => (
                    <Grid item xs={12} sm={6} md={6} xl={6} key={item.id}>
                        <Card
                            sx={{
                                minWidth: 275,
                                borderRadius: 3,
                                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <CardContent>
                                <Typography
                                    variant="h4"
                                    fontFamily="IBM Plex Sans"
                                    sx={{ fontSize: 25 }}
                                    color="#1E3C52"
                                    gutterBottom
                                >
                                    {item.title}
                                </Typography>
                                <br />
                                <br />

                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                >
                                    {item.description}
                                </Typography>
                                <Typography variant="body2">
                                    Last Booked at {item.lastBooked}
                                    <br />
                                </Typography>
                            </CardContent>

                            <CardActions sx={{ justifyContent: "flex-end" }}>
                                {/* <MockData /> */}

                                <Button onClick={() => handleOpen(item.id)}>
                                    <EditIcon
                                        sx={{ color: "black" }}
                                    ></EditIcon>
                                </Button>

                                <Button
                                    size="small"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    <DeleteForeverIcon
                                        sx={{ color: "red" }}
                                    ></DeleteForeverIcon>
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <CenteredModal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        width: "80vw",
                        height: "80vh",
                        backgroundColor: "white",
                        padding: "2rem",
                    }}
                >
                    {selectedData && editedData && (
                        <>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "100vh",
                                }}
                            >
                                <h2>{selectedData.title} Configuration</h2>
                                <TextField
                                    name="Name"
                                    label="Name"
                                    sx={{ width: 800 }}
                                    value={editedData.title}
                                    onChange={handleTextFieldChange}
                                />
                                {/* <h2>{selectedData.title}</h2> */}
                                {/* <p>{selectedData.description}</p>
                            <p>Last Booked at {selectedData.lastBooked}</p> */}
                                <br />
                                <br />
                                <br />
                                <TextField
                                    name="Description"
                                    label="Description"
                                    sx={{
                                        width: 800,

                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                    multiline
                                    fullWidth
                                    value={editedData.description}
                                    onChange={handleTextFieldChange}
                                />
                                <br />
                                <br />
                                <br />
                                {/* <TextField
                                name="LastBooked"
                                label="LastBooked"
                                fullWidth
                                value={editedData.lastBooked}
                                onChange={handleTextFieldChange}
                            /> */}
                            </Box>
                        </>
                    )}
                </Box>
            </CenteredModal>
        </>
    );
};

export default MockData;
