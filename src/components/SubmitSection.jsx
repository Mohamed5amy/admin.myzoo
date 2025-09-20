import { Button, CircularProgress, Stack } from '@mui/material';

const SubmitSection = ({ onSubmit, handleSubmit, loading }) => {
    return (
        <Stack direction={{xs : "column" , sm : "row"}} spacing={12} justifyContent={"end"} my={20}>
            <Button
                variant="outlined"
                sx={{ p: "16px 80px", borderRadius: "8px" , height : "58px" }}
                onClick={() => history.back()}
            >
                
                Cancel
            </Button>
            <Button
                variant="contained"
                sx={{ p: "16px 80px", borderRadius: "8px" , height : "58px" }}
                onClick={handleSubmit(onSubmit)}
                disabled={loading}
            >

                {loading ? <CircularProgress sx={{height : "28px !important" , width : "28px !important"}} /> : "Save"}
            </Button>
        </Stack>
    );
};

export default SubmitSection