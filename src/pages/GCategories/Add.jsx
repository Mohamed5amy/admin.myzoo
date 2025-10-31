import { Box, Grid, Typography } from "@mui/material";
import Back from "@/components/Back/Back";
import Container from "@/components/Container/Container";
import Input from "@/components/Input/Input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SubmitSection from "@/components/SubmitSection";
import { toast } from "react-toastify";
import ImageUploader from "@/components/ImageUploader/ImageUploader";
import { addGCategory } from "@/APIs/GCategories";


const Add = () => {
    // USE FORM
    const {register,handleSubmit,formState: { errors }} = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [image, setImage] = useState(null);

    // Handle Submit
    const onSubmit = async (data) => {
        setLoading(true);
        // Append Data
        const formData = new FormData();
        formData.append('name', data.name);
        // Handle Image
        if (!image) {
            toast.error("Image is required");
            setLoading(false);
            return;
        } else {
            formData.append('image', image);
        }
        // Request
        const response = await addGCategory(formData);
        if (response.status) {
            toast.success("Category added successfully");
            navigate("/general-categories")
        } else {
            toast.error(response)
        }
        setLoading(false)     
    };

    return (
        <Container>
            {/* Back */}
            <Back title={"Add Category"} />
            {/* Client Data */}
            <Box bgcolor={"primary.white"} p={"32px 16px"} borderRadius={"12px"} my={8}>
                <Typography variant="title" fontWeight={"500"}>Category Data</Typography>
                <CategoryDataInputs register={register} errors={errors} onImageChange={setImage} />
            </Box>
            {/* Submit */}
            <SubmitSection onSubmit={onSubmit} handleSubmit={handleSubmit} loading={loading} />
        </Container>
    );
};

const CategoryDataInputs = ({register , errors , onImageChange}) => {

    const handleImageChange = (file, previewUrl) => {
        onImageChange(file);
        console.log('Selected file:', file);
        console.log('Preview URL:', previewUrl);
        // Handle the file upload logic here
    };
    
    return (
        <Grid container mt={8} spacing={8}>
            <Grid item xs={12} md={6}>
                <Input
                    required={true}
                    type={"text"}
                    label={"Category Name"}
                    register={register}
                    registerName="name"
                    error={errors?.name?.message}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <ImageUploader 
                    label="Category Image"
                    required={true}
                    onImageChange={handleImageChange}
                    maxSize={5}
                />
            </Grid>
        </Grid>
    )
};

export default Add;
