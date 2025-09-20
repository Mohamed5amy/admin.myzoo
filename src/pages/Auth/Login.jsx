// images
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import Lottie from "lottie-react";
import pets from "@/icons/pets.json";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "@/components/Input/Input";
import { loginRequest } from "@/APIs/Auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useIsAuthenticated, useSignIn } from "react-auth-kit";


const Login = () => {
  
  const { register, handleSubmit, formState: { errors } } = useForm();  
  const [loading, setLoading] = useState(false)

  // is Logged in ?
  const isAuthenticated = useIsAuthenticated()
  const signIn = useSignIn()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/users")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Submit Login data
  const onSubmit = async (data) => {
    setLoading(true)
    // Logic Start
    const response = await loginRequest(data.email , data.password)
    console.log(response)
    if (response.success) {
      const data = response.data
      signIn({
        token : data.token,
        expiresIn: 36000,
        tokenType : "Bearer",
        authState : {
          id : data.user.id,
          email : data.user.email,
          name : data.user.name,
          token : data.token,
        }
      })
      navigate("/users")
      toast.success(`Welcome ${data.user.name} 👋`)
    } else {
      toast.error(response.error)
    }
    // Logic End
    setLoading(false)
  }
  
  return (
    <Stack width={"100%"} height={"100vh"} flexDirection={"row"} alignItems={"center"} justifyContent={"center"}>
      {/* Logo */}
      <Box position={"absolute"} left={10} top={10}> <img src="/logo.png" alt="logo" width={80} /> </Box>
      {/* Form */}
      <Box flex={1} height={"100%"} bgcolor={"white"} display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
        <form>
          {/* Title */}
          <Typography variant="h2" textAlign={"center"} color={"primary.main"}> 
            Welcome To 
          </Typography>
          <Typography variant="h2" textAlign={"center"} color={"text.secondary"} mb={20}> 
            My Zoo Dashboard
          </Typography>
          {/* Form */}
          <Stack width={{ xs : "300px" , sm : "360px" }} spacing={12} >
            <Input label={"Email"} required={true} type={"email"} error={errors?.email?.message} register={register} registerName={"email"} />
            <Input label={"Password"} required={true} error={errors?.password?.message} type={"password"} register={register} registerName={"password"} />
          </Stack>
          {/* Button */}
          <Button disabled={loading} variant="contained" sx={{p : "15px 0" , borderRadius : "8px" , width : "100%" , my : 20 , height : "58px"}} onClick={handleSubmit(onSubmit)} >
            {loading ?
            <CircularProgress /> : <Typography variant="button" color={"primary.white"} >Login</Typography>}
          </Button>
        </form>
      </Box>
      {/* Image */}
      <Box flex={1} height={"100%"} bgcolor={"primary.main"} display={{xs : "none" , md : "flex"}} alignItems={"center"} justifyContent={"center"}>
        <Lottie animationData={pets} loop={true} />
      </Box>
    </Stack>
  )
}

export default Login
