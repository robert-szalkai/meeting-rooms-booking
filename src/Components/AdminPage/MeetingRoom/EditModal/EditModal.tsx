import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from "@mui/material";
import React from "react";
import { GetData } from "../APIfunctions";

interface Data {
    id: number;
    title: string;
    description: string;
    lastBooked: string;
}

const EditModal = () => {
    const [data, setData] = useState<Data[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<Data | null>(null);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Send PUT request to update data on server
        fetch(`http://localhost:3001/rooms/${selectedData?.id}`, {
            method: "PUT",
            body: JSON.stringify(selectedData),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((json) => {
                // Update data in state variable
                const newData = data.map((item) =>
                    item.id === json.id ? json : item
                );
                setData(newData);
                setSelectedData(null);
                setIsOpen(false);
            });
    };
    useEffect(() => {
        async function getData() {
            const result = await GetData();
            setData(result);
        }
        getData();
    }, []);

    return (
        <>
            <Button size="small" onClick={toggleModal}>
                <EditIcon sx={{ color: "black" }}></EditIcon>
            </Button>
            {data.map((item: any) => (
                <Dialog open={isOpen} onClose={toggleModal}>
                    <DialogTitle>Edit Data</DialogTitle>
                    <DialogContent>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Title"
                                value={selectedData?.title}
                                onChange={(event) =>
                                    setSelectedData({
                                        ...selectedData!,
                                        title: event.target.value,
                                    })
                                }
                            />
                            <TextField
                                label="Description"
                                value={selectedData?.description}
                                onChange={(event) =>
                                    setSelectedData({
                                        ...selectedData!,
                                        description: event.target.value,
                                    })
                                }
                            ></TextField>
                            <TextField
                                label="Last Booked"
                                value={selectedData?.lastBooked}
                                onChange={(event) =>
                                    setSelectedData({
                                        ...selectedData!,
                                        lastBooked: event.target.value,
                                    })
                                }
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={toggleModal}>Cancel</Button>
                        {/* <Button onClick={handleSubmit}>Submit</Button>  */}
                    </DialogActions>
                </Dialog>
            ))}
        </>
    );
};

export default EditModal;
// import { useState } from "react";
// import { TextField, Button, Modal, Box } from "@mui/material";
// import React from "react";

// interface ModalProps {
//     open: boolean;
//     handleClose: () => void;
//     data: {
//         id: number;
//         name: string;
//         description: string;
//         lastBooked: string;
//     };
//     handleEdit: (newData: {
//         name: string;
//         description: string;
//         lastBooked: string;
//     }) => void;
// }

// const EditModal: React.FC<ModalProps> = ({
//     open,
//     handleClose,
//     data,
//     handleEdit,
// }) => {
//     const [name, setName] = useState(data.name);
//     const [description, setDescription] = useState(data.description);
//     const [lastBooked, setLastBooked] = useState(data.lastBooked);

//     const handleSubmit = () => {
//         const newData = { name, description, lastBooked };
//         handleEdit(newData);
//         handleClose();
//     };

//     return (
//         <Modal open={open} onClose={handleClose}>
//             <Box>
//                 <TextField
//                     label="Name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                 />
//                 <TextField
//                     label="Description"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                 />
//                 <TextField
//                     label="Last Booked"
//                     value={lastBooked}
//                     onChange={(e) => setLastBooked(e.target.value)}
//                 />
//                 <Button onClick={handleSubmit}>Submit</Button>
//                 <Button onClick={handleClose}>Cancel</Button>
//             </Box>
//         </Modal>
//     );
// };

// export default EditModal;
