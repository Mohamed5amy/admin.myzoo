import { Box, Grid, Typography } from "@mui/material";
import Back from "@/components/Back/Back";
import Container from "@/components/Container/Container";
import Input from "@/components/Input/Input";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubmitSection from "@/components/SubmitSection";
import { toast } from "react-toastify";
import { addCity } from "@/APIs/Cities";
import Select from "@/components/Select/Select";
import { fetchCountries } from "@/APIs/Countries";


const Add = () => {
    // USE FORM
    const {register,handleSubmit,formState: { errors }} = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Handle Submit
    const onSubmit = async (data) => {
        setLoading(true);
            
        const response = await addCity(data);
        if (response.status) {
            toast.success("City added successfully");
            navigate("/cities")
        } else {
            toast.error(response)
        }
        setLoading(false)     
    };

    return (
        <Container>
            {/* Back */}
            <Back title={"Add City"} />
            {/* Client Data */}
            <Box bgcolor={"primary.white"} p={"32px 16px"} borderRadius={"12px"} my={8}>
                <Typography variant="title" fontWeight={"500"}>City Data</Typography>
                <CityDataInputs register={register} errors={errors} />
            </Box>
            {/* Submit */}
            <SubmitSection onSubmit={onSubmit} handleSubmit={handleSubmit} loading={loading} />
        </Container>
    );
};

const CityDataInputs = ({register , errors}) => {
    return (
        <Grid container mt={8} spacing={8}>
            <Grid item xs={12} md={6}>
                <Input
                    required={true}
                    type={"text"}
                    label={"City Name"}
                    register={register}
                    registerName="name"
                    error={errors?.name?.message}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <SelectCountry register={register} errors={errors} />
            </Grid>
        </Grid>
    )
};

const SelectCountry = ({register , errors}) => {

    const [items, setItems] = useState([]);

    // Get items
    useEffect(() => {
        const fetchItems = async () => {
            const res = await fetchCountries()
            if (res.status) {
                const countries = res.data.country;
                setItems(countries.map(country => ({
                    id : country.id,
                    name : country.name,
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
            registerName="country_id"
            error={errors?.country_id?.message}
            data={items}
            name={"name"}
            label={"Country"}
            required={true}
        />
    )
}

export default Add;
