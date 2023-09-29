import * as React from "react";

import {Outlet, Link, useNavigate} from "react-router-dom";
import { login } from "../../service/api";
import ChatPage from "../chat/Chatpage";
import Signup from '../account/SignUp';
import jwt_decode from 'jwt-decode';
import {
  TextField,
  Box,
  Button,
  Dialog,
  styled,
  IconButton,
  FormControl,
  InputLabel,
  InputAdornment,
  Input,
  Typography,
  Modal
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import DraftsTwoToneIcon from '@mui/icons-material/DraftsTwoTone';
import FaceTwoToneIcon from '@mui/icons-material/FaceTwoTone';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:8000");



const Component = styled(Box)`
  margin-left: 25% ;
  border-radius: 4px ;
  padding: 3rem;
  `

const Title = styled(Typography)`
  margin-top: 10%;

  font-size: 2rem;
  font-family: 'Sans Serif';
  color: #3d9c81;
`;

const StyledButton = styled(Button)`
  background-color: #00a884;
  margin-top: 3rem;
  margin-left: 5%;
  width: 20rem;
  &:hover {
    background-color: #3d9c81;
  }
`;

const StyledTextField = styled(TextField)`
margin: 0.5rem;
width: 20rem;
`;

const Text = styled(Typography)`
padding-top: 1rem;
padding-left: 15%;
`

const dialogStyle = {
    height: "96%",
    marginTop: '12%',
    width: '60%',
    maxWidth: '100%',
    maxHeight: '100%',
    boxShadow: 'none',
    overflow: 'hidden'

}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");


  // const { setAccount } = React.useContext(AccountContext);


  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const onLoad = () => {
      let token = localStorage.getItem('details');
      if(token){
        navigate("/chatpage");
      }
    }
    onLoad();
  }, [navigate])

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function handleName(e){
    setName(e.target.value);
  }
  function handleEmail(e){
    setEmail(e.target.value);
  }
  function handlePassword(e){
    setPassword(e.target.value);
  }
  const handleModal = () => setOpen1(false);
  const handleModal2 = () => setOpen2(false);
  const handleModal3 = () => setOpen3(false);

  async function alertModal() {
    
    let data={
      "name": name,
      "email": email,
      "password": password
    }

    if(name !=="" && email !== "" && password !== ""){
      let user = await login(data);
      // console.log(user);
      if(user.err === true && user.data.length === 0){
        // alert("user not found");
        setOpen3(true);
      }else if(user.err === true && user.data === false){
        // alert("Wrong Password");
        setOpen2(true)
      }else if(user.err === false){
         localStorage.setItem("details", user.data.details);
         localStorage.setItem("id", user.data.id);
         localStorage.setItem("name", user.data.name);
         localStorage.setItem("email", user.data.email);
         localStorage.setItem("dp", user.data.dp);
         let data={
          "user_id": user.data.id,
          "status": "online"
         }
         socket.emit("login-socket", data)
         console.log(user.data.details);
         navigate('/chatpage');
         
        //  setAccount(res.data[0]);
      }
      // console.log(data);
      // localStorage.setItem("details", user.data.details);
      // let res = jwt_decode(user.data.details);
      // console.log(res.data);
      // setAccount(res.data[0]);
    }else{
      setOpen1(true);
    }
    
  }
  return (
    
    <Dialog
    open={true}
    PaperProps={{sx: dialogStyle}}
    hideBackdrop={true}>
        <Component>
      <Title variant="h3" gutterBottom>Login:</Title>
      
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      <FaceTwoToneIcon />
      <StyledTextField
        required
        id="standard-required"
        label="User Name"
        defaultValue=""
        variant="standard"
        onChange={handleName}
      />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      <DraftsTwoToneIcon />
      <StyledTextField
        required
        id="standard-required"
        label="Email"
        defaultValue=""
        variant="standard"
        onChange={handleEmail}
      />
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      <LockTwoToneIcon />
      <FormControl sx={{'width': '21rem', 'margin': '0.5rem'}} variant="standard">
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
          id="standard-adornment-password"
          onChange={handlePassword}
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
    </FormControl>
    </Box>
    <Box>
      <StyledButton variant="contained" size="large" onClick={alertModal}>
            Login
          </StyledButton>
          <Text>New member? <Link to = '/signup'><Button sx={{color: '#3d9c81'}}>Signup</Button> </Link></Text>
          <Modal
          open={open1}
          onClose={handleModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Hey,
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Please fill the required field to continue..
            </Typography>
            <Button variant="contained" size="medium" style={{backgroundColor: '#00a884', marginLeft: '80%', marginTop: '0.5rem'}} onClick={handleModal}>Ok</Button>
          </Box>
        </Modal>
        <Modal
          open={open2}
          onClose={handleModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Hey,
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              You entered wrong password!
            </Typography>
           
            <Button variant="contained" size="medium" style={{backgroundColor: '#00a884', marginLeft: '80%', marginTop: '0.5rem'}} onClick={handleModal2}>Cancel</Button>
          </Box>
        </Modal>
        <Modal
          open={open3}
          onClose={handleModal3}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Hey,
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              You didnot Signup here. Signup?
            </Typography>
            <Link to="/signup"><Button variant="contained" size="medium" style={{backgroundColor: '#00a884', marginLeft: '55%', marginTop: '0.5rem'}}>Signup</Button></Link>
            <Button variant="contained" size="medium" style={{backgroundColor: '#00a884', marginLeft: '0.8rem', marginTop: '0.5rem'}} onClick={handleModal3}>Ok</Button>
          </Box>
        </Modal>
          </Box>
          <Modal
          open={open3}
          onClose={handleModal3}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Hey,
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              You didnot Signup here. Signup?
            </Typography>
            <Link to="/signup"><Button variant="contained" size="medium" style={{backgroundColor: '#00a884', marginLeft: '55%', marginTop: '0.5rem'}}>Signup</Button></Link>
            <Button variant="contained" size="medium" style={{backgroundColor: '#00a884', marginLeft: '0.8rem', marginTop: '0.5rem'}} onClick={handleModal3}>Ok</Button>
          </Box>
        </Modal>
    
          </Component>
    </Dialog>
  );
};

export default Login;
