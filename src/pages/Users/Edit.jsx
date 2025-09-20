import { Box, Grid, Typography } from "@mui/material";
import Back from "@/components/Back/Back";
import Container from "@/components/Container/Container";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SubmitSection from "@/components/SubmitSection";
import { blockUser, fetchUsers } from "@/APIs/User";
import { toast } from "react-toastify";
import Select from "@/components/Select/Select";


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
            const user = await fetchUsers(1)
            console.log(user)
            if (user.status) {
                const newData = user.data.user.data.filter(u => u.id === parseInt(id))[0];
                reset({
                    id : newData.id,
                })
                setDefaultValues({
                    is_blocked: newData.is_blocked,
                });
            } else {
                toast.error("Something went wrong fetching the user")
            }
        }
        getUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    // Handle Submit
    const onSubmit = async (data) => {
        setLoading(true);
        console.log(data, defaultValues)
        if (data.is_blocked == defaultValues.is_blocked) {
            toast.info("No changes made");
            setLoading(false);
            return;
        }
        const response = await blockUser(id);
        console.log(response)
        if (response.status) {
            toast.success("Status edited successfully");
            navigate("/users");
        } else {
            toast.error(response);
        }
        setLoading(false);
    };

    return (
        <Container>
            {/* Back */}
            <Back title={"Edit user"} />
            {/* Client Data */}
            <Box bgcolor={"primary.white"} p={"32px 16px"} borderRadius={"12px"} my={8}>
                <Typography variant="title" fontWeight={"500"}>User Status</Typography>
                {defaultValues && <UserDataInputs register={register} errors={errors} defaultValues={defaultValues} />}
            </Box>
            {/* Submit */}
            <SubmitSection onSubmit={onSubmit} handleSubmit={handleSubmit} loading={loading} />
        </Container>
    );
};

const UserDataInputs = ({register , errors , defaultValues}) => {

    const status = [
        {id : 0, name : "Active"},
        {id : 1, name : "Blocked"}
    ]
    
    return (
        <Grid container mt={8} spacing={8}>
            <Grid item xs={12} sm={6}>
                <Select 
                    data={status}
                    name={"name"}
                    register={register}
                    registerName={"is_blocked"}
                    defaultValue={defaultValues.is_blocked ?? 0}
                    label={"Status"}
                    required={true}
                    error={errors?.is_blocked?.message}
                />
            </Grid>
        </Grid>
    )
}

export default Edit;
