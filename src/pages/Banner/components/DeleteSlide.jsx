import {IconButton} from "@mui/material";
import { useState } from "react";
import { DeleteOutlineRounded } from "@mui/icons-material";
import Popup from "@/components/Popup/Popup";
import { deleteBanner } from "@/APIs/Banner";
import { toast } from "react-toastify";

const DeleteSlide = ({setItems , id}) => {

    // Delete
    const [open, setOpen] = useState(false);

    const handleDelete = async () => {
        const res = await deleteBanner(id);
        if (res.status) {
            toast.success("Slide Deleted successfully")
            setItems(prev => prev.filter(item => item.id !== id))
            setOpen(false);
        } else {
            toast.error(res)
        }
    };
    
    return (
        <>
            <IconButton color="error" onClick={() => setOpen(true)}> <DeleteOutlineRounded/> </IconButton>
            <Popup open={open} setOpen={setOpen} message={"are you sure you want to delete this slide?"} type="delete" fn={handleDelete} />
        </>
    )
}

export default DeleteSlide;