import { Box, Stack } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { useState } from "react";
import Footer from "../Footer/Footer";





const Container = ({children}) => {

  const [active, setActive] = useState(true)

  return (
    <Stack direction={"row"} minHeight={"100vh"} >
      <Sidebar active={active} />
      <Stack direction={"column"} flex={1} width={"100%"} justifyContent={"start"} position={"relative"} pb={20} > 
        <Navbar setActive={setActive} active={active} />
        <Box p={"16px 32px 16px 24px"}>{children}</Box>
        <Footer />
      </Stack>
    </Stack>
  )



}

export default Container
