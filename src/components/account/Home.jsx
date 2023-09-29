// import { useContext } from "react";
import { Dialog, Box, Typography, List , ListItem, styled, Button } from "@mui/material";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
//import { qrCodeImage } from "../../constant/data";
import coverImage from '../../images/WhatsApp-about.png';
import { Outlet, Link } from "react-router-dom";

// import { AccountContext } from "../../context/AccountProvider";
//import {GoogleLogin} from '@react-oauth/google';
// import jwt_decode from 'jwt-decode';
// import { addUser } from "../../service/api";


const Component = styled(Box)`
display: flex;
`
const Container = styled(Box)`
padding: 56px 0 56px 56px;
`
const QRCode = styled('img')({
    height: 280,
    width: 280, 
    margin: '50px 0 0 50px'
})

const StyledList = styled('List')`
& > li {
    padding: 0;
    margin-top: 15px;
    font-size: 18px;
    line-height: 28px;
    color: #4a4a4a;
}
`

const Title = styled(Typography)`
font-size: 26px;
color: #525252;
font-weight: 300;
font-family: 'Sans Serif';
margin-bottom: 25px;
`

const StyledButton = styled(Button)`
background-color: #00a884;
width: 20rem;
&:hover {
    background-color: #3d9c81;
}`

const dialogStyle = {
    height: "96%",
    marginTop: '12%',
    width: '60%',
    maxWidth: '100%',
    maxHeight: '100%',
    boxShadow: 'none',
    overflow: 'hidden'

}
const Text = styled(Typography)`
margin-top: 0.5rem;
text-align: center;
`



const LoginDialog = () => {

    return(
        <>
        <Dialog 
            open={true}
            PaperProps={{sx: dialogStyle}}
            hideBackdrop={true}
            ><Component>
                <Container>
                    <Title>To use WhatsApp on your computer:</Title>
                    <StyledList>
                        <ListItem>1. Open WhatsApp on your phone</ListItem>
                        <ListItem>2. Tap Menu Settings and select WhatsApp  Web</ListItem>
                        <ListItem>3. Point your phone to this screen to capture the QR code</ListItem>
                    </StyledList>
                </Container>
                <Box>
                    <QRCode src={coverImage} alt='qr code' />
                    <Box style={{margin: '2rem'}}>
                        {/* <GoogleLogin
                        onSuccess={onLoginSuccess}
                        onError = {onLoginError}/> */}
                        <Link to= "/signup">
                            <StyledButton variant="contained" size="large">
                           <WhatsAppIcon sx={{'marginRight': '0.5rem'}}/> Signup with WhatsApp
                        </StyledButton> 
                        </Link>
                        
                        <Text> Already a member? <Link to = '/login'><Button sx={{color: '#3d9c81'}}>Login</Button> </Link></Text>
                       
                    </Box>
                    
                </Box>
            </Component>

        </Dialog>
        </>
    )
}

export default LoginDialog;