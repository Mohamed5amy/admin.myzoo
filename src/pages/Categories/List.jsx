import {
    Button,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import Container from "@/components/Container/Container";
import Table from "@/components/Table/Table";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import { deleteCategory, fetchCategories } from "@/APIs/Categories";


const List = () => {
    
    const headers = ["Category Name" , "Added At" ];
    const body = ["name" ,"created_at"];

    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);

    // Get items
    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            // Logic Starts
            const res = await fetchCategories()
            console.log(res)
            if (res.status) {
                const categories = res.data.category;
                setItems(categories.map(category => ({
                    id : category.id,
                    created_at : format(category.created_at , "dd, MMM yyyy"),
                    name : category.name,
                })))
            } else {
                toast.error(res)
            }
            // Logic Ends
            setLoading(false)
        }
        fetchItems()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Handle Delete
    const handleDelete = async (id) => {
        const res = await deleteCategory(id)
        if (res.status) {
            toast.success("Category Deleted successfully")
            window.location.reload()
        } else {
            toast.error(res)
        }
    };

    return (
        <Container>
            {/* Filter */}
            <Stack direction={{xs : "column" , sm : "row"}} alignItems={"center"} justifyContent={"space-between"} mb={8} spacing={8}>
                <div></div>
                <Stack direction={"row"} spacing={8} alignItems={"center"}>
                    <Link to={"add"}>
                        <Button startIcon={<AddCircleOutlineOutlined />} variant="contained" sx={{ p: "16px 40px", borderRadius: "8px" }}>
                            Add Category
                        </Button>
                    </Link>
                    <CSVLink data={items.length > 0 ? items : []}>
                        <IconButton color="primary">
                            <SaveAltIcon />
                        </IconButton>
                    </CSVLink>
                </Stack>
            </Stack>
            {/* Table */}
            <Table headers={headers} data={items} loading={loading} body={body} edit={true} deleteFn={handleDelete} />
            {/* Number */}
            <Stack direction={"row"} spacing={8} alignItems={"center"} justifyContent={"space-between"}>
                <Typography fontWeight={500} mt={8} color={"text.secondary"}> Total Categories : {items.length} </Typography>
            </Stack>
        </Container>
    );
};

export default List;
