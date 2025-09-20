import { Stack } from "@mui/material";

const Footer = () => {
    const date = new Date();

    return (
        <Stack
            direction={"row"}
            alignItems={"center"}
            position={"absolute"}
            bottom={10}
            left={0}
            justifyContent={"center"}
            fontSize={{ xs: 12, sm: 16 }}
            width={"100%"}
        >
            Copyright © {date.getFullYear()}&nbsp; MyZoo All Rights Reserved. Developed By&nbsp; <a href="https://www.s-plus.me/" target="_blank" rel="noreferrer">SPlus</a>
        </Stack>
    );
};

export default Footer;
