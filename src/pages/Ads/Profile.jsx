import { Box, Chip, Grid, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import Container from "@/components/Container/Container";
import Back from "@/components/Back/Back";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Edit } from "@mui/icons-material";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { fetchAd } from "@/APIs/Ads";

const Profile = () => {
    
    const { id } = useParams();

    const [item, setItem] = useState({});

    useEffect(() => {
        const getUser = async () => {
            const user = await fetchAd(id)
            console.log(user)
            if (user.status) {
                setItem(user.data.ad);
            } else {
                toast.error("Something went wrong fetching the ad")
            }
        }
        getUser()
    }, [id]);

    return (
        <Container>
            {/* Header */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 4, sm: 0 }} justifyContent={"space-between"} alignItems={"center"}>
                <Back title={item.title + " Details"} />
                <Chip label={item.status} color={item.status === "accepted" ? "success" : item.status === "canceled" ? "error" : "warning"} />
            </Stack>
            {/* Box Content */}
            <Details item={item} />
            {/* Images */}
            <Images item={item} />
            {/* Videos */}
            <Videos item={item} />
        </Container>
    );
};

const Details = ({ item }) => {

    const navigate = useNavigate()

    const data = [
        {
            key: "Title",
            value: item?.title,
        },
        {
            key: "Status",
            value: item?.status,
        },
        {
            key: "Phone",
            value: item?.phone_call,
        },
        {
            key: "WhatsApp",
            value: item?.phone_whatsapp,
        },
        {
            key: "Price",
            value: item?.price,
        },
        {
            key: "Price Negotiable?",
            value: item?.price_negotiable ? "Yes" : "No",
        },
        {
            key: "User Name",
            value: item?.user?.name,
        },
        {
            key: "User Email",
            value: item?.user?.email,
        },
        {
            key: "User Phone",
            value: item?.user?.phone,
        },
        {
            key: "Sub Category",
            value: item?.category ? item.category?.name : "N/A",
        },
        {
            key: "City",
            value: item?.city ? item.city?.name : "N/A",
        },
    {
            key: "Added At",
            value: item?.created_at && format(item?.created_at, "eee dd, MMM yyyy"),
        },
    ];

    return (
        <Box bgcolor={"primary.white"} p={"32px 16px"} borderRadius={"12px"} mt={8}>
            {/* Name && Icons */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 4, sm: 0 }} justifyContent={"space-between"} pb={8} mb={12} borderBottom={"1px solid"} borderColor={"primary.border"}>
                {/* Name */}
                <Stack spacing={4}>
                    <Typography variant="h3">{item?.title}</Typography>
                    <Typography variant="body">{item?.description}</Typography>
                </Stack>
                {/* Icons */}
                <Stack spacing={4} direction={"row"} alignItems={"center"}>
                    <Tooltip title={"Edit Ad Status"}>
                        <Link to={"/ads/edit/" + item.id}>
                            <IconButton color="success">
                                <Edit />
                            </IconButton>
                        </Link>
                    </Tooltip>
                </Stack>
            </Stack>
            {/* Equipment Data */}
            <Grid container spacing={4}>
                {/* Left Column */}
                <Grid item xs={12} md={6}>
                    <Stack spacing={8}>
                        {data?.slice(0, Math.ceil(data.length / 2)).map((item, i) => {
                            return (
                                <Stack direction={{xs : "column" , sm : "row"}} spacing={{xs : 2 , sm : 8}} key={i} borderBottom={"1px solid"} borderColor={"primary.border"} pb={8} mb={4}> 
                                    <Typography width={"150px"} variant="subtitle" color={"text.secondary"}>{item.key}:</Typography>
                                    {item.link ? <a href={item.link}>{item.value}</a> : <Typography variant="subtitle" onClick={() => {item.link && navigate(item.link)}} sx={{textDecoration : item.link && "underline" , transition : ".5s" , "&:hover" : item.link && {color : "primary.main" , cursor : "pointer"}}}>{item.value}</Typography>}
                                </Stack>
                            );
                        })}
                    </Stack>
                </Grid>
                {/* Right Column */}
                <Grid item xs={12} md={6}>
                    <Stack spacing={8}>
                        {data?.slice(Math.ceil(data.length / 2)).map((item, i) => {
                            return (
                                <Stack direction={{xs : "column" , sm : "row"}} spacing={{xs : 2 , sm : 8}} key={i}  borderBottom={"1px solid"} borderColor={"primary.border"} pb={8} mb={4}> 
                                    <Typography width={"150px"} variant="subtitle" color={"text.secondary"}>{item.key}:</Typography>
                                    {item.link ? <a href={item.link}>{item.value}</a> : <Typography variant="subtitle" onClick={() => {item.link && navigate(item.link)}} sx={{textDecoration : item.link && "underline" , transition : ".5s" , "&:hover" : item.link && {color : "primary.main" , cursor : "pointer"}}}>{item.value}</Typography>}
                                </Stack>
                            );
                        })}
                    </Stack>
                </Grid>
                {/* Description Section - Full Width */}
                {item?.description && (
                    <Grid item xs={12} mt={4}>
                        <Typography variant="h6" mb={2}>Description</Typography>
                        <Typography variant="body">{item.description}</Typography>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

const Images = ({ item }) => {

    return (
        <Box bgcolor={"primary.white"} p={"32px 16px"} borderRadius={"12px"} mt={8}>
            {/* Name && Icons */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 4, sm: 0 }} justifyContent={"space-between"} pb={8} mb={12} borderBottom={"1px solid"} borderColor={"primary.border"}>
                <Typography variant="h3">Images</Typography>
            </Stack>
            {/* Equipment Data */}
            <Grid container spacing={4}>
                {item?.images?.length > 0 ? item.images.map((img, i) => (
                    <Grid item xs={12} sm={6} md={4} key={i}>
                        <Box component={"img"} src={img.url} alt={item.title} width={"100%"} height={"200px"} sx={{objectFit : "fill"}} borderRadius={"8px"} />
                    </Grid>
                )) : (
                    <Grid item xs={12}>
                        <Typography variant="body" color={"text.secondary"}>No images available</Typography>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

const Videos = ({ item }) => {

    return (
        <Box bgcolor={"primary.white"} p={"32px 16px"} borderRadius={"12px"} mt={8}>
            {/* Name && Icons */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 4, sm: 0 }} justifyContent={"space-between"} pb={8} mb={12} borderBottom={"1px solid"} borderColor={"primary.border"}>
                <Typography variant="h3">Videos</Typography>
            </Stack>
            {/* Equipment Data */}
            <Grid container spacing={4}>
                {item?.videos?.length > 0 ? item.videos.map((vid, i) => (
                    <Grid item xs={12} sm={6} md={4} key={i}>   
                        <Box component={"video"} src={vid.url} width={"100%"} height={"200px"} controls sx={{objectFit : "fill"}} borderRadius={"8px"} />
                    </Grid>
                )) : (
                    <Grid item xs={12}>
                        <Typography variant="body" color={"text.secondary"}>No videos available</Typography>
                    </Grid>
                    
                )}
            </Grid>
        </Box>
    );
};

export default Profile;
