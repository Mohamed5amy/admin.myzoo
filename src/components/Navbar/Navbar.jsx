import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { IconButton, Stack, Typography } from '@mui/material';
import "./Navbar.scss"
import { useAuthUser } from 'react-auth-kit';


const Navbar = ({active , setActive}) => {

  const userData = useAuthUser()
  const user = userData()

  return (
    <div className='Navbar'>
      <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} height={"100%"} px={{xs : 4 , sm : 16}} py={9} spacing={{xs : 4 , md : 12}} >

        {/* Toggle Sidebar */}
        <IconButton color='primary.main' 
        sx={{borderRadius : "8px"}}
        onClick={() => setActive(!active)} 
        >
          <MenuOpenIcon sx={{
            transition : ".5s",
            rotate : active ? "180deg" : "0deg",
          }} />
        </IconButton>

        {/* Profile */}
        <Stack direction={"row"} spacing={4} alignItems={"center"}>
          <Stack width={{xs : "40px" , sm : "60px"}} height={{xs : "40px" , sm : "60px"}} borderRadius={"50%"} bgcolor={"primary.background"} alignItems={"center"} justifyContent={"center"} color={"primary.main"} fontSize={{xs : "20px" , sm :"24px"}} fontWeight={500}>
            {user.name && user.name[0]?.toUpperCase()}
          </Stack>
          <Stack display={{xs : "none" , sm : "flex"}} >
            <Typography variant='subtitle'>{user.name}</Typography>
            <Typography variant='body' color={"text.secondary"}> Admin </Typography>
          </Stack>
        </Stack>

      </Stack>  
    </div>
  )
}

export default Navbar
