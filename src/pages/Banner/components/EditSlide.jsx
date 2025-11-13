import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { editBanner } from "@/APIs/Banner";
import { toast } from "react-toastify";
import ImageUploader from "@/components/ImageUploader/ImageUploader";
import { Edit } from "@mui/icons-material";

const EditSlide = ({setItems , item}) => {

    const [open, setOpen] = useState(false);
    const [image, onImageChange] = useState(null);
    const [URL, setURL] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setURL(item.url)
    } , [item])

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
        
        if (!URL) {
            toast.error("Please enter a slide link");
            return;
        }

        if (URL === item.url && !image) {
            toast.info("No changes made");
            return;
        }

        if (image) {
            formData.append("image" , image)
        }
        
        formData.append("url" , URL)
        formData.append('_method', "PUT");

        setLoading(true);

        const res = await editBanner(formData , item.id);
        console.log(res)
        if (res.status) {
            toast.success("Slide added successfully")
            const updatedItem = res.data.slide;
            setItems(prev => prev.map(itm => itm.id === updatedItem.id ? updatedItem : itm))
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
            <IconButton color="primary" onClick={handleClickOpen}> <Edit /> </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Slide</DialogTitle>
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
                        defaultImage={item.image}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={loading}>Cancel</Button>
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? <CircularProgress size={15} /> : "Save"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EditSlide;