import {
    Chip,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import Container from "@/components/Container/Container";
import { useEffect, useState } from "react";
import { fetchBanner } from "@/APIs/Banner";
import { toast } from "react-toastify";
import AddSlide from "./components/AddSlide";
import DeleteSlide from "./components/DeleteSlide";
import EditSlide from "./components/EditSlide";
import { Link } from "react-router-dom";



const List = () => {

    const [items, setItems] = useState([]);

    // Get items
    useEffect(() => {
        const fetchItems = async () => {
            const res = await fetchBanner()
            if (res.status) {
                setItems(res.data.slide)
            } else {
                toast.error(res)
            }
        }
        fetchItems()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} >
                <Typography variant="title" color={"text.third"} > Banner Images </Typography>
                <AddSlide setItems={setItems} />
            </Stack>
            
            <Grid container spacing={12} my={8}>
                {items?.map((item , i) => {
                    return (
                        <Grid item xs={6} sm={4} key={i}>
                            <Stack border={"1px solid"} overflow={"hidden"} borderColor={"#D1D8DD"} borderRadius={"8px"} sx={{transition : ".5s"}}>
                                <Stack height={240} > 
                                    <img src={item.image} style={{height : "100%" , width : "100%" , objectFit : "cover"}} /> 
                                </Stack>
                            </Stack>

                            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} mt={2}>
                                <Link to={item.url} target="_blank"><Chip label={"Go To Link"} variant="contained" color="primary" clickable /></Link>
                                <Stack direction={"row"} spacing={2} mt={2} >
                                    <DeleteSlide setItems={setItems} id={item.id} />
                                    <EditSlide setItems={setItems} item={item} />
                                </Stack>
                            </Stack>

                        </Grid>
                    )
                })}
            </Grid>            
        </Container>
    );
};

export default List;
