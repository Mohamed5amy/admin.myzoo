import { Box, Grid, Typography } from "@mui/material";
import Back from "@/components/Back/Back";
import Container from "@/components/Container/Container";
import Input from "@/components/Input/Input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SubmitSection from "@/components/SubmitSection";
import { toast } from "react-toastify";
import { addCountry } from "@/APIs/Countries";


const Add = () => {
    // USE FORM
    const {register,handleSubmit,formState: { errors }} = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Handle Submit
    const onSubmit = async (data) => {
        setLoading(true);
            
        const response = await addCountry(data);
        if (response.status) {
            toast.success("Country added successfully");
            navigate("/countries")
        } else {
            toast.error(response)
        }
        setLoading(false)     
    };

    return (
        <Container>
            {/* Back */}
            <Back title={"Add Country"} />
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

export default Add;
