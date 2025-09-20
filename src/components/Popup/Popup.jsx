import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({ open, setOpen, message, type, fn }) {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle textTransform={"capitalize"}>
                {type}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ mb: 5 }}>
                <Button
                    variant="outlined"
                    sx={{ px: 20 }}
                    onClick={handleClose}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    sx={{ px: 20 }}
                    onClick={() => fn()}
                    autoFocus
                    color={(type === "delete" || type === "block") ? "error" : "primary"}
                >
                    {type}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
