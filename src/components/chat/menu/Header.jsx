// import { useContext, useState } from "react";
// import { AccountContext } from "../../context/accountProvider";
import { useState } from "react";
import { emptyProfilePicture } from "../../../constant/data";
import { Box, styled } from "@mui/material";
import {Chat as MessageIcon} from '@mui/icons-material';
import HeaderMenu from "./HeaderMenu";
import InfoDrawer from "../../drawer/InfoDrawer";


const Component = styled(Box)`
height: 44px;
background: #ededed;
padding: 8px 16px;
display: flex;
align-items: center;
`

const Wrapper = styled(Box)`
margin-left: auto;
& > * {
    margin-left: 2px;
    padding: 8px;
    color: #000;
}
& :first-child{
    font-size: 22px;
    margin-right: 8px;
    margin-top: 3px;
}`

const Image = styled('img')({
    height: 40, 
    width: 40,
    borderRadius: '50%'
})

const Header = () => {

    const [openDrawer, setOpenDrawer] = useState(false);
    let dp = localStorage.getItem('dp');

   
    // const {account} = useContext(AccountContext);

    const toggleDrawer = ()=>{
        setOpenDrawer(true);
    }
    return(
        <>
        <Component>
            <Image src={`http://localhost:8000/${dp}`} alt="dp" onClick={() => toggleDrawer()}/>
            <Wrapper>

                
                <HeaderMenu setOpenDrawer={setOpenDrawer}/>
            </Wrapper>
        </Component>
        <InfoDrawer open={openDrawer} setOpen={setOpenDrawer}/>
        </>
    )
}

export default Header;