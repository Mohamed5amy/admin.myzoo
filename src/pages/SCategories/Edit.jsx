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
import { editSCategory, fetchSCategory } from "@/APIs/SCategories";
import { fetchCategories } from "@/APIs/Categories";
import Select from "@/components/Select/Select";


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
            const category = await fetchSCategory(id)
            if (category.status) {
                const newData = category.data.category;
                reset({
                    name : newData.name,
                })
                setDefaultValues({
                    image : newData.image,
                    main_category_id : newData.main_category_id,
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
        formData.append('main_category_id', data.main_category_id);
        formData.append('_method', "PUT");
        if (!image && !defaultValues?.image) {
            toast.error("Image is required");
            setLoading(false);
            return;
        } else {
            image && formData.append('image', image);
        }
        const response = await editSCategory(formData, id);
        if (response.status) {
            toast.success("Sub Category edited successfully");
            navigate("/sub-categories")
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
                <SelectCategory register={register} errors={errors} defaultValues={defaultValues} />
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

const SelectCategory = ({register , errors , defaultValues}) => {

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
            defaultValue={defaultValues?.main_category_id || ""}
            label={"Category"}
            required={true}
        />
    )
}

export default Edit;
