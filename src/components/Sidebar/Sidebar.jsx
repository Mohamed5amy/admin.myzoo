import "./Sidebar.scss";
import { Link, useNavigate } from "react-router-dom";
// images
import { Stack, Typography } from "@mui/material";
import logoImg from "@/images/logo.png";
import { Logout } from "@mui/icons-material";
import { useState } from "react";
import HoverLottie from "../HoverLottie";
import userIcon from '@/icons/user.json';
import categoriesIcon from '@/icons/categories.json';
import countryIcon from '@/icons/country.json';
import cityIcon from '@/icons/city.json';
import scategoriesIcon from '@/icons/scategories.json';
import adsIcon from '@/icons/ads.json';
import { useSignOut } from "react-auth-kit";
// import equipmentsIcon from '@/icons/equipments.json';

const Sidebar = ({ active }) => {

    const elements = [
        {
            name: "Users",
            icon: userIcon,
            to: "/users",
        },
        {
            name: "Ads",
            icon: adsIcon,
            to: "/ads",
        },
        {
            name: "General Categories",
            icon: categoriesIcon,
            to: "/general-categories",
        },
        {
            name: "Categories",
            icon: categoriesIcon,
            to: "/categories",
        },
        {
            name: "Sub Categories",
            icon: scategoriesIcon,
            to: "/sub-categories",
        },
        {
            name: "Countries",
            icon: countryIcon,
            to: "/countries",
        },
        {
            name: "Cities",
            icon: cityIcon,
            to: "/cities",
        },
    ];

    const navigate = useNavigate();

    // Name
    // const user = JSON.parse(localStorage.getItem('user'))  
    // const name = user.first_name
    const signOut = useSignOut()
    // handle logOut
    const logOut = async () => {
        signOut()
        navigate("/")
    };

    return (
        <div className="sideContainer" style={{maxWidth : active ? 250 : 0}}>
            <div className="sidebar">
                {/* Logo */}
                <Stack maxWidth={80} mx={"auto"} mt={10} mb={20}> <img src={logoImg} alt="logo" width={"100%"} /> </Stack>
                {/* Elements */}
                <Stack spacing={4}>
                    {elements.map((element , i) => {
                        return (
                            <Item key={i} element={element} />
                        )
                    })}
                </Stack>
                {/* Logout for mobile */}
                <Stack direction={"row"} spacing={8} onClick={logOut} sx={{
                        position: "absolute",
                        bottom: "40px",
                        left: "20px",
                        color: "primary.main",
                        cursor: "pointer",
                        transition: ".5s",
                        "&:hover": {
                            color: "error.main",
                        },
                    }}
                >
                    <Logout />
                    {active && (<Typography variant="subtitle">Logout</Typography>)}
                </Stack>
            </div>
        </div>
    );
};

const Item = ({element}) => {
    const [active, setActive] = useState(false)
    return (
        <Link to={element.to} className={`item ${(window.location.pathname.includes(element.to) && element.to !== "") && "active"}`}
        onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}>
            <Stack alignItems={"center"} justifyContent={"center"} width={"30px"} height={"30px"} bgcolor={"white"} borderRadius={"50%"}>
                <HoverLottie icon={element.icon} w={25} h={25} play={active} />
            </Stack>
            <p> {element.name} </p> 
        </Link>
    )
}

export default Sidebar;
