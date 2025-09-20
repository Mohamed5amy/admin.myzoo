import { Box, Grid, Typography } from "@mui/material";
import Back from "@/components/Back/Back";
import Container from "@/components/Container/Container";
import Input from "@/components/Input/Input";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SubmitSection from "@/components/SubmitSection";
import { toast } from "react-toastify";
import { editCountry, fetchCountry } from "@/APIs/Countries";


const Edit = () => {
    // USE FORM
    const {register, handleSubmit, formState: { errors }, reset} = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Get item
    const {id} = useParams()
    useEffect(() => {
        const getCountry = async () => {
            const country = await fetchCountry(id)
            console.log(country)
            if (country.status) {
                const newData = country.data.country;
                reset({
                    name : newData.name,
                })
            } else {
                toast.error("Something went wrong fetching the country")
            }
        }
        getCountry()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    // Handle Submit
    const onSubmit = async (data) => {
        setLoading(true);
        const response = await editCountry(data, id);
        if (response.status) {
            toast.success("Country edited successfully");
            navigate("/countries/");
        } else {
            toast.error(response);
        }
        setLoading(false);
    };

    return (
        <Container>
            {/* Back */}
            <Back title={"Edit Country"} />
            {/* Client Data */}
            <Box bgcolor={"primary.white"} p={"32px 16px"} borderRadius={"12px"} my={8}>
                <Typography variant="title" fontWeight={"500"}>Country Data</Typography>
                <CountryDataInputs register={register} errors={errors} />
            </Box>
            {/* Submit */}
            <SubmitSection onSubmit={onSubmit} handleSubmit={handleSubmit} loading={loading} />
        </Container>
    );
};

const CountryDataInputs = ({register , errors}) => {
    return (
        <Grid container mt={8} spacing={8}>
            <Grid item xs={12} md={6}>
                <Input
                    required={true}
                    type={"text"}
                    label={"Country Name"}
                    register={register}
                    registerName="name"
                    error={errors?.name?.message}
                />
            </Grid>
        </Grid>
    )
};


export default Edit;
