import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Slide, { SlideProps } from "@mui/material/Slide";
import { SnackbarContent, Stack } from "@mui/material";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
type TransitionProps = Omit<SlideProps, "direction">;
function TransitionUp(props: TransitionProps) {
    return <Slide {...props} direction="up" />;
}
export default function SimpleSnackbar() {
    const [open, setOpen] = React.useState(false);
    const [transition, setTransition] = React.useState<
        React.ComponentType<TransitionProps> | undefined
    >(undefined);

    const handleClick =
        (Transition: React.ComponentType<TransitionProps>) => () => {
            setTransition(() => transition);
            setOpen(!open);
        };

    return (
        <Stack spacing={2} sx={{ maxWidth: 600 }}>
        <div>
           {/* <Button onClick={handleClick(TransitionUp)}>Test</Button>    This is how to implement a button with transition */   }
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                open={open}
                autoHideDuration={6000}
                TransitionComponent={transition}
                key={transition ? transition.name : ""}
            >
                <Alert severity="success">
                    Successfully Booked
                    <p>You have successfully booked the Meeting Room</p>
               </Alert>
         
            </Snackbar>
           
        </div>
        </Stack>
    );
}
