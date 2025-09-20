import { Box, Grid, Typography } from "@mui/material";
import Back from "@/components/Back/Back";
import Container from "@/components/Container/Container";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SubmitSection from "@/components/SubmitSection";
import { toast } from "react-toastify";
import Select from "@/components/Select/Select";
import { adStatus, fetchAd } from "@/APIs/Ads";


const Edit = () => {
    // USE FORM
    const {register, handleSubmit, formState: { errors } , reset} = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [defaultValues, setDefaultValues] = useState(null);

    // Get item
    const {id} = useParams()
    useEffect(() => {
        const getUser = async () => {
            const user = await fetchAd(id)
            console.log(user)
            if (user.status) {
                const newData = user.data.ad;
                reset({
                    id : newData.id,
                })
                setDefaultValues({
                    status: newData.status,
                });
            } else {
                toast.error("Something went wrong fetching the ad")
            }
        }
        getUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    // Handle Submit
    const onSubmit = async (data) => {
        setLoading(true);
        if (data.status == defaultValues.status) {
            toast.info("No changes made");
            setLoading(false);
            return;
        }
        const response = await adStatus(id, data.status);
        console.log(response)
        if (response.status) {
            toast.success("Status edited successfully");
            navigate("/ads/" + id);
        } else {
            toast.error(response);
        }
        setLoading(false);
    };

    return (
        <Container>
            {/* Back */}
            <Back title={"Edit ad"} />
            {/* Client Data */}
            <Box bgcolor={"primary.white"} p={"32px 16px"} borderRadius={"12px"} my={8}>
                <Typography variant="title" fontWeight={"500"}>Ad Status</Typography>
                {defaultValues && <AdDataInputs register={register} errors={errors} defaultValues={defaultValues} />}
            </Box>
            {/* Submit */}
            <SubmitSection onSubmit={onSubmit} handleSubmit={handleSubmit} loading={loading} />
        </Container>
    );
};

const AdDataInputs = ({register , errors , defaultValues}) => {

    const status = [
        "pending",
        "accepted",
        "canceled"
    ]
    
    return (
        <Grid container mt={8} spacing={8}>
            <Grid item xs={12} sm={6}>
                <Select 
                    data={status}
                    register={register}
                    registerName={"status"}
                    defaultValue={defaultValues.status ?? "pending"}
                    label={"Status"}
                    required={true}
                    error={errors?.status?.message}
                />
            </Grid>
        </Grid>
    )
}

export default Edit;
