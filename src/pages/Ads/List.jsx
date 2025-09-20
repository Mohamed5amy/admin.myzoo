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
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { fetchAds } from "@/APIs/Ads";
import { AccountTree, AttachMoney, Category, Flag, LocationCity, Sort } from "@mui/icons-material";
import { fetchCountries } from "@/APIs/Countries";
import { fetchCities } from "@/APIs/Cities";
import { fetchCategories } from "@/APIs/Categories";
import { fetchSCategories } from "@/APIs/SCategories";
import { useDebounce } from "@/hooks/useDebounce";


const List = () => {
    const headers = ["Ad Title" , "Status" ,"City" , "Category" , "Price" , "Added At"];
    const body = ["title" , "status" , "city" , "category" , "price" , "created_at"];

    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1)
    const [items, setItems] = useState([]);
    const [response, setResponse] = useState({});

    // Filter
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sorting, setSorting] = useState(1);
    const [countries, setCountries] = useState("");
    const [cities, setCities] = useState("");
    const [categories, setCategories] = useState("");
    const [sCategories, setSCategories] = useState("");
    const [status, setStatus] = useState("");

    // Debounce
    const minDebounce = useDebounce(minPrice, 500);
    const maxDebounce = useDebounce(maxPrice, 500);

    // Get items
    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            // Logic Starts
            const res = await fetchAds(1 , minPrice, maxPrice, sorting, countries, cities, categories, sCategories, status);
            console.log(res)
            if (res.status) {
                const ads = res.data.ad.data;
                setItems(ads.map(ad => ({
                    id : ad.id,
                    created_at : format(ad.created_at , "dd, MMM yyyy"),
                    title : ad.title,
                    status : ad.status,
                    city : ad.city?.name || "N/A",
                    category : ad.category?.name || "N/A",
                    price : ad.price,
                })))
                setResponse(res.data.ad)
            } else {
                toast.error(res)
            }
            // Logic Ends
            setLoading(false)
        }
        fetchItems()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page , minDebounce, maxDebounce, sorting, countries, cities, categories, sCategories, status]);

    return (
        <Container>
            {/* Filter */}
            <Grid container  mb={8} spacing={{ xs: 4, sm: 6, md: 8 }} alignItems={"center"}>
                <Grid item xs={6} sm={6} md={3}><Categories data={categories} setData={setCategories} /></Grid>
                <Grid item xs={6} sm={6} md={3}><SCategories data={sCategories} setData={setSCategories} /></Grid>
                <Grid item xs={6} sm={6} md={3}><Countries data={countries} setData={setCountries} /></Grid>
                <Grid item xs={6} sm={6} md={3}><Cities data={cities} setData={setCities} /></Grid>
                <Grid item xs={6} sm={6} md={3}><MinMoney data={minPrice} setData={setMinPrice} /></Grid>
                <Grid item xs={6} sm={6} md={3}><MaxMoney data={maxPrice} setData={setMaxPrice} /></Grid>
                <Grid item xs={6} sm={6} md={3}><Sorting data={sorting} setData={setSorting} /></Grid>
                <Grid item xs={6} sm={6} md={3}><Status data={status} setData={setStatus} /></Grid>
            </Grid>
            {/* Table */}
            <Table headers={headers} data={items} loading={loading} edit={true} profile={true} body={body} />
            {/* Number */}
            <Stack direction={"row"} spacing={8} alignItems={"center"} justifyContent={"space-between"}>
                <Typography fontWeight={500} mt={8} color={"text.secondary"}> Total Ads : {response.total} </Typography>
                <Stack direction={"row"} spacing={4} alignItems={"center"}>
                    <Pagination count={response.last_page} onChange={(_,value) => setPage(value)} />
                    <CSVLink data={items.length > 0 ? items : []}>
                        <IconButton color="primary">
                            <SaveAltIcon />
                        </IconButton>
                    </CSVLink>
                </Stack>
            </Stack>
        </Container>
    );
};

const MinMoney = ({ data, setData }) => {
    
    return (
        <TextField type="search" sx={{ bgcolor: "primary.white" , width : "100%" }} placeholder="Min Price..."
            InputProps={{ startAdornment: (<InputAdornment position="start"><AttachMoney color={data && "primary"} /></InputAdornment>) }}
            value={data}
            onChange={(e) => setData(e.target.value)}
        />
    )
}

const MaxMoney = ({ data, setData }) => {

    return (
        <TextField type="search" sx={{ bgcolor: "primary.white" , width : "100%" }} placeholder="Max Price..."
            InputProps={{ startAdornment: (<InputAdornment position="start"><AttachMoney color={data && "primary"} /></InputAdornment>) }}
            value={data}
            onChange={(e) => setData(e.target.value)}
        />
    )
}

const Sorting = ({ data, setData }) => {
    return (
        <TextField select sx={{ bgcolor: "primary.white", width: "100%" }} label="Sorting"
            InputProps={{ startAdornment: (<InputAdornment position="start"><Sort color={"primary"} /></InputAdornment>) }}
            value={data}
            onChange={(e) => setData(e.target.value)}
        >
            <MenuItem value={1}>Newest</MenuItem>
            <MenuItem value={0}>Oldest</MenuItem>
        </TextField>
    )
}

const Status = ({ data, setData }) => {
    return (
        <TextField select sx={{ bgcolor: "primary.white", width: "100%" }} label="Status"
            InputProps={{ startAdornment: (<InputAdornment position="start"><Sort color={"primary"} /></InputAdornment>) }}
            value={data}
            onChange={(e) => setData(e.target.value)}
        >
            <MenuItem value={"accepted"}>Accepted</MenuItem>
            <MenuItem value={"pending"}>Pending</MenuItem>
            <MenuItem value={"canceled"}>Canceled</MenuItem>
        </TextField>
    )
}

const Countries = ({ data, setData }) => {

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
        <TextField select sx={{ bgcolor: "primary.white", width: "100%" }} label="Countries"
            InputProps={{ startAdornment: (<InputAdornment position="start"><Flag color={data && "primary"} /></InputAdornment>) }}
            value={data}
            onChange={(e) => setData(e.target.value)}
        >
            <MenuItem key={"all"} value={""}>All</MenuItem>
            {items.map(item => (
                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
            ))}
        </TextField>
    )
}

const Cities = ({ data, setData }) => {

    const [items, setItems] = useState([]);

    // Get items
    useEffect(() => {
        const fetchItems = async () => {
            const res = await fetchCities()
            if (res.status) {
                const cities = res.data.city;
                setItems(cities.map(city => ({
                    id : city.id,
                    name : city.name,
                })))
            } else {
                toast.error(res)
            }
        }
        fetchItems()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <TextField select sx={{ bgcolor: "primary.white", width: "100%" }} label="Cities"
            InputProps={{ startAdornment: (<InputAdornment position="start"><LocationCity color={data && "primary"} /></InputAdornment>) }}
            value={data}
            onChange={(e) => setData(e.target.value)}
        >
            <MenuItem key={"all"} value={""}>All</MenuItem>
            {items.map(item => (
                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
            ))}
        </TextField>
    )
}

const Categories = ({ data, setData }) => {

    const [items, setItems] = useState([]);

    // Get items
    useEffect(() => {
        const fetchItems = async () => {
            const res = await fetchCategories()
            if (res.status) {
                const categories = res.data.category;
                setItems(categories.map(category => ({
                    id : category.id,
                    name : category.name,
                })))
            } else {
                toast.error(res)
            }
        }
        fetchItems()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <TextField select sx={{ bgcolor: "primary.white", width: "100%" }} label="Categories"
            InputProps={{ startAdornment: (<InputAdornment position="start"><Category color={data && "primary"} /></InputAdornment>) }}
            value={data}
            onChange={(e) => setData(e.target.value)}
        >
            <MenuItem key={"all"} value={""}>All</MenuItem>
            {items.map(item => (
                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
            ))}
        </TextField>
    )
}

const SCategories = ({ data, setData }) => {

    const [items, setItems] = useState([]);

    // Get items
    useEffect(() => {
        const fetchItems = async () => {
            const res = await fetchSCategories()
            if (res.status) {
                const categories = res.data.category;
                setItems(categories.map(category => ({
                    id : category.id,
                    name : category.name,
                })))
            } else {
                toast.error(res)
            }
        }
        fetchItems()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <TextField select sx={{ bgcolor: "primary.white", width: "100%" }} label="Sub Categories"
            InputProps={{ startAdornment: (<InputAdornment position="start"><AccountTree color={data && "primary"} /></InputAdornment>) }}
            value={data}
            onChange={(e) => setData(e.target.value)}
        >
            <MenuItem key={"all"} value={""}>All</MenuItem>
            {items.map(item => (
                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
            ))}
        </TextField>
    )
}

export default List;
