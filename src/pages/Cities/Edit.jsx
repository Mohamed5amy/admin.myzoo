import { Box, Grid, Typography } from "@mui/material";
import Back from "@/components/Back/Back";
import Container from "@/components/Container/Container";
import Input from "@/components/Input/Input";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SubmitSection from "@/components/SubmitSection";
import { toast } from "react-toastify";
import { fetchCountries } from "@/APIs/Countries";
import Select from "@/components/Select/Select";
import { editCity, fetchCity } from "@/APIs/Cities";


const Edit = () => {
    // USE FORM
    const {register, handleSubmit, formState: { errors }, reset} = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [defaultValues, setDefaultValues] = useState(null);

    // Get item
    const {id} = useParams()
    useEffect(() => {
        const getCity = async () => {
            const city = await fetchCity(id)
            if (city.status) {
                const newData = city.data.city;
                reset({
                    name : newData.name,
                })
                setDefaultValues({
                    country_id : newData.country_id,
                })
            } else {
                toast.error("Something went wrong fetching the city")
            }
        }
        getCity()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    // Handle Submit
    const onSubmit = async (data) => {
        setLoading(true);
        const response = await editCity(data, id);
        if (response.status) {
            toast.success("City edited successfully");
            navigate("/cities/");
        } else {
            toast.error(response);
        }
        setLoading(false);
    };

    return (
        <Container>
            {/* Back */}
            <Back title={"Edit City"} />
            {/* Client Data */}
            <Box bgcolor={"primary.white"} p={"32px 16px"} borderRadius={"12px"} my={8}>
                <Typography variant="title" fontWeight={"500"}>City Data</Typography>
                {defaultValues && <CityDataInputs register={register} errors={errors} defaultValues={defaultValues} />}
            </Box>
            {/* Submit */}
            <SubmitSection onSubmit={onSubmit} handleSubmit={handleSubmit} loading={loading} />
        </Container>
    );
};

const CityDataInputs = ({register , errors, defaultValues}) => {
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
                <SelectCountry register={register} errors={errors} defaultValues={defaultValues} />
            </Grid>
        </Grid>
    )
};

const SelectCountry = ({register , errors, defaultValues}) => {

    const [items, setItems] = useState([]);
    console.log(defaultValues)

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
            defaultValue={defaultValues.country_id || ""}
            required={true}
        />
    )
}


export default Edit;
