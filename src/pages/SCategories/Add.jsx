import { Box, Grid, Typography } from "@mui/material";
import Back from "@/components/Back/Back";
import Container from "@/components/Container/Container";
import Input from "@/components/Input/Input";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubmitSection from "@/components/SubmitSection";
import { toast } from "react-toastify";
import { fetchCategories } from "@/APIs/Categories";
import ImageUploader from "@/components/ImageUploader/ImageUploader";
import Select from "@/components/Select/Select";
import { addSCategory } from "@/APIs/SCategories";


const Add = () => {
    // USE FORM
    const {register,handleSubmit,formState: { errors }} = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [image, setImage] = useState(null);

    // Handle Submit
    const onSubmit = async (data) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('main_category_id', data.main_category_id);
        // Handle Image
        if (!image) {
            toast.error("Image is required");
            setLoading(false);
            return;
        } else {
            formData.append('image', image);
        }
        // Response
        const response = await addSCategory(formData);
        if (response.status) {
            toast.success("Category added successfully");
            navigate("/sub-categories")
        } else {
            toast.error(response)
        }
        setLoading(false)     
    };

    return (
        <Container>
            {/* Back */}
            <Back title={"Add Sub Category"} />
            {/* Client Data */}
            <Box bgcolor={"primary.white"} p={"32px 16px"} borderRadius={"12px"} my={8}>
                <Typography variant="title" fontWeight={"500"}>Sub Category Data</Typography>
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
                    label={"Sub Category Name"}
                    register={register}
                    registerName="name"
                    error={errors?.name?.message}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <SelectCategory register={register} errors={errors} />
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

const SelectCategory = ({register , errors}) => {

    const [items, setItems] = useState([]);

    // Get items
    useEffect(() => {
        const fetchItems = async () => {
            const res = await fetchCategories()
            console.log(res)
            if (res.status) {
                const categories = res.data.category;
                setItems(categories.map(category => ({
                    id : category.id,
                    name : category.name,
                })))
            } else {
                toast.error(res)
            }
        }
        fetchItems()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <Select
            register={register}
            registerName="main_category_id"
            error={errors?.main_category_id?.message}
            data={items}
            name={"name"}
            label={"Category"}
            required={true}
        />
    )
}

export default Add;
