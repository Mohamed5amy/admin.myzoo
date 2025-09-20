import { ChevronLeft } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";

const Back = ({ title }) => {
    return (
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <IconButton color="primary" onClick={() => history.back()}>
                <ChevronLeft fontSize="large" sx={{transition : "1s" , "&:hover" : {rotate : "360deg" , scale : "1.2"}}} />
            </IconButton>
            <Typography variant="subtitle"> {title} </Typography>
        </Stack>
    );
};

export default Back;
