import { Box, Grid, Typography } from "@mui/material";
import Back from "@/components/Back/Back";
import Container from "@/components/Container/Container";
import Input from "@/components/Input/Input";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SubmitSection from "@/components/SubmitSection";
import { toast } from "react-toastify";
import ImageUploader from "@/components/ImageUploader/ImageUploader";
import { editGCategory, fetchGCategory } from "@/APIs/GCategories";


const Edit = () => {
    // USE FORM
    const {register, handleSubmit, formState: { errors }, reset} = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [defaultValues, setDefaultValues] = useState(null);
    const [image, setImage] = useState(null);

    // Get item
    const {id} = useParams()
    useEffect(() => {
        const getCity = async () => {
            const category = await fetchGCategory(id)
            if (category.status) {
                const newData = category.data.category;
                reset({
                    name : newData.name,
                })
                setDefaultValues({
                    image : newData.image,
                })
            } else {
                toast.error("Something went wrong fetching the category")
            }
        }
        getCity()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    // Handle Submit
    const onSubmit = async (data) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('_method', "PUT");
        if (!image && !defaultValues?.image) {
            toast.error("Image is required");
            setLoading(false);
            return;
        } else {
            image && formData.append('image', image);
        }
        const response = await editGCategory(formData, id);
        if (response.status) {
            toast.success("Category edited successfully");
            navigate("/general-categories")
        } else {
            toast.error(response)
        }
        setLoading(false)     
    };

    return (
        <Container>
            {/* Back */}
            <Back title={"Edit City"} />
            {/* Client Data */}
            <Box bgcolor={"primary.white"} p={"32px 16px"} borderRadius={"12px"} my={8}>
                <Typography variant="title" fontWeight={"500"}>City Data</Typography>
                {defaultValues && <CategoryDataInputs register={register} errors={errors} onImageChange={setImage} defaultValues={defaultValues} />}
            </Box>
            {/* Submit */}
            <SubmitSection onSubmit={onSubmit} handleSubmit={handleSubmit} loading={loading} />
        </Container>
    );
};

const CategoryDataInputs = ({register , errors , onImageChange , defaultValues}) => {

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
                    defaultImage={defaultValues?.image || null}
                    onImageChange={handleImageChange}
                    maxSize={5}
                />
            </Grid>
        </Grid>
    )
};

export default Edit;
