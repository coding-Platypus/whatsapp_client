import * as React from "react";
import { Outlet, Link } from "react-router-dom";
import {
  TextField,
  Box,
  Button,
  styled,
  Dialog,
  IconButton,
  FormControl,
  InputLabel,
  InputAdornment,
  Input,
  Typography,
  Modal,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import DraftsTwoToneIcon from "@mui/icons-material/DraftsTwoTone";
import PhoneTwoToneIcon from "@mui/icons-material/PhoneTwoTone";
import FaceTwoToneIcon from "@mui/icons-material/FaceTwoTone";
import LockTwoToneIcon from "@mui/icons-material/LockTwoTone";
import { addUser } from "../../service/api";

const Component = styled(Box)`
  margin-left: 25%;

  border-radius: 4px;
  padding: 2rem;
`;

const Title = styled(Typography)`
  font-wetght: 600;
  font-size: 2rem;
  font-family: "Sans Serif";
  color: #3d9c81;
`;

const StyledButton = styled(Button)`
  background-color: #00a884;
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
  padding-top: 0.7rem;
  padding-left: 15%;
`;

const Alert = styled(Typography)`
  color: red;
  padding-top: 0.7rem;
  padding-left: 1rem;
  font-size: 0.9rem;
`;
const dialogStyle = {
  height: "96%",
  marginTop: "12%",
  width: "60%",
  maxWidth: "100%",
  maxHeight: "100%",
  boxShadow: "none",
  overflow: "hidden",
};

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


const Signup = () => {
  const [showPassword1, setShowPassword1] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [user, setUser] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmpass, setConfirmpass] = React.useState("");
  const [matchMessage, setMatchMessage] = React.useState("");
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const handleModal = () => setOpen1(false);
  const handleClose1 = () => setOpen2(false);
  const handleClose2 = () => setOpen3(false);
  

  function handleClickName(e) {
    setName(e.target.value);
    e.preventDefault();
  }

  function handleClickEmail(e) {
    setEmail(e.target.value);
    e.preventDefault();
  }

  function handleClickPhone(e) {
    setPhone(e.target.value);
    e.preventDefault();
  }

  function handleClickUser(e) {
    setUser(e.target.value);
    e.preventDefault();
  }

  function handleClickPassword(e) {
    setPassword(e.target.value);
    checkMatch(e.target.value, confirmpass);
  }
  function handleClickConfirmpass(e) {
    setConfirmpass(e.target.value);
    checkMatch(password, e.target.value);
  }


  const checkMatch = (value1, value2) => {
    
    if (value1 !== value2) {
      setMatchMessage("⚠️ Passwords do not Match!");
    } else {
      setMatchMessage("");
    }
  };

   async function handleSignup(){
    let data = {
      "name": name,
      "email": email,
      "phone": phone,
      "user": user,
      "password": confirmpass
    }
    console.log(data);
    if(email !== "" && phone !== "" && user !== "" && password !== "" && confirmpass !== "" && password === confirmpass){
      let confirmation = await addUser(data);
      console.log(confirmation);
      if(confirmation.err === false) {
        setOpen2(true);
      } else{
        setOpen3(true);
      }
      
    }else{
      setOpen1(true);
    }
  }


  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };

  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };
  return (
    <>
    <Dialog open={true} PaperProps={{ sx: dialogStyle }} hideBackdrop={true}>
      <Component>
        <Title>Signup:</Title>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <AccountCircle />
          <StyledTextField
            id="standard"
            label="Full Name"
            defaultValue=""
            variant="standard"
            onChange={handleClickName}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <DraftsTwoToneIcon />
          <StyledTextField
            required
            id="standard-required"
            label="Email"
            defaultValue=""
            variant="standard"
            onChange={handleClickEmail}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <PhoneTwoToneIcon />
          <StyledTextField
            required
            id="standard-required"
            label="Phone Number"
            defaultValue=""
            variant="standard"
            onChange={handleClickPhone}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <FaceTwoToneIcon />
          <StyledTextField
            required
            id="standard-required"
            label="User Name"
            defaultValue=""
            variant="standard"
            onChange={handleClickUser}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <LockTwoToneIcon />
          <FormControl
            sx={{ width: "21rem", margin: "0.5rem" }}
            variant="standard"
          >
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              onChange={handleClickPassword}
              type={showPassword1 ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword1}
                    onMouseDown={handleMouseDownPassword1}
                  >
                    {showPassword1 ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>

        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <LockTwoToneIcon />
          <FormControl
            sx={{ width: "21rem", margin: "0.5rem" }}
            variant="standard"
          >
            <InputLabel htmlFor="standard-adornment-password">
              Confirm Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              onChange={handleClickConfirmpass}
              type={showPassword2 ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword2}
                    onMouseDown={handleMouseDownPassword2}
                  >
                    {showPassword2 ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
        <Alert>{matchMessage}</Alert>

        <Text>
          Already a member?{" "}
          <Link to="/login">
            <Button sx={{ color: "#3d9c81" }}>Login</Button>{" "}
          </Link>
        </Text>
        <StyledButton variant="contained" size="large" onClick={handleSignup}>
          Signup
        </StyledButton>
        
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
          onClose={handleClose1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Hey,
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Your account is successfully created.
            </Typography>
            <Link to='/login'><Button variant="contained" size="medium" style={{backgroundColor: '#00a884', marginLeft: '45%', marginTop: '0.8rem', width: '6rem'}}>Login</Button></Link>
            <Button variant="contained" size="medium" style={{backgroundColor: '#00a884', marginLeft: '1.2rem', marginTop: '0.8rem', width: '6rem'}} onClick={handleClose1}>Cancel</Button>
          </Box>
        </Modal>
        
        <Modal
          open={open3}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Hey,
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              You are already a member. Login?
            </Typography>
            <Link to='/login'><Button variant="contained" size="medium" style={{backgroundColor: '#00a884', marginLeft: '45%', marginTop: '0.8rem', width: '6rem'}}>Login</Button></Link>
            <Button variant="contained" size="medium" style={{backgroundColor: '#00a884', marginLeft: '1.2rem', marginTop: '0.8rem', width: '6rem'}} onClick={handleClose2}>Cancel</Button>
          </Box>
        </Modal>
      </Component>
    </Dialog>
    </>
  );
};

export default Signup;
