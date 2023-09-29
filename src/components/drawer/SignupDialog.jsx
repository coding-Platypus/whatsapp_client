import Signup from "../account/SignUp";
import { AppBar, Box, Toolbar, styled, Typography } from "@mui/material";
import {whatsappIcon} from '../../constant/data';


const LoginHeader = styled(AppBar)`
  height: 220px;
  background-color: #00a884;
  box-shadow: none;
`;
const Component = styled(Box)`
  height: 100vh;
  background: #dcdcdc;
`;

const Title = styled(Typography)`
font-size: 0.9rem;
font-weight: 500;
`;

const Container = styled(Toolbar)`
margin-top: 1rem; `

const Image = styled('img') ({
  height: 40,
  width: 40,
  marginRight: "0.5rem",
  marginLeft: "19%",
})


const SignupDialog = () => {
  return (
    <Component>
      <>
        <LoginHeader>
        <Container><Image src={whatsappIcon}></Image><Title>WHATSAPP WEB</Title></Container>
        </LoginHeader>
        <Signup />
      </>
    </Component>
  );
};

export default SignupDialog;