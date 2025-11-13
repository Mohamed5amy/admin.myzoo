import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { addBanner } from "@/APIs/Banner";
import { toast } from "react-toastify";
import ImageUploader from "@/components/ImageUploader/ImageUploader";

const AddSlide = ({setItems}) => {

    const [open, setOpen] = useState(false);
    const [image, onImageChange] = useState(null);
    const [URL, setURL] = useState("")
    const [loading, setLoading] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        // Prevent closing on backdrop click or ESC key
        if (loading) {
            if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
                return;
            }
        }
        setOpen(false);
    };

    const handleImageChange = (file, previewUrl) => {
        onImageChange(file);
        console.log('Selected file:', file);
        console.log('Preview URL:', previewUrl);
        // Handle the file upload logic here
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        
        if (!image) {
            toast.error("Please select an image");
            return;
        }

        if (!URL) {
            toast.error("Please enter a slide link");
            return;
        }
        
        formData.append("image" , image)
        formData.append("url" , URL)

        setLoading(true);

        const res = await addBanner(formData);
        console.log(res)
        if (res.status) {
            toast.success("Slide added successfully")
            setItems(prev => [...prev , res.data.slide])
            setURL("");
            onImageChange(null);
            handleClose();
        } else {
            toast.error(res)
        }
        setLoading(false);
    }
    

  return (
        <>
            <Button variant="outlined" sx={{p : "12px 36px"}} onClick={handleClickOpen} > Add Slide </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Slide</DialogTitle>
                <DialogContent sx={{minWidth : 600}}>
                    <Stack mb={8}>
                        <Typography mb={4} > Slide Link <span style={{color : "red"}}>*</span> </Typography>
                        <TextField fullWidth value={URL} onChange={e => setURL(e.target.value)} />
                    </Stack>
                    <ImageUploader
                        label="Slide Image"
                        required={true}
                        onImageChange={handleImageChange}
                        maxSize={5}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={loading}>Cancel</Button>
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? <CircularProgress size={15} /> : "Add"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddSlide;