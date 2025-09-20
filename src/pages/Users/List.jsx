import {
    Grid,
    IconButton,
    InputAdornment,
    MenuItem,
    Pagination,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import Container from "@/components/Container/Container";
import Table from "@/components/Table/Table";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { fetchUsers } from "@/APIs/User";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { useDebounce } from "@/hooks/useDebounce";
import { Block } from "@mui/icons-material";


const List = () => {
    const headers = ["User" , "Email" ,"Phone" , "Status" , "Joined At"];
    const body = ["name" , "email" , "phone" , "is_blocked" , "created_at"];

    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("");
    const [items, setItems] = useState([]);
    const [response, setResponse] = useState({});
    const [status, setStatus] = useState(0);

    const debouncedQuery = useDebounce(search , 500)

    // Get items
    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            // Logic Starts
            const res = await fetchUsers(1 , status , debouncedQuery)
            console.log(res)
            if (res.status) {
                const users = res.data.user.data;
                setItems(users.map(user => ({
                    id : user.id,
                    created_at : format(user.created_at , "dd, MMM yyyy"),
                    name : user.name,
                    email : user.email,
                    phone : user.phone,
                    is_blocked : user.is_blocked ? "Blocked" : "Active"
                })))
                setResponse(res.data.user)
            } else {
                toast.error(res)
            }
            // Logic Ends
            setLoading(false)
        }
        fetchItems()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page , debouncedQuery , status]);

    return (
        <Container>
            {/* Filter */}
            <Grid container  mb={8} spacing={8} alignItems={"center"}>
                <Grid item xs={12} sm={6} md={6}><SearchBar search={search} setSearch={setSearch} /></Grid>
                <Grid item xs={12} sm={6} md={5}><StatusFilter status={status} setStatus={setStatus} /></Grid>
                <Grid item xs={12} sm={6} md={1}>
                    <CSVLink data={items.length > 0 ? items : []}>
                        <IconButton color="primary">
                            <SaveAltIcon />
                        </IconButton>
                    </CSVLink>
                </Grid>
            </Grid>
            {/* Table */}
            <Table headers={headers} data={items} loading={loading} edit={true} body={body} />
            {/* Number */}
            <Stack direction={"row"} spacing={8} alignItems={"center"} justifyContent={"space-between"}>
                <Typography fontWeight={500} mt={8} color={"text.secondary"}> Total Users : {response.total} </Typography>
                <Pagination count={response.last_page} onChange={(_,value) => setPage(value)} />
            </Stack>
        </Container>
    );
};

const SearchBar = ({ search, setSearch }) => {
    
    return (
        <TextField type="search" sx={{ bgcolor: "primary.white" , width : "100%" }} placeholder="Search User..."
            InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon color={search && "primary"} /></InputAdornment>) }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    )
}

const StatusFilter = ({ status, setStatus }) => {
    return (
        <TextField select sx={{ bgcolor: "primary.white", width: "100%" }} label="Status"
            InputProps={{ startAdornment: (<InputAdornment position="start"><Block color={status !== "" ? "primary" : ""} /></InputAdornment>) }}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
        >
            <MenuItem value={""}>All</MenuItem>
            <MenuItem value={1}>blocked</MenuItem>
            <MenuItem value={0}>active</MenuItem>
        </TextField>
    )
}

export default List;
