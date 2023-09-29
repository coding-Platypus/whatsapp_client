import { useState } from "react";
import {useNavigate} from "react-router-dom"
import { MoreVert } from "@mui/icons-material";
import { Menu, MenuItem, styled } from "@mui/material";

const MenuOption = styled(MenuItem)`
    font-size: 14px;
    padding: 15px 60px 5px 24px;
    color: #4A4A4A;
`


const HeaderMenu = ({setOpenDrawer}) => {

const [open, setOpen] = useState(null);
const navigate = useNavigate();
const handleClose = () => {
    setOpen(null);
}

const handleClick = (e) => {
    setOpen(e.currentTarget);
}

const handleLogout = () =>{
  localStorage.clear();
  navigate('/login');

}
  return (
    <>
      <MoreVert onClick = {handleClick}/>
      <Menu
        anchorEl={open}
        keepMounted
        open={open}
        onClose={handleClose}
        getContentAnchorE1={null}
       anchoreOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
       }}
       transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
       }}
      >
        <MenuOption onClick={()=>{handleClose(); setOpenDrawer(true); }}>Profile</MenuOption>
        <MenuOption onClick={()=>{handleClose(); handleLogout() }}>Logout</MenuOption>
      </Menu>
    </>
  );
};

export default HeaderMenu;
