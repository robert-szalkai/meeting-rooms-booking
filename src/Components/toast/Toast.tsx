import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Slide, { SlideProps } from "@mui/material/Slide";
import { Stack } from "@mui/material";
import Alert from "@mui/material/Alert";
type TransitionProps = Omit<SlideProps, "direction">;
function TransitionUp(props: TransitionProps) {
    return <Slide {...props} direction="up" />;
}

export default function SimpleSnackbar() {
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const [openError, setOpenError] = React.useState(false);
    const [transition, setTransition] = React.useState<
        React.ComponentType<TransitionProps> | undefined
    >(undefined);
    const handleClick =
        (Transition: React.ComponentType<TransitionProps>, type: string) =>
        () => {
            if (type === "success") {
                setOpenSuccess(true);
                setTransition(() => Transition);
            } else if (type === "error") {
                setOpenError(true);
                setTransition(() => Transition);
            }
        };
    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSuccess(false);
        setOpenError(false);
        setTransition(undefined);
    };
    return (
        <Stack spacing={2} direction="column" sx={{ maxWidth: 600 }}>
            <div>
                <Button onClick={handleClick(TransitionUp, "success")}>
                    Test1
                </Button>
                <Button onClick={handleClick(TransitionUp, "error")}>
                    Test2
                </Button>

                <Snackbar
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    open={openSuccess}
                    autoHideDuration={1000}
                    TransitionComponent={transition}
                >
                    <Alert severity="success">
                        Successfully Booked
                        <p>You have successfully booked the Meeting Room</p>
                    </Alert>
                </Snackbar>
                <Snackbar
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    open={openError}
                    autoHideDuration={1000}
                    TransitionComponent={transition}
                >
                    <Alert severity="error">Something went wrong</Alert>
                </Snackbar>
            </div>
        </Stack>
    );
}
