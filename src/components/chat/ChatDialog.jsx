// import { useContext } from "react";
import { Dialog,Box, styled } from "@mui/material";
import { useEffect, useState } from "react";
import Menu from "./menu/Menu";
import EmptyChat from "./chat/EmptyChat";
import ChatBox from "./chat/ChatBox";
// import { AccountContext } from "../../context/AccountProvider";


const Component = styled(Box)`
display: flex;`

const LeftComponent = styled(Box)`
min-width: 450px;
`

const RightComponent = styled(Box)`
width: 70%;
min-Width: 300px;
height: 100%;
border-left: 1px solid rgba(0,0,0,0.14)
`

const dialogStyle = {
    height: "96%",
    width: '100%',
    margin: '20px',
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: '0',
    boxShadow: 'none',
    overflow: 'hidden'

}


const ChatDialog = () => {
    let [friend,setFriend] = useState({});

    useEffect(()=>{
        const handleChat = async() => {
            let friend={};
           friend['id'] = localStorage.getItem('friend_id');
           friend['name'] = localStorage.getItem('friend_name');
           setFriend(friend);
        }
        handleChat();
    }, []);



    // const {person} = useContext(AccountContext)
    return(
        <Dialog
        open ={true}
        PaperProps={{sx: dialogStyle}}
        hideBackdrop={true}
        maxWidth={'md'}
        >
        <Component>
            <LeftComponent>
                <Menu />
            </LeftComponent>
            <RightComponent>
            <ChatBox friend={friend} />
                {/* { Object.keys(friend).length ? <ChatBox friend={friend} /> : <EmptyChat />} */}
            </RightComponent>
        </Component>
        
        </Dialog>
    )
}

export default ChatDialog;