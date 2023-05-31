import React, {FC} from "react";
import {Box, Typography, Modal, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {ModalProps} from "../../interfaces/interfaces";
import CustomColors from "../../constants/CustomColors";

const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
};

const ChangeRoomModal: FC<ModalProps> = ({openModal, handleClose}) => {
    const navigate = useNavigate();

    return (
        <Box>
            <Modal open={openModal} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Change Room
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        Are you sure you want to change the room?
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "10%",
                            paddingRight: 5,
                        }}
                    >
                        <Button
                            onClick={() => {
                                navigate("/selection");
                            }}
                            sx={{marginTop: 5, maxWidth: "40%",color:CustomColors.WHITE, background: CustomColors.ADMINCOLOR}}
                            variant="outlined"
                            color="inherit"
                        >
                            Yes
                        </Button>
                        <Button
                            onClick={handleClose}
                            sx={{marginTop: 5, maxWidth: "40%"}}
                            variant="outlined"
                            color="inherit"
                        >
                            No
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default ChangeRoomModal;
